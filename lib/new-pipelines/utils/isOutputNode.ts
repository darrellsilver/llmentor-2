import {
  OUTPUT_TAG,
  NewPipelineNode,
  NewPipelineOutputNode,
} from '@/lib/new-pipelines/types';

export function isOutputNode(node: NewPipelineNode): node is NewPipelineOutputNode {
  const outputNode = node as NewPipelineOutputNode;
  return (
    outputNode.tag === OUTPUT_TAG &&
    outputNode.data.name !== undefined
  );
}
