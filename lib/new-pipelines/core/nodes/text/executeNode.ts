import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { NewPipelineNodeExecution } from '@/lib/new-pipelines/core/types';

import { CoreTextNode } from './types';

export async function executeNode(
  executor: PipelineExecutor,
  node: CoreTextNode
): Promise<NewPipelineNodeExecution> {
  const output = { 'Text': node.data.content };
  return executor.getNodeSuccessExecution(node, output);
}
