import { NewPipelineNode, PipelineNodeRef, PipelineOutputNodeRef } from '@/lib/new-pipelines/core/types';

export function getOutputNodeRef(node: NewPipelineNode, output: string): PipelineOutputNodeRef {
  return {
    ...getNodeRef(node),
    output,
  }
}

export function getNodeRef(node: NewPipelineNode): PipelineNodeRef {
  return {
    extension: node.extension,
    type: node.type,
    id: node.id,
  }
}
