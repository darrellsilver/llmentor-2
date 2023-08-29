import { NewPipelineNode } from '@/lib/new-pipelines/types';
import { PipelineFlowNode } from '@/lib/new-pipelines/ui/nodes/PipelineFlowNode';

import { CoreCombineTextNode } from './types';
import { getRenderIcon } from '@/lib/new-pipelines/utils';
import { ListMinus } from 'lucide-react';

export const renderIcon = getRenderIcon(ListMinus, 'default');

export function renderNode(
  node: CoreCombineTextNode,
  onNodeChange: (node: NewPipelineNode) => void
) {
  return (
    <PipelineFlowNode
      className="w-56"
      node={node}
      name="Combine Text"
      Icon={renderIcon()}
    >
    </PipelineFlowNode>
  )
}
