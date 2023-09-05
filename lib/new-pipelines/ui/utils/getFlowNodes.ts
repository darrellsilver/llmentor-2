import { NewPipelineNode } from '@/lib/new-pipelines/types';
import { Node } from 'reactflow';
import { getFlowId } from '@/lib/new-pipelines/ui/utils/getFlowId';

export function getFlowNodes(nodes: NewPipelineNode[]): Node<NewPipelineNode>[] {
  return nodes.map(getFlowNode);
}

export function getFlowNode(node: NewPipelineNode): Node<NewPipelineNode> {
  return {
    type: 'pipelineNode',
    id: getFlowId(node),
    position: node.position,
    data: node,
  }
}
