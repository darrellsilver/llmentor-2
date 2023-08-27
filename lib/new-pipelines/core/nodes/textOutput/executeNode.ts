import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { NewPipelineNodeExecution } from '@/lib/new-pipelines/core/types';

import { CoreTextOutputNode } from './types';

export async function executeNode(
  executor: PipelineExecutor,
  node: CoreTextOutputNode
): Promise<NewPipelineNodeExecution> {
  // Execute all input nodes
  const inputNodeResults: string[] = [];
  for (const inputNodeRef of node.inputs[0].outputNodeRefs) {
    const inputNode = executor.getNode(inputNodeRef);
    if (inputNode === null) {
      const message = `No node found for ref "${inputNodeRef}"`;
      return executor.getNodeErrorExecution(node, message);
    }

    const nodeExecution = await executor.executeNode(inputNode);

    if (nodeExecution.status === 'error') {
      const message = `Input node failed: (${nodeExecution.message})`;
      return executor.getNodeErrorExecution(node, message);
    }

    if (nodeExecution.status === 'success') {
      const result = nodeExecution.output[inputNodeRef.output] || null;

      if (result === null) {
        const message = `Input node ${inputNodeRef} had no output for key ${inputNodeRef.output}`;
        return executor.getNodeErrorExecution(node, message);
      }

      inputNodeResults.push(result);
    }
  }

  const result = inputNodeResults.join('\n\n');

  executor.setOutput(node.data.name, result);

  const output = { 'Text': result };
  return executor.getNodeSuccessExecution(node, output);
}
