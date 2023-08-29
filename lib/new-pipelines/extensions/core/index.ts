import { CoreNode } from '@/lib/new-pipelines/extensions/core/nodes';
import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';
import { PipelineExtensionBase } from '@/lib/new-pipelines/interfaces/PipelineExtension';

import { nodeExtensions } from './nodes';

export class CorePipelineExtension extends PipelineExtensionBase<CoreNode> {
  id = 'core';
  name = 'Core'

  nodeExtensions: IPipelineNodeExtension<CoreNode>[] = nodeExtensions;
}

export const extension = new CorePipelineExtension();
