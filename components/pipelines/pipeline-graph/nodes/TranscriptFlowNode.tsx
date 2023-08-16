import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { TranscriptNode } from '@/lib/pipelines/types';

export function TranscriptFlowNode({
 data,
 ...props
}: NodeProps<TranscriptNode>) {
  return (
    <FlowNode title="Transcript" data={data} {...props}>
      {data.transcriptId}
      <Handle type="target" position={Position.Right} id="output" />
    </FlowNode>
  )
}
