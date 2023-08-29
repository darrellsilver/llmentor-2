import {
  NewPipelineInputNodeBase,
  TextInputFormat,
  TextOutputPort,
} from '@/lib/new-pipelines/types';

export type CoreTextInputNode = typeof coreTextInputNode;

export const coreTextInputNode: NewPipelineInputNodeBase<
  CoreTextInputNodeData,
  CoreTextInputNodeInputs,
  CoreTextInputNodeOutputs
> = {
  extension: 'core',
  type: 'textInput',
  id: '',
  tag: 'Input',
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
  format: TextInputFormat;
}

type CoreTextInputNodeInputs = [];

type CoreTextInputNodeOutputs = [
  TextOutputPort<'Text'>,
]
