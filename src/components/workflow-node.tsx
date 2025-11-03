"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

interface WorkflowNodeProps {
  children: ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
  name?: string;
  description?: string;
}

/**
 * Renders a workflow node with an optional top toolbar (settings and delete) and an optional bottom label area.
 *
 * @param children - Content rendered inside the node.
 * @param name - Optional title displayed in a bottom toolbar.
 * @param description - Optional secondary text shown below the `name` in the bottom toolbar.
 * @param onDelete - Optional callback invoked when the delete (trash) button is clicked.
 * @param onSettings - Optional callback invoked when the settings button is clicked.
 * @param showToolbar - Whether to render the top toolbar; defaults to `true`.
 * @returns The node's JSX structure including conditional toolbars and the provided children.
 */
export function WorkflowNode({
  children,
  description,
  name,
  onDelete,
  onSettings,
  showToolbar = true,
}: WorkflowNodeProps) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button size="sm" variant="ghost" onClick={onSettings}>
            <SettingsIcon className="size-5" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            <TrashIcon className="size-5" />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-[200px] text-center"
        >
          <p className="font-medium">{name}</p>
          {description && (
            <p className="text-muted-foreground truncate text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
}