import {
  INPUT_TAG,
  NewPipelineInputNode,
  NewPipelineNode,
} from '@/lib/new-pipelines/types';

export function isInputNode(node: NewPipelineNode): node is NewPipelineInputNode {
  const inputNode = node as NewPipelineInputNode;
  return (
    inputNode.tag === INPUT_TAG &&
    inputNode.data.name !== undefined &&
    inputNode.data.description !== undefined
  );
}

