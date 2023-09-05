import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { CoreTextInputNode } from './types';
import { NewPipelineNodeExecutionBase } from '@/lib/new-pipelines/types';

export async function executeNode(
  executor: PipelineExecutor,
  node: CoreTextInputNode
) {
  const value = executor.getInput(node.id);

  if (value === undefined) {
    const message = `No input value for "${node.data.name}"`;
    return executor.getNodeErrorExecution(node, message);
  }

  const output = { 'Text': value };
  return executor.getNodeSuccessExecution(node, output);
}
