import { getUuid } from '@/components/pipelines/common/getUuid';

import { NewPipelineNode } from '@/lib/new-pipelines/types';

export function getCreateNode<T extends NewPipelineNode>(node: T): () => T {
  return () => ({ ...structuredClone(node), id: getUuid() });
}
