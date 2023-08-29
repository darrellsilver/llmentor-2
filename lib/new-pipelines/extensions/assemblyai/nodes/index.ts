import { AssemblyAITranscriptIdInputNode, AssemblyAITranscriptIdInputNodeExtension } from './transcriptIdInput';
import { AssemblyAITranscriptProviderNode, AssemblyAITranscriptProviderNodeExtension } from './transcriptProvider';

export type AssemblyAINode = (
  AssemblyAITranscriptIdInputNode |
  AssemblyAITranscriptProviderNode
);

export const nodeExtensions = [
  new AssemblyAITranscriptIdInputNodeExtension(),
  new AssemblyAITranscriptProviderNodeExtension(),
];
