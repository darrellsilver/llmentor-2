import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { OpenAiNode } from '@/lib/pipelines/types';

export function OpenAiFlowNode({
 data,
 ...props
}: NodeProps<OpenAiNode>) {
  return (
    <FlowNode title="OpenAi" data={data} {...props}>
      <p>Temp: {data.temperature}</p>
      <Handle type="source" position={Position.Left} id="context" style={{ top: 40 }} />
      <Handle type="source" position={Position.Left} id="prompt" style={{ top: 55 }} />
      <Handle type="target" position={Position.Right} id="output" />
    </FlowNode>
  )
}
