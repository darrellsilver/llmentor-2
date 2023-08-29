import { NewPipelineNodeBase, TextInputFormat, TextMultiInputPort, TextOutputPort } from '@/lib/new-pipelines/types';

export type OpenAICompletionNode = typeof openAiCompletionNode;

export const openAiCompletionNode: NewPipelineNodeBase<
  OpenAICompletionNodeData,
  OpenAICompletionNodeInputs,
  OpenAICompletionNodeOutputs
> = {
  extension: 'openai',
  type: 'completion',
  id: '',
  tag: '',
  data: {
    temperature: 0,
  },
  inputs: [
    {
      name: 'Prompt',
      type: 'text',
      allowMultiple: true,
      outputNodeRefs: [],
    },
  ],
  outputs: [
    {
      name: 'Prompt',
      type: 'text',
    },
    {
      name: 'Result',
      type: 'text',
    },
  ],
  position: { x: 0, y: 0 },
};

type OpenAICompletionNodeData = {
  temperature: number;
}

type OpenAICompletionNodeInputs = [
  TextMultiInputPort<'Prompt'>
];

type OpenAICompletionNodeOutputs = [
  TextOutputPort<'Prompt'>,
  TextOutputPort<'Result'>,
]
