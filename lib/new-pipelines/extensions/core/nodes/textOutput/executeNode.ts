import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { NewPipelineNodeExecution, NewPipelineNodeExecutionBase } from '@/lib/new-pipelines/types';

import { CoreTextOutputNode } from './types';

export async function executeNode(
  executor: PipelineExecutor,
  node: CoreTextOutputNode
) {
  // Execute all input nodes
  // TODO extract collecting inputs
  const inputNodeResults: string[] = [];
  for (const inputNodeRef of node.inputs[0].outputNodeRefs) {
    const inputNode = executor.getNode(inputNodeRef);
    if (inputNode === null) {
      const message = `No node found for ref "${inputNodeRef}"`;
      return executor.getNodeErrorExecution(node, message);
    }

    const nodeExecution = await executor.executeNode(inputNode);

    if (nodeExecution.status === 'error') {
      const message = `Output node input failed: (${nodeExecution.message})`;
      return executor.getNodeErrorExecution(node, message);
    }

    if (nodeExecution.status === 'success') {
      // TODO ensure the type of this output matches the input type
      const result = nodeExecution.output[inputNodeRef.output];

      if (result === undefined) {
        const message = `Output node input ${inputNodeRef} had no output for key ${inputNodeRef.output}`;
        return executor.getNodeErrorExecution(node, message);
      }

      inputNodeResults.push(result);
    }
  }

  const result = inputNodeResults.join('\n\n');

  // TODO Base this on the 'Output' tag. Requires some standard output node interface
  return executor.getOutputNodeSuccessExecution(node, {}, result);
}
