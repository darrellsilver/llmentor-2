'use client';

import { PipelineFlow } from '@/components/pipelines';
import { Pipeline } from '@/lib/pipelines/types';

import { PipelineEditorTopbar } from './pipeline-editor-topbar';
import { fetchTranscriptList } from '@/components/pipelines/api';
import { useEffect, useState } from 'react';
import { TranscriptList } from '@/components/pipelines/api/fetchTranscriptList';

type PipelineEditorProps = {
  pipeline: Pipeline
}

export function PipelineEditor({
  pipeline,
}: PipelineEditorProps) {
  const [ transcripts, setTranscripts ] = useState<TranscriptList>([]);

  async function fetchTranscripts() {
    const transcripts = await fetchTranscriptList();
    setTranscripts(transcripts);
  }

  useEffect(function() {
    fetchTranscripts();
  }, []);

  return (
    <div style={{ width: '100%', height: `calc(100vh - 65px)` }}>
      <PipelineFlow pipeline={pipeline} transcripts={transcripts} />
    </div>
  )
}
