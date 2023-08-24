import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { OutputNode } from '@/lib/pipelines/types';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { FlowInputHandle } from '@/components/pipelines/pipeline-graph/handles';

export function OutputFlowNode({
  data,
  ...props
}: NodeProps<OutputNode>) {
  return (
    <FlowNode
      title="Output"
      data={data}
      iconColor="red"
      Icon={ArrowRightIcon}
      {...props}
    >
      <FlowInputHandle name="Inputs" id="input" allowMultiple />
    </FlowNode>
  )
}
