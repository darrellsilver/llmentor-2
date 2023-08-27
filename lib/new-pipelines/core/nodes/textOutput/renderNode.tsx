import { NewPipelineNode } from '@/lib/new-pipelines/core/types';
import { PipelineFlowNodeProps, PipelineFlowNode } from '@/lib/new-pipelines/core/ui/PipelineFlowNode';
import { Input } from '@/components/ui/input';

import { CoreTextOutputNode } from './types'
import { renderIcon } from './renderIcon';


export function renderNode(
  node: CoreTextOutputNode,
  onNodeChange: (node: NewPipelineNode) => void
) {
  return (
    <TextOutputFlowNode node={node} onNodeChange={onNodeChange} />
  )
}

type TextOutputFlowNodeProps = PipelineFlowNodeProps<CoreTextOutputNode>;

export function TextOutputFlowNode({
 node,
 onNodeChange,
}: TextOutputFlowNodeProps) {
  function onNameChange(name: string) {
    const newNode: CoreTextOutputNode = {
      ...node,
      data: { ...node.data, name },
    };
    onNodeChange && onNodeChange(newNode)
  }

  return (
    <PipelineFlowNode
      className="w-72"
      node={node}
      name={`Text Output: ${node.data.name || '[No Name]'}`}
      Icon={renderIcon()}
    >
      <Input
        className="w-full"
        type="text"
        placeholder="Name"
        value={node.data.name}
        onChange={e => onNameChange(e.target.value)}
      />
    </PipelineFlowNode>
  )
}
