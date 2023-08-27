'use client';

import { PipelineFlow } from '@/components/pipelines';
import { NodeType, Pipeline } from '@/lib/pipelines/types';

import { PipelineEditorTopbar } from './pipeline-editor-topbar';
import { fetchTranscriptList } from '@/components/pipelines/api';
import { useEffect, useState } from 'react';
import { TranscriptList } from '@/components/pipelines/api/fetchTranscriptList';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { useTranscriptsStore } from '@/components/pipelines/stores/useTranscriptsStore';

type PipelineEditorProps = {
  pipeline: Pipeline
}

export function PipelineEditor({
  pipeline,
}: PipelineEditorProps) {
  // Fetch transcript
  useEffect(function() {
    fetchTranscriptList().then(transcripts => {
      useTranscriptsStore
        .getState()
        .setTranscripts(transcripts);
    });
  }, []);

  // Fetch pipeline and set nodes
  useEffect(() => {
    const { setNode } = usePipelineNodesStore.getState();
    for (const node of pipeline.nodes) {
      setNode(node);
    }
  }, [pipeline.nodes]);

  return (
    <div style={{ width: '100%', height: `calc(100vh - 65px)` }}>
      <PipelineFlow pipeline={pipeline} />
    </div>
  )
}
