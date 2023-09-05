import { IPipelineNodeExtension, PipelineExtensionBase } from '@/lib/new-pipelines/interfaces';

import { OpenAINode, nodeExtensions } from './nodes';

export class OpenAIPipelineExtension extends PipelineExtensionBase<OpenAINode> {
  id = 'openai';
  name = 'OpenAI'

  nodeExtensions: IPipelineNodeExtension<OpenAINode>[] = nodeExtensions;
}

export const extension = new OpenAIPipelineExtension();
