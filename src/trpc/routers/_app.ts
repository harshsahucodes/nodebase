import { createTRPCRouter } from "../init";
import { workflowsRouter } from "@/app/features/workflows/server/router";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
