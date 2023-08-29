import { PipelineFlowNodeProps, PipelineFlowNode } from '@/lib/new-pipelines/ui/nodes/PipelineFlowNode';
import { NewPipelineNode } from '@/lib/new-pipelines/types';

import { AssemblyAITranscriptProviderNode } from './types'
import { getRenderIcon } from '@/lib/new-pipelines/utils';
import { MessageSquare } from 'lucide-react';

export const renderIcon = getRenderIcon(MessageSquare, 'blue');

type TranscriptIdInputFlowNodeProps = PipelineFlowNodeProps<AssemblyAITranscriptProviderNode>;

export function renderNode(
  node: AssemblyAITranscriptProviderNode,
  onNodeChange: (node: NewPipelineNode) => void
) {
  return (
    <TranscriptProviderFlowNode node={node} onNodeChange={onNodeChange} />
  )
}

function TranscriptProviderFlowNode({
  node,
  onNodeChange,
}: TranscriptIdInputFlowNodeProps) {
  return (
    <PipelineFlowNode
      className="w-56"
      node={node}
      name="Transcript Provider"
      Icon={renderIcon()}
    >
    </PipelineFlowNode>
  )
}

