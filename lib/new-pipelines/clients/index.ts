import { NewClientPipeline, NewPipeline, } from '@/lib/new-pipelines/types';
import { isInputNode, isOutputNode } from '@/lib/new-pipelines/utils';

export function buildClientPipeline(pipeline: NewPipeline): NewClientPipeline {
  return {
    id: pipeline.id,
    createdAt: pipeline.createdAt,
    name: pipeline.name,
    description: pipeline.description,
    extensionIds: pipeline.extensionIds,
    inputNodes: pipeline.nodes.filter(isInputNode),
    outputNodes: pipeline.nodes.filter(isOutputNode),
  }
}
