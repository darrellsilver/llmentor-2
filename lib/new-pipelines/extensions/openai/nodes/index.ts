import { OpenAICompletionNode, OpenAICompletionNodeExtension } from './completion';

export type OpenAINode = (
  OpenAICompletionNode
);

export const nodeExtensions = [
  new OpenAICompletionNodeExtension(),
];

