import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';

type TextProviderData = {
  inputReference: { type: string, id: string } | null,
}

export function OutputFlowNode({
  data,
  ...props
}: NodeProps<TextProviderData>) {
  return (
    <FlowNode title="Output" data={data} {...props}>
      <Handle type="source" position={Position.Left} id="input" />
    </FlowNode>
  )
}
