import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { assemblyAITranscriptIdInputNode, AssemblyAITranscriptIdInputNode } from './types';
import { executeNode } from './executeNode';
import { renderInput } from './renderInput';
import { renderIcon, renderNode } from './renderNode';
import { getCreateNode } from '@/lib/new-pipelines/utils/getCreateNode';

export type { AssemblyAITranscriptIdInputNode };

export class AssemblyAITranscriptIdInputNodeExtension implements IPipelineNodeExtension<AssemblyAITranscriptIdInputNode> {
  type = assemblyAITranscriptIdInputNode.type;
  name = 'Transcript Id Input';
  createNode = getCreateNode(assemblyAITranscriptIdInputNode);
  renderIcon = renderIcon;
  renderNode = renderNode;
  renderInput = renderInput;
  executeNode = executeNode;
}
