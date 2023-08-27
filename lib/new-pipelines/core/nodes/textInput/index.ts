import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { coreTextInputNode, CoreTextInputNode } from './types';
import { executeNode } from './executeNode';
import { renderNode } from './renderNode';
import { getCreateNode } from '@/lib/new-pipelines/core/utils/getCreateNode';
import { renderIcon } from './renderIcon';

export type { CoreTextInputNode };

export class TextInputNodeExtension implements IPipelineNodeExtension<CoreTextInputNode> {
  type = coreTextInputNode.type;
  name = 'Text Input';
  createNode = getCreateNode(coreTextInputNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  executeNode = executeNode;
}
