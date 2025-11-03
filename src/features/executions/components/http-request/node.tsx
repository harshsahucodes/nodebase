"use client";

import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { FormType, HttpRequestDialog } from "./dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = "initial";

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: FormType) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endpoint: values.endpoint,
              method: values.method,
              body: values.body,
            },
          };
        }

        return node;
      })
    );
  };

  const nodeData = props.data;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"} : ${nodeData.endpoint}`
    : "Not Configured";

  return (
    <>
      <HttpRequestDialog
        onSubmit={handleSubmit}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultBody={nodeData.body}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        status={nodeStatus}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
