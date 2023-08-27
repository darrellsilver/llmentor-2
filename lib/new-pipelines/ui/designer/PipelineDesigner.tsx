'use client';

import { NewPipeline } from '@/lib/new-pipelines/core/types';
import { useEffect, useState } from 'react';
import { fetchPipeline, savePipeline } from '@/lib/new-pipelines/ui/api';
import { PipelineDesignerFlow } from '@/lib/new-pipelines/ui/designer/pipeline-designer-flow';
import { executePipeline } from '@/lib/new-pipelines/ui/api/executePipeline';
import { getPipelineNodes } from '@/lib/new-pipelines/ui/utils';
import { usePipelineExecution, usePipelineSaving } from '@/lib/new-pipelines/ui/designer/hooks';

type PipelineDesignerProps = {
  pipelineId: string;
}

export function PipelineDesigner({
  pipelineId,
}: PipelineDesignerProps) {
  const [ pipeline, setPipeline ] = useState<NewPipeline | null>(null);
  const [ isExecutorOpen, setIsExecutorOpen ] = useState(false);
  const { isSaving, onSave } = usePipelineSaving(setPipeline)
  const { execution, isExecuting, onExecute } = usePipelineExecution(setPipeline)

  useEffect(() => {
    setPipeline(null);
    fetchPipeline(pipelineId).then(setPipeline);
  }, [pipelineId])

  function onToggleExecutor() {
    setIsExecutorOpen(!isExecutorOpen);
  }

  return (
    <div className="h-full w-full">
      {pipeline === null ? (
        <div>Loading...</div>
      ) : (
        <PipelineDesignerFlow
          pipeline={pipeline}
          onSavePipeline={onSave}
          isSaving={isSaving}
          onToggleExecutor={onToggleExecutor}
          isExecutorOpen={isExecutorOpen}
          onExecutePipeline={onExecute}
          execution={execution}
          isExecuting={isExecuting}
        />
      )}
    </div>
  )
}
