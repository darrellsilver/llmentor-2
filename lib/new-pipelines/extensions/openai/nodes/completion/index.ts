import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { getCreateNode } from '@/lib/new-pipelines/utils/getCreateNode';

import { openAiCompletionNode, OpenAICompletionNode } from './types';
import { renderIcon, renderNode } from './renderNode';
import { executeNode } from './executeNode';

export type { OpenAICompletionNode };

export class OpenAICompletionNodeExtension implements IPipelineNodeExtension<OpenAICompletionNode> {
  type = openAiCompletionNode.type;
  name = 'OpenAI Completion';
  createNode = getCreateNode(openAiCompletionNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  executeNode = executeNode;
}
