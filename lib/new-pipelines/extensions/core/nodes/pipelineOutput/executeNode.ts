'use server';

import { PipelineExecutor } from '@/lib/new-pipelines/execution';

import { CorePipelineOutputNode } from './types';
import { getPipeline } from '@/lib/pipelines/storage';
import { NewPipeline } from '@/lib/new-pipelines/types';
import { isInputNode } from '@/lib/new-pipelines/utils';

export async function executeNode(
  executor: PipelineExecutor,
  node: CorePipelineOutputNode
) {
  const pipeline = await getPipeline(node.data.pipelineId, 'new-pipelines') as NewPipeline | null;
  if (!pipeline) {
    const message = `No pipeline with id "${node.data.pipelineId}"`;
    return executor.getNodeErrorExecution(node, message);
  }

  const inputObj: { [key: string]: any } = { };
  for (const input of node.inputs) {
    for (const outputNodeRef of input.outputNodeRefs) {
      const inputNode = executor.getNode(outputNodeRef);
      if (inputNode === null) continue;

      const nodeExecution = await executor.executeNode(inputNode);

      if (nodeExecution.status === 'error') {
        return executor.getNodeErrorExecution(node, `Input failed: ${outputNodeRef}`);
      }

      if (nodeExecution.status === 'success') {
        const inputNode = pipeline.nodes
          .filter(isInputNode)
          .find(inputNode => inputNode.data.name === input.name) || null;

        if (inputNode === null) {
          const message = `Could not find input node with name "${input.name}"`;
          return executor.getNodeErrorExecution(node, message);
        }

        inputObj[inputNode.id] = nodeExecution.output[outputNodeRef.output];
      }
    }
  }

  const result = {
    pipelineId: node.data.pipelineId,
    input: inputObj,
  };

  return executor.getOutputNodeSuccessExecution(node, {}, result);
}
