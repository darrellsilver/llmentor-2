import { NewPipelineNodeBase } from '@/lib/new-pipelines/core/types';

export type CoreTextOutputNode = typeof coreTextOutputNode;

const TYPE = 'textOutput'

export const coreTextOutputNode: NewPipelineNodeBase<CoreTextOutputNodeData> = {
  extension: 'core',
  type: TYPE,
  id: '',
  tag: 'output',
  data: {
    name: 'Text Output',
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
}
