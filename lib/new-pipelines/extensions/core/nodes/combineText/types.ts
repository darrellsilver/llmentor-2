import {
  NewPipelineNodeBase,
  NewPipelineOutputNodeBase,
  TextMultiInputPort, TextOutputPort
} from '@/lib/new-pipelines/types';

export type CoreCombineTextNode = typeof coreCombineTextNode;

const TYPE = 'combineText'

export const coreCombineTextNode: NewPipelineNodeBase<
  CoreCombineTextNodeData,
  CoreCombineTextNodeInputs,
  CoreCombineTextNodeOutputs
> = {
  extension: 'core',
  type: TYPE,
  id: '',
  tag: '',
  data: {
    name: 'Combine Text',
    format: 'markdown'
  },
  inputs: [
    {
      name: 'Inputs',
      type: 'text',
      allowMultiple: true,
      outputNodeRefs: [],
    }
  ],
  outputs: [
    {
      name: 'Text',
      type: 'text',
    }
  ],
  position: { x: 0, y: 0 },
};

type CoreCombineTextNodeData = {
  name: string;
  format: 'text' | 'markdown' | 'code'
}

type CoreCombineTextNodeInputs = [
  TextMultiInputPort<'Inputs'>,
]

type CoreCombineTextNodeOutputs = [
  TextOutputPort<'Text'>
];
