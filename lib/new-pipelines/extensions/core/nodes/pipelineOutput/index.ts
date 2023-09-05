import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { getCreateNode } from '@/lib/new-pipelines/utils/getCreateNode';

import { corePipelineOutputNode, CorePipelineOutputNode } from './types';
import { renderIcon, renderNode } from './renderNode';
import { renderOutput } from './renderOutput';
import { executeNode } from './executeNode';
import { NewPipelineOutputNode } from '@/lib/new-pipelines/types';

export type { CorePipelineOutputNode };

export class PipelineOutputNodeExtension implements IPipelineNodeExtension<CorePipelineOutputNode> {
  type = corePipelineOutputNode.type;
  name = 'Pipeline Output';
  createNode = getCreateNode(corePipelineOutputNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  // TODO find a type-safe way of doing this
  renderOutput = (node: NewPipelineOutputNode, value: any) => renderOutput(node as CorePipelineOutputNode, value)
  executeNode = executeNode;
}
