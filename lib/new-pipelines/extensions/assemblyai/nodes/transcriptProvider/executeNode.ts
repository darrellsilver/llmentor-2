'use server';

import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { AssemblyAITranscriptProviderNode } from './types';
import { getTranscript, getTranscriptText } from '@/lib/assemblyai/transcription';

export async function executeNode(
  executor: PipelineExecutor,
  node: AssemblyAITranscriptProviderNode
) {
  if (node.inputs[0].outputNodeRefs.length === 0) {
    const message = `No transcript id provided to Transcript Provider node "${node.id}"`
    return executor.getNodeErrorExecution(node, message);
  }

  const inputNodeRef = node.inputs[0].outputNodeRefs[0];
  const inputNode = executor.getNode(node.inputs[0].outputNodeRefs[0]);
  if (inputNode === null) {
    const message = `Invalid node provided to Transcript Provider node "${node.id}": ${inputNodeRef}`;
    return executor.getNodeErrorExecution(node, message);
  }

  const nodeExecution = await executor.executeNode(inputNode);

  if (nodeExecution.status !== 'success') {
    const message = nodeExecution.status === 'error'
      ? `Transcript Provider node input error: ${nodeExecution.message}`
      : `Transcript Provider node input error: Node is ${nodeExecution.status}`;
    return executor.getNodeErrorExecution(node, message);
  }

  const transcriptId = nodeExecution.output[inputNodeRef.output];
  if (transcriptId === undefined) {
    const message = `Output key "${inputNodeRef.output}" not found on ${inputNodeRef}`;
    return executor.getNodeErrorExecution(node, message);
  }

  const transcript = await getTranscript(transcriptId);
  if (transcript === null) {
    const message = `No transcript with id "${transcriptId}"`;
    return executor.getNodeErrorExecution(node, message);
  }

  const transcriptText = getTranscriptText(transcript);
  if (transcriptText === null) {
    const message = `Transcript ${transcriptId} contained no data`;
    return executor.getNodeErrorExecution(node, message);
  }

  const output = { 'Transcript Text': transcriptText };
  return executor.getNodeSuccessExecution(node, output);
}
