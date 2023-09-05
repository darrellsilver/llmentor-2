'use client';

import { NewPipelineNode } from '@/lib/new-pipelines/types';
import { Card } from '@/components/ui/card';

import { PipelineFlowNodePorts } from './PipelineFlowNodePorts';
import { Node } from 'postcss';

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
      <div className={`flex items-center justify-start rounded-t-md bg-accent px-1.5 py-1`}>
        {Icon}
        <h3 className="flex-1 text-sm font-bold">
          {name || node.type}
        </h3>
        {node.tag && <NodeTag tag={node.tag} />}
      </div>

      <div className="p-2">
        {children}
      </div>

      <PipelineFlowNodePorts
        inputs={node.inputs}
        outputs={node.outputs}
      />
    </Card>
  )
}

type NodeTagProps = {
  tag: string;
}

function NodeTag({
  tag,
}: NodeTagProps) {
  return (
    <div className={`ml-2 rounded-sm px-2.5 py-0.5 text-center text-xs font-semibold ${getTagClasses(tag)}`}>
      {tag}
    </div>
  );
}

function getTagClasses(tag: string) {
  switch (tag) {
    case 'Input':
      return 'bg-green-200 text-green-950 dark:bg-green-900 dark:text-green-100'
    case 'Output':
      return 'bg-red-200 text-red-950 dark:bg-red-900 dark:text-red-100'
    default:
      return 'bg-blue-200 text-blue-950 dark:bg-blue-900 dark:text-blue-100';
  }
}
