import { NewPipelineNodeBase, TextInputFormat } from '@/lib/new-pipelines/core/types';

export type CoreTextNode = typeof coreTextNode;

export const coreTextNode: NewPipelineNodeBase<CoreTextNodeData> = {
  extension: 'core',
  type: 'text',
  id: '',
  tag: 'input',
  data: {
    content: '',
    format: 'input',
  },
  inputs: [],
  outputs: [
    {
      name: 'Text',
      type: 'text',
    },
  ],
  position: { x: 0, y: 0 },
};

type CoreTextNodeData = {
  content: string;
  format: TextInputFormat;
}
