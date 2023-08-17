import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { TranscriptNode } from '@/lib/pipelines/types';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { useTranscriptsStore } from '@/components/pipelines/stores/useTranscriptsStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function TranscriptFlowNode({
 data,
 ...props
}: NodeProps<TranscriptNode>) {
  const transcripts = useTranscriptsStore(state => state.transcripts);

  const {
    node,
    setTranscriptNode
  } = usePipelineNodesStore(state => ({
    node: state.getTranscriptNode(data.id),
    setTranscriptNode: state.setTranscriptNode,
  }));

  function setTranscriptId(transcriptId: string) {
    if (!node) return;
    setTranscriptNode({ ...node, transcriptId });
  }

  return (
    <FlowNode title="Transcript" data={data} {...props}>
      <Select
        value={node?.transcriptId}
        onValueChange={setTranscriptId}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Pick transcript" />
        </SelectTrigger>
        <SelectContent>
          {(transcripts || []).map(({ id }) => (
            <SelectItem key={id} value={id}>
              {id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Handle type="target" position={Position.Right} id="output" />
    </FlowNode>
  )
}
