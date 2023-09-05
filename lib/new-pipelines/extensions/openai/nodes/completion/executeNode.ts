'use server';

import { PipelineExecutor } from '@/lib/new-pipelines';
import { OpenAICompletionNode } from '@/lib/new-pipelines/extensions/openai/nodes/completion/types';
import { getOpenAiCompletion } from '@/lib/openai';

export async function executeNode(executor: PipelineExecutor, node: OpenAICompletionNode) {

  const promptOutputNodeRefs = node.inputs[0].outputNodeRefs;

  if (promptOutputNodeRefs.length === 0) {
    return executor.getNodeErrorExecution(node, `No prompts passed to OpenAICompletion node`)
  }

  const prompts = []
  for (const outputNodeRef of node.inputs[0].outputNodeRefs) {
    const inputNode = executor.getNode(outputNodeRef);
    if (inputNode === null) {
      const message = `No node found for ref "${outputNodeRef}"`;
      return executor.getNodeErrorExecution(node, message);
    }

    const nodeExecution = await executor.executeNode(inputNode);

    if (nodeExecution.status === 'error') {
      const message = `Input node failed: (${nodeExecution.message})`;
      return executor.getNodeErrorExecution(node, message);
    }

    if (nodeExecution.status === 'success') {
      // TODO ensure the type of this output matches the input type
      const result = nodeExecution.output[outputNodeRef.output];

      if (result === undefined) {
        const message = `Input node ${outputNodeRef} had no output for key ${outputNodeRef.output}`;
        return executor.getNodeErrorExecution(node, message);
      }

      prompts.push(result);
    }
  }

  const totalLength = prompts.reduce((acc, curr) => acc + curr.split(' ').join('').length, 0);
  const modelName = totalLength / 4 > 3500 ? 'gpt-3.5-turbo-16k' : 'gpt-3.5-turbo';

  const prompt = prompts.join('\n\n');
  const result = await getOpenAiCompletion(
    modelName,
    node.data.temperature,
    [],
    prompt,
    false
  );

  const output = {
    Prompt: prompt,
    Result: result,
  };
  return executor.getNodeSuccessExecution(node, output);
}
