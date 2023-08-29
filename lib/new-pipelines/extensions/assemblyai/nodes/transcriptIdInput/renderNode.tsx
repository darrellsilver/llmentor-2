import { PipelineFlowNodeProps, PipelineFlowNode } from '@/lib/new-pipelines/ui/nodes/PipelineFlowNode';
import { NewPipelineNode } from '@/lib/new-pipelines/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { AssemblyAITranscriptIdInputNode } from './types'
import { getRenderIcon } from '@/lib/new-pipelines/utils';
import { MessageSquare } from 'lucide-react';

export const renderIcon = getRenderIcon(MessageSquare, 'green');

type TranscriptIdInputFlowNodeProps = PipelineFlowNodeProps<AssemblyAITranscriptIdInputNode>;

export function renderNode(
  node: AssemblyAITranscriptIdInputNode,
  onNodeChange: (node: NewPipelineNode) => void
) {
  return (
    <TranscriptIdInputFlowNode node={node} onNodeChange={onNodeChange} />
  )
}

function TranscriptIdInputFlowNode({
  node,
  onNodeChange,
}: TranscriptIdInputFlowNodeProps) {
  function onNameChange(name: string) {
    const newNode: AssemblyAITranscriptIdInputNode = {
      ...node,
      data: { ...node.data, name },
    };
    onNodeChange && onNodeChange(newNode)
  }

  function onDescriptionChange(description: string) {
    const newNode: AssemblyAITranscriptIdInputNode = {
      ...node,
      data: { ...node.data, description },
    };
    onNodeChange && onNodeChange(newNode)
  }

  return (
    <PipelineFlowNode
      className="w-72"
      node={node}
      name={`Text Input: ${node.data.name || '[No Name]'}`}
      Icon={renderIcon()}
    >
      <Input
        className="mb-2 w-full"
        type="text"
        placeholder="Name"
        value={node.data.name}
        onChange={e => onNameChange(e.target.value)}
      />
      <Textarea
        className="w-full"
        placeholder="Description"
        value={node.data.description}
        onChange={e => onDescriptionChange(e.target.value)}
      />
    </PipelineFlowNode>
  )
}
