import {
  NodeReference,
  NodeType,
  OpenAiNode,
  OutputNode,
  Pipeline,
  PipelineNode,
  PipelineNodeRunnable,
  PipelineProperty,
  PipelineRunnable,
  TextNode, TextProperty,
  TranscriptNode, TranscriptProperty
} from '@/lib/pipelines/types';
import { getOpenAiCompletion } from '@/lib/openai';
import { getTranscript } from '@/lib/assemblyai/transcription';

let currentPipeline: Pipeline;

export async function runPipeline(pipeline: Pipeline, properties: PipelineProperty[] = []): Promise<PipelineRunnable> {
  // TODO Create a pipeline runnable object with all pending nodes and use that instead
  currentPipeline = getMergedPipeline(pipeline, properties);

  // Start at the output node
  const outputNode = currentPipeline.nodes.find(n => n.type === 'OutputNode');

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

function getMergedPipeline(pipeline: Pipeline, properties: PipelineProperty[]) {
  const mergedPipeline = {
    ...pipeline,
    nodes: [ ...pipeline.nodes ],
  }

  for (const property of properties) {
    const pipelineNode = mergedPipeline.nodes.find(node => node.type === property.type && node.id === property.id);
    if (!pipelineNode) continue;

    switch (pipelineNode.type) {
      case NodeType.TextNode:
        pipelineNode.content = (property as TextProperty).content;
        break;
      case NodeType.TranscriptNode:
        pipelineNode.transcriptId = (property as TranscriptProperty).transcriptId;
        break;
    }
  }

  return mergedPipeline;
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
    case 'TranscriptNode':
      return await runTranscriptNode(node, nodeResults);
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
  // Fallback to existing reference for now
  const inputReferences = node.inputReferences || (node.inputReference ? [node.inputReference] : []);
  const inputNodes = await Promise.all(inputReferences.map(
    async (inputReference) => await getNode(inputReference)
  ));

  // Sort by y position here (top to bottom)
  // TODO Move to client (currently only references are available there)
  const sortedInputNodes = inputNodes.sort((a, b) => a.position.y - b.position.y);

  if (inputReferences.length === 0) {
    const result: PipelineNodeRunnable = {
      node,
      status: 'error',
      message: 'No inputs to output node'
    };

    nodeResults.push(result);

    return result;
  }

  const inputResults = [];
  for (const inputNode of inputNodes) {
    const inputResult = await runPipelineNode(inputNode, nodeResults);
    inputResults.push(inputResult)
  }

  const resultText = inputResults.map(inputResult => inputResult.status === 'error'
    ? `ERROR from ${inputResult.node.type} ${inputResult.node.id }: ${inputResult.message}`
    : inputResult.result
  ).join('\n\n');

  const result: PipelineNodeRunnable = {
    node,
    status: 'success',
    result: resultText,
  };

  nodeResults.push(result);

  return result;
}

async function runOpenAiNode(
  node: OpenAiNode,
  nodeResults: PipelineNodeRunnable[],
) : Promise<PipelineNodeRunnable> {
  // Return result if present node already ran
  const existingResult = nodeResults.find(
    result => result.node.type === node.type && result.node.id === node.id
  );
  if (existingResult) {
    return existingResult;
  }

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

  // Sort by y position here (top to bottom)
  // TODO Move to client (currently only references are available there)
  const sortedContextNodes = contextNodes.sort((a, b) => a.position.y - b.position.y);

  const contextResults = await Promise.all(sortedContextNodes.map(
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

async function runTranscriptNode(
  node: TranscriptNode,
  nodeResults: PipelineNodeRunnable[],
) {
  // Return result if present node already ran
  const existingResult = nodeResults.find(
    result => result.node.type === node.type && result.node.id === node.id
  );
  if (existingResult) {
    return existingResult;
  }

  const transcriptId = node.transcriptId;
  if (!transcriptId) {
    const result: PipelineNodeRunnable = {
      node,
      status: 'error',
      message: 'No Transcript set on Transcript node'
    };

    nodeResults.push(result);

    return result;
  }

  const transcript = await getTranscript(transcriptId);

  if (!transcript) {
    const result: PipelineNodeRunnable = {
      node,
      status: 'error',
      message: `No Transcript found for transcript id "${transcriptId}"`,
    };

    nodeResults.push(result);

    return result;
  }

  if (!transcript.utterances) {
    const result: PipelineNodeRunnable = {
      node,
      status: 'error',
      message: `No utterances found on transcript "${transcriptId}"`,
    };

    nodeResults.push(result);

    return result;
  }

  const result: PipelineNodeRunnable = {
    node,
    status: 'success',
    result: transcript.utterances.map(u => `**Speaker ${u.speaker}:** ${u.text}`).join('\n\n'),
  }

  nodeResults.push(result);

  return result;
}

async function getNode(nodeRef: NodeReference) : Promise<PipelineNode> {
  // Worst database ever
  return currentPipeline.nodes.find(n => nodeRef.type === n.type && nodeRef.id === n.id) as PipelineNode;
}
