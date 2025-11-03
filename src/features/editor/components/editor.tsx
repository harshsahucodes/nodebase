"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
  Background,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import { ErrorView, LoadingView } from "@/components/entity-components";

import "@xyflow/react/dist/style.css";
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "./add-node-button";
import { useSetAtom } from "jotai";
import { editorAtom } from "../store/atom";

export const EditorLoading = () => {
  return <LoadingView message="Loading editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  const setEditor = useSetAtom(editorAtom);

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodeSnapshot) => applyNodeChanges(changes, nodeSnapshot)),
    []
  );

  const onEdgesChanges = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChanges}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        onInit={setEditor}
        snapGrid={[10,10]}
        snapToGrid
        fitView
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <AddNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
};
