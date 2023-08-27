import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { CoreTextInputNode } from './types';
import { NewPipelineNodeExecution } from '@/lib/new-pipelines/core/types';

export async function executeNode(
  executor: PipelineExecutor,
  node: CoreTextInputNode
): Promise<NewPipelineNodeExecution> {
  const value = executor.getInput(node.data.name);

  if (value === null) {
    const message = `No input value for "${node.data.name}"`;
    return executor.getNodeErrorExecution(node, message);
  }

  const output = { 'Text': value };
  return executor.getNodeSuccessExecution(node, output);
}
