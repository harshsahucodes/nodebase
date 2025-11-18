import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import * as Sentry from "@sentry/nextjs";
import { NonRetriableError } from "inngest";
import prisma from "@/lib/db";
import { topologicalSort } from "./utils";
import { NodeType } from "@/generated/prisma";
import { getExecutor } from "@/features/executions/lib/executor-registry";
import { httpRequestChannel } from "./channels/http-request";
import { manualTriggerChannel } from "./channels/manual-trigger";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const executeWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
    retries: 0, // Remove in production
  },
  {
    event: "workflows/execute.workflow",
    channels: [httpRequestChannel(), manualTriggerChannel()],
  },
  async ({ event, step, publish }) => {
    const workflowId = event.data.workflowId;

    if (!workflowId) {
      throw new NonRetriableError("workflow ID is missing");
    }

    const sortedNodes = await step.run("prepare-workflow", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id: workflowId },
        include: {
          nodes: true,
          connections: true,
        },
      });

      return topologicalSort(workflow.nodes, workflow.connections);
    });

    // initialize the context with any initial data from the trigger
    let context = event.data.initialData || {};

    // execute each node
    for (const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
        publish,
      });
    }
    return { workflowId, result: context };
  }
);
