import { NewPipelineNode } from '@/lib/new-pipelines/types';

import { PipelineFlowNode, PipelineFlowNodeProps } from './PipelineFlowNode';

type ErrorFlowNodeProps = PipelineFlowNodeProps<NewPipelineNode> & {
  message: string;
};

export function ErrorFlowNode({
  node,
  message,
}: ErrorFlowNodeProps) {
  return (
    <PipelineFlowNode node={node}>
      <div className="flex h-52 w-52 flex-col items-center justify-center rounded-md bg-red-200 p-4 text-center text-red-950">
        <span className="font-bold">Error</span>
        {message}
      </div>
    </PipelineFlowNode>
  )
}
