import { INPUT_TAG, NewPipelineInputNodeBase, TextOutputPort, } from '@/lib/new-pipelines/types';

export type AssemblyAITranscriptIdInputNode = typeof assemblyAITranscriptIdInputNode;

export const assemblyAITranscriptIdInputNode: NewPipelineInputNodeBase<
  AssemblyAITranscriptIdInputNodeData,
  AssemblyAITranscriptIdInputNodeInputs,
  AssemblyAITranscriptIdInputNodeOutputs
> = {
  extension: 'assemblyai',
  type: 'transcriptIdInput',
  id: '',
  tag: INPUT_TAG,
  data: {
    name: 'Transcript Id',
    description: '',
  },
  inputs: [ ],
  outputs: [
    {
      name: 'Transcript Id',
      type: 'text',
    },
  ],
  position: { x: 0, y: 0 },
};

type AssemblyAITranscriptIdInputNodeData = { };

type AssemblyAITranscriptIdInputNodeInputs = [ ];

type AssemblyAITranscriptIdInputNodeOutputs = [
  TextOutputPort<'Transcript Id'>,
]
