import {
  BaseInputPipelineNode,
  NewPipelineNode,
  PipelineDataTypeText,
  PipelineNodeOutput,
  PipelineSingleNodeInput
} from '@/lib/new-pipelines/core/types';


type PipelineDataTypeTranscriptId = 'transcriptId';

export type PipelineNode = (
  TranscriptProviderPipelineNode
);

export type InputPipelineNode = (
  TranscriptIdInputPipelineNode
);

export type TranscriptIdInputPipelineNode = BaseInputPipelineNode & {
  dataType: 'transcriptId';
  output: {
    'Transcript Id': PipelineNodeOutput<PipelineDataTypeTranscriptId>;
  };
}

export type TranscriptProviderPipelineNode = NewPipelineNode & {
  type: 'transcriptProvider';
  data: { };
  input: {
    'Transcript Id': PipelineSingleNodeInput<PipelineDataTypeTranscriptId>;
  }
  output: {
    'Text': PipelineNodeOutput<PipelineDataTypeText>;
  };
}
