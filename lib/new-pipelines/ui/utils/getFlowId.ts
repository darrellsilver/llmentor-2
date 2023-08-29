import { PipelineNodeRef } from '@/lib/new-pipelines/types';

export function getFlowId(nodeRef: PipelineNodeRef) {
  return `${nodeRef.extension}::${nodeRef.type}::${nodeRef.id}`;
}
