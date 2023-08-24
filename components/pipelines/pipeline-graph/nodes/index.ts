import { OutputFlowNode } from './OutputFlowNode';
export { OutputFlowNode } from './OutputFlowNode';

import { TextFlowNode } from './TextFlowNode';
export { TextFlowNode } from './TextFlowNode';

import { OpenAiFlowNode } from './OpenAiFlowNode';
export { OpenAiFlowNode } from './OpenAiFlowNode';

import { TranscriptFlowNode } from './TranscriptFlowNode';
export { TranscriptFlowNode } from './TranscriptFlowNode';

export const nodeTypes = {
  OutputNode: OutputFlowNode,
  TextNode: TextFlowNode,
  OpenAiNode: OpenAiFlowNode,
  TranscriptNode: TranscriptFlowNode,
}
