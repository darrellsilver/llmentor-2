import {
  InputPort, NewPipelineNodeInputs,
  NewPipelineOutputNodeBase, NewPipelineOutputNodeDataBase,
} from '@/lib/new-pipelines/types';

export type CorePipelineOutputNode = typeof corePipelineOutputNode;

const TYPE = 'pipelineOutput'

export const corePipelineOutputNode: NewPipelineOutputNodeBase<
  CorePipelineOutputNodeData,
  CorePipelineOutputNodeInputs,
  CorePipelineOutputNodeOutputs
> = {
  extension: 'core',
  type: TYPE,
  id: '',
  tag: 'Output',
  data: {
    name: 'Pipeline Output',
    pipelineId: '',
  },
  inputs: [],
  outputs: [],
  position: { x: 0, y: 0 },
};

type CorePipelineOutputNodeData = NewPipelineOutputNodeDataBase<{
  pipelineId: string;
}>;

type CorePipelineOutputNodeInputs = NewPipelineNodeInputs;

type CorePipelineOutputNodeOutputs = [];
