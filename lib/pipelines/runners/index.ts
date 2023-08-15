import {
  NodeReference,
  OutputNode,
  Pipeline,
  PipelineNode,
  PipelineNodeRunnable,
  PipelineRunnable,
  TextNode, OpenAiNode
} from '@/lib/pipelines/types';
import { getOpenAiCompletion } from '@/lib/openai';

let currentPipeline: Pipeline;

export async function runPipeline(pipeline: Pipeline): Promise<PipelineRunnable> {
  currentPipeline = pipeline;

  const outputNode = pipeline.nodes.find(n => n.type === 'OutputNode');

  if (!outputNode) {
    return {
      pipeline,
      status: 'error',
      message: 'No OutputNode found',
    }
  }

  const nodeResults: PipelineNodeRunnable[] = []
  const result = await runPipelineNode(outputNode, nodeResults);

  return result.status === 'success' ? {
    pipeline,
    status: 'success',
    nodeResults,
    result: result.result,
  } : {
    pipeline,
    status: 'error',
    message: result.status === 'error' ? result.message : 'Unknown error',
  };
}

async function runPipelineNode(
  node: PipelineNode,
  nodeResults: PipelineNodeRunnable[],
): Promise<PipelineNodeRunnable> {
  switch (node.type) {
    case 'TextNode':
      return await runTextNode(node, nodeResults)
    case 'OutputNode':
      return await runOutputNode(node, nodeResults);
    case 'OpenAiNode':
      return await runOpenAiNode(node, nodeResults);
    default:
      return {
        node,
        status: 'error',
        message: `Unknown node type: ${node}`
      };
  }
}

async function runTextNode(
  node: TextNode,
  nodeResults: PipelineNodeRunnable[],
) : Promise<PipelineNodeRunnable> {
  const result: PipelineNodeRunnable = {
    node,
    status: 'success',
    result: node.content
  };

  nodeResults.push(result);

  return result;
}

async function runOutputNode(
  node: OutputNode,
  nodeResults: PipelineNodeRunnable[],
) {
  if (!node.inputReference) {
    const result: PipelineNodeRunnable = {
      node,
      status: 'error',
      message: 'No input to output node'
    };

    nodeResults.push(result);

    return result;
  }

  const inputNode = await getNode(node.inputReference);
  const inputResult = await runPipelineNode(inputNode, nodeResults);
  const result: PipelineNodeRunnable = inputResult.status === 'success' ? {
    node,
    status: 'success',
    result: inputResult.result,
  } : {
    node,
    status: 'error',
    message: 'Failed node'
  };

  nodeResults.push(result);

  return result;
}

async function runOpenAiNode(
  node: OpenAiNode,
  nodeResults: PipelineNodeRunnable[],
) : Promise<PipelineNodeRunnable> {
  if (!node.promptReference) {
    const result: PipelineNodeRunnable = {
      node,
      status: 'error',
      message: 'No input to OpenAi prompt'
    };

    nodeResults.push(result);

    return result;
  }

  const contextNodes = await Promise.all(node.contextReferences.map(
    async (contextReference) => await getNode(contextReference)
  ));
  const contextResults = await Promise.all(contextNodes.map(
    async (contextNode) => await runPipelineNode(contextNode, nodeResults)
  ));

  const contexts = [];
  for (const contextResult of contextResults) {
    if (contextResult.status == 'error') {
      const result: PipelineNodeRunnable = {
        node,
        status: 'error',
        message: 'OpenAi context provider failed'
      };

      nodeResults.push(result);

      return result;
    }

    contexts.push(contextResult.result);
  }

  const promptNode = await getNode(node.promptReference);
  const promptResult = await runPipelineNode(promptNode, nodeResults);

  if (promptResult.status !== 'success') {
    const result: PipelineNodeRunnable = {
      node,
      status: 'error',
      message: 'OpenAi prompt provider failed'
    };

    nodeResults.push(result);

    return result;
  }

  // Use a different model depending on prompt length
  const totalLength = (
    contexts.reduce((acc, curr) => acc + curr.split(' ').join('').length, 0) +
    promptResult.result.length
  );
  const modelName = totalLength / 4 > 3500 ? 'gpt-3.5-turbo-16k' : 'gpt-3.5-turbo';

  console.log(`Total length: ${totalLength}. Using model "${modelName}"`);

  const openAiResult = await getOpenAiCompletion(
    modelName,
    node.temperature,
    contexts,
    promptResult.result
  );

  const result: PipelineNodeRunnable = {
    node,
    status: 'success',
    result: openAiResult,
  };

  nodeResults.push(result);

  return result;
}

async function getNode(nodeRef: NodeReference) : Promise<PipelineNode> {
  // Worst database ever
  return currentPipeline.nodes.find(n => nodeRef.type === n.type && nodeRef.id === n.id) as PipelineNode;
}
