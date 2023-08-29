import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { getCreateNode } from '@/lib/new-pipelines/utils/getCreateNode';

import { coreCombineTextNode, CoreCombineTextNode } from './types';
import { renderIcon, renderNode } from './renderNode';
import { executeNode } from './executeNode';

export type { CoreCombineTextNode };

export class CoreCombineTextNodeExtension implements IPipelineNodeExtension<CoreCombineTextNode> {
  type = coreCombineTextNode.type;
  name = 'Combine Text';
  createNode = getCreateNode(coreCombineTextNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  executeNode = executeNode;
}
