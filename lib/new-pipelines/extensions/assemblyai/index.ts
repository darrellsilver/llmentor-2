import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';
import { PipelineExtensionBase } from '@/lib/new-pipelines/interfaces/PipelineExtension';

import { AssemblyAINode, nodeExtensions } from './nodes';

export class AssemblyAIPipelineExtension extends PipelineExtensionBase<AssemblyAINode> {
  id = 'assemblyai';
  name = 'AssemblyAI'

  nodeExtensions: IPipelineNodeExtension<AssemblyAINode>[] = nodeExtensions;
}

export const extension = new AssemblyAIPipelineExtension();
