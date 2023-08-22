import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { TranscriptNode } from '@/lib/pipelines/types';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { useTranscriptsStore } from '@/components/pipelines/stores/useTranscriptsStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CloudIcon, MessageCircleIcon, MessageSquareIcon } from 'lucide-react';

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

  if (!node) {
    return (
      <FlowNode
        title="Transcript"
        pipelineNode={node}
        canBeProperty={false}
        data={data}
        {...props}
      >
        No Transcript node found
      </FlowNode>
    );
  }

  return (
    <FlowNode
      title="Transcript"
      pipelineNode={node}
      canBeProperty={true}
      data={data}
      iconColor="blue"
      Icon={MessageSquareIcon}
      {...props}
    >
      <Select
        value={node?.transcriptId || undefined}
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
