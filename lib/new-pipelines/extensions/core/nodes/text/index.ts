import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { getCreateNode } from '@/lib/new-pipelines/utils/getCreateNode';

import { coreTextNode, CoreTextNode } from './types';
import { renderIcon, renderNode } from './renderNode';
import { executeNode } from './executeNode';

export type { CoreTextNode };

export class CoreTextNodeExtension implements IPipelineNodeExtension<CoreTextNode> {
  type = coreTextNode.type;
  name = 'Text';
  createNode = getCreateNode(coreTextNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  executeNode = executeNode;
}
