import { PipelineFlowNodeProps, PipelineFlowNode } from '@/lib/new-pipelines/core/ui/PipelineFlowNode';
import { NewPipelineNode } from '@/lib/new-pipelines/core/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { CoreTextInputNode } from './types'
import { renderIcon } from './renderIcon';

type TextInputFlowNodeProps = PipelineFlowNodeProps<CoreTextInputNode>;

export function renderNode(
  node: CoreTextInputNode,
  onNodeChange: (node: NewPipelineNode) => void
) {
  return (
    <TextInputFlowNode node={node} onNodeChange={onNodeChange} />
  )
}

function TextInputFlowNode({
  node,
  onNodeChange,
}: TextInputFlowNodeProps) {
  function onNameChange(name: string) {
    const newNode: CoreTextInputNode = {
      ...node,
      data: { ...node.data, name },
    };
    onNodeChange && onNodeChange(newNode)
  }

  function onDescriptionChange(description: string) {
    const newNode: CoreTextInputNode = {
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
