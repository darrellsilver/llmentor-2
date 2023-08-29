import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { coreTextInputNode, CoreTextInputNode } from './types';
import { executeNode } from './executeNode';
import { renderInput } from './renderInput';
import { renderIcon, renderNode } from './renderNode';
import { getCreateNode } from '@/lib/new-pipelines/utils/getCreateNode';

export type { CoreTextInputNode };

export class TextInputNodeExtension implements IPipelineNodeExtension<CoreTextInputNode> {
  type = coreTextInputNode.type;
  name = 'Text Input';
  createNode = getCreateNode(coreTextInputNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  renderInput = renderInput;
  executeNode = executeNode;
}
