import { NewPipelineNodeBase, TextInputFormat } from '@/lib/new-pipelines/core/types';

export type CoreTextInputNode = typeof coreTextInputNode;

export const coreTextInputNode: NewPipelineNodeBase<CoreTextInputNodeData> = {
  extension: 'core',
  type: 'textInput',
  id: '',
  tag: 'input',
  data: {
    name: 'Text Input',
    description: '',
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

type CoreTextInputNodeData = {
  name: string;
  description: string;
  format: TextInputFormat;
}
