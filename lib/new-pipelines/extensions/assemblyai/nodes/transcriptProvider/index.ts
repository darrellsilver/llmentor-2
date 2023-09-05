import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { assemblyAITranscriptProviderNode, AssemblyAITranscriptProviderNode } from './types';
import { executeNode } from './executeNode';
import { renderIcon, renderNode } from './renderNode';
import { getCreateNode } from '@/lib/new-pipelines/utils/getCreateNode';

export type { AssemblyAITranscriptProviderNode };

export class AssemblyAITranscriptProviderNodeExtension implements IPipelineNodeExtension<AssemblyAITranscriptProviderNode> {
  type = assemblyAITranscriptProviderNode.type;
  name = 'Transcript Provider';
  createNode = getCreateNode(assemblyAITranscriptProviderNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  executeNode = executeNode;
}
