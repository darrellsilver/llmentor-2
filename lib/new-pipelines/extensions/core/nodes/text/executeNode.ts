import { PipelineExecutor } from '@/lib/new-pipelines/execution';

import { CoreTextNode } from './types';

export async function executeNode(
  executor: PipelineExecutor,
  node: CoreTextNode
) {
  const output = { 'Text': node.data.content };
  return executor.getNodeSuccessExecution(node, output);
}
