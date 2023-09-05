import {
  NewPipelineOutputNodeBase,
  TextMultiInputPort
} from '@/lib/new-pipelines/types';

export type CoreTextOutputNode = typeof coreTextOutputNode;

const TYPE = 'textOutput'

export const coreTextOutputNode: NewPipelineOutputNodeBase<
  CoreTextOutputNodeData,
  CoreTextOutputNodeInputs,
  CoreTextOutputNodeOutputs
> = {
  extension: 'core',
  type: TYPE,
  id: '',
  tag: 'Output',
  data: {
    name: 'Text Output',
    format: 'markdown'
  },
  inputs: [
    {
      name: 'Output',
      type: 'text',
      allowMultiple: true,
      outputNodeRefs: [],
    }
  ],
  outputs: [],
  position: { x: 0, y: 0 },
};

type CoreTextOutputNodeData = {
  name: string;
  format: 'text' | 'markdown' | 'code'
}

type CoreTextOutputNodeInputs = [
  TextMultiInputPort<'Output'>,
]

type CoreTextOutputNodeOutputs = [];
