import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { getCreateNode } from '@/lib/new-pipelines/core/utils/getCreateNode';

import { coreTextOutputNode, CoreTextOutputNode } from './types';
import { renderIcon } from './renderIcon';
import { renderNode } from './renderNode';
import { executeNode } from './executeNode';

export type { CoreTextOutputNode };

export class TextOutputNodeExtension implements IPipelineNodeExtension<CoreTextOutputNode> {
  type = coreTextOutputNode.type;
  name = 'Text Output';
  createNode = getCreateNode(coreTextOutputNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  executeNode = executeNode;
}
