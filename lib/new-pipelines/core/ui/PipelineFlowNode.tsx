'use client';

import { NewPipelineNode } from '@/lib/new-pipelines/core/types';
import { Card } from '@/components/ui/card';

import { PipelineFlowNodePorts } from './PipelineFlowNodePorts';

export type PipelineFlowNodeProps<T extends NewPipelineNode> = {
  className?: string;
  Icon?: JSX.Element | null;
  name?: string,
  node: T;
  onNodeChange?: (newNode: NewPipelineNode) => void;
}

export const PipelineFlowNode = ({
  Icon,
  name,
  node,
  children,
  className,
}: React.PropsWithChildren<PipelineFlowNodeProps<NewPipelineNode>>) => {
  return (
    <Card className={className}>
      <div className="flex items-center justify-start rounded-t-md bg-accent px-2 py-1">
        {Icon}
        <h3 className="flex-1 text-sm font-bold">
          {name || node.type}
        </h3>
      </div>

      <div className="p-2">
        {children}
      </div>

      <PipelineFlowNodePorts inputs={node.inputs} outputs={node.outputs} />
    </Card>
  )
}
