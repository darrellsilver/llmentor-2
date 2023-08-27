import { PipelineNodeRef } from '@/lib/new-pipelines/core/types';

export function getFlowId(nodeRef: PipelineNodeRef) {
  return `${nodeRef.extension}::${nodeRef.type}::${nodeRef.id}`;
}
