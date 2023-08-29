import {
  NewPipelineNodeBase,
  TextOutputPort,
  TextSingleInputPort,
} from '@/lib/new-pipelines/types';

export type AssemblyAITranscriptProviderNode = typeof assemblyAITranscriptProviderNode;

export const assemblyAITranscriptProviderNode: NewPipelineNodeBase<
  AssemblyAITranscriptIdInputNodeData,
  AssemblyAITranscriptIdInputNodeInputs,
  AssemblyAITranscriptIdInputNodeOutputs
> = {
  extension: 'assemblyai',
  type: 'transcriptProvider',
  id: '',
  tag: '',
  data: {
    name: 'Transcript Id',
    description: '',
  },
  inputs: [
    {
      name: 'Transcript Id',
      type: 'text',
      allowMultiple: false,
      outputNodeRefs: [],
    }
  ],
  outputs: [
    {
      name: 'Transcript Text',
      type: 'text',
    },
  ],
  position: { x: 0, y: 0 },
};

type AssemblyAITranscriptIdInputNodeData = { };

type AssemblyAITranscriptIdInputNodeInputs = [
  TextSingleInputPort<'Transcript Id'>,
];

type AssemblyAITranscriptIdInputNodeOutputs = [
  TextOutputPort<'Transcript Text'>,
]
