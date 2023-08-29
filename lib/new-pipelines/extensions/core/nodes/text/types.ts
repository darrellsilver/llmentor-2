import { NewPipelineNodeBase, TextInputFormat, TextOutputPort } from '@/lib/new-pipelines/types';

export type CoreTextNode = typeof coreTextNode;

export const coreTextNode: NewPipelineNodeBase<
  CoreTextNodeData,
  CoreTextNodeInputs,
  CoreTextNodeOutputs
> = {
  extension: 'core',
  type: 'text',
  id: '',
  tag: '',
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

type CoreTextNodeInputs = [];

type CoreTextNodeOutputs = [
  TextOutputPort<'Text'>,
]
