import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { getCreateNode } from '@/lib/new-pipelines/utils/getCreateNode';

import { coreTextOutputNode, CoreTextOutputNode } from './types';
import { renderIcon, renderNode } from './renderNode';
import { renderOutput } from './renderOutput';
import { executeNode } from './executeNode';
import { NewPipelineOutputNode } from '@/lib/new-pipelines/types';

export type { CoreTextOutputNode };

export class TextOutputNodeExtension implements IPipelineNodeExtension<CoreTextOutputNode> {
  type = coreTextOutputNode.type;
  name = 'Text Output';
  createNode = getCreateNode(coreTextOutputNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  renderOutput = (node: NewPipelineOutputNode, value: any) => renderOutput(node as CoreTextOutputNode, value)
  executeNode = executeNode;
}
