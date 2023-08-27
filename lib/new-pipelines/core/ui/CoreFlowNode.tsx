import { CorePipelineNode } from '@/lib/new-pipelines/core/types';
import { PipelineFlowNodeProps } from '@/lib/new-pipelines/core/ui/PipelineFlowNode';
import { ErrorFlowNode } from '@/lib/new-pipelines/core/ui/ErrorFlowNode';

import { TextInputFlowNode } from './TextInputFlowNode';
import { TextFlowNode } from './TextFlowNode';
import { TextOutputFlowNode } from '@/lib/new-pipelines/core/ui/TextOutputFlowNode';

type CoreFlowNodeProps = PipelineFlowNodeProps<CorePipelineNode>;

export function CoreFlowNode({
  node,
  onNodeChange,
}: CoreFlowNodeProps) {
  // Typescript yells if all cases are covered, since the node type is `never`
  const { extension, type } = node;
  switch (type) {
    case 'textInput':
      return <TextInputFlowNode node={node} onNodeChange={onNodeChange} />
    case 'text':
      return <TextFlowNode node={node} onNodeChange={onNodeChange} />
    case 'textOutput':
      return <TextOutputFlowNode node={node} onNodeChange={onNodeChange} />
    default:
      return <ErrorFlowNode node={node} message={`No node found for ${extension} node of type "${type}"`}/>
  }
}
