import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAuth()
  const { workflowId } = await params;

  return <div>workflow ID: {workflowId}</div>;
};

export default Page;
