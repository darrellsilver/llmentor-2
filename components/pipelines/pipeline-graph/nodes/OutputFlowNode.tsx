import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { OutputNode } from '@/lib/pipelines/types';

export function OutputFlowNode({
  data,
  ...props
}: NodeProps<OutputNode>) {
  return (
    <FlowNode title="Output" data={data} {...props}>
      <Handle type="source" position={Position.Left} id="input" />
    </FlowNode>
  )
}
