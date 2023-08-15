import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';

type TextProviderData = {
  content: string;
}

export function TextFlowNode({
  data,
  ...props
}: NodeProps<TextProviderData>) {
  return (
    <FlowNode title="Text" data={data} {...props}>
      {data.content}
      <Handle type="target" position={Position.Right} id="output" />
    </FlowNode>
  )
}
