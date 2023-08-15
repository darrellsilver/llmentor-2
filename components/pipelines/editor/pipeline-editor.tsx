'use client';

import { PipelineFlow } from '@/components/pipelines';
import { Pipeline } from '@/lib/pipelines/types';

import { PipelineEditorTopbar } from './pipeline-editor-topbar';

type PipelineEditorProps = {
  pipeline: Pipeline
}

export function PipelineEditor({
  pipeline,
}: PipelineEditorProps) {
  return (
    <div style={{ width: '100%', height: `calc(100vh - 65px)` }}>
      <PipelineFlow pipeline={pipeline} />
    </div>
  )
}
