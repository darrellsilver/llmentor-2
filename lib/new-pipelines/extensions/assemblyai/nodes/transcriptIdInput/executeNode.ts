import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { AssemblyAITranscriptIdInputNode } from './types';

export async function executeNode(
  executor: PipelineExecutor,
  node: AssemblyAITranscriptIdInputNode
) {
  const value = executor.getInput(node.id);

  if (value === undefined) {
    const message = `No input value for "${node.data.name}"`;
    return executor.getNodeErrorExecution(node, message);
  }

  const output = { 'Transcript Id': value };
  return executor.getNodeSuccessExecution(node, output);
}
