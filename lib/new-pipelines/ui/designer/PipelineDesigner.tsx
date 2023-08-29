'use client';

import { NewPipeline, NewPipelineExecution } from '@/lib/new-pipelines/types';
import { useEffect, useState } from 'react';
import { fetchPipeline, savePipelineExecution } from '@/lib/new-pipelines/ui/api';
import { PipelineDesignerFlow } from '@/lib/new-pipelines/ui/designer/pipeline-designer-flow';
import { usePipelineExecution, usePipelineSaving } from '@/lib/new-pipelines/ui/designer/hooks';
import { IconPulseLoader } from '@/views/analysis-session';
import { LoaderIcon } from 'lucide-react';
import { fetchPipelines } from '@/lib/new-pipelines/ui/api/fetchPipelines';
import { usePipelineStore } from '@/lib/new-pipelines/ui/stores/usePipelineStore';

import { PipelineDesignerSidebar } from './PipelineDesignerSidebar';

type PipelineDesignerProps = {
  pipelineId: string;
}

export function PipelineDesigner({
  pipelineId,
}: PipelineDesignerProps) {
  const {
    getPipelines,
    getPipeline,
    setPipeline,
    setPipelines,
  } = usePipelineStore(state => ({
    getPipelines: state.getPipelines,
    getPipeline: state.getPipeline,
    setPipeline: state.setPipeline,
    setPipelines: state.setPipelines,
  }))
  const [ isExecutorOpen, setIsExecutorOpen ] = useState(false);
  const { isSaving, onSave } = usePipelineSaving(setPipeline)
  const { execution, isExecuting, onExecute } = usePipelineExecution(setPipeline)

  useEffect(() => {
    const pipeline = getPipeline(pipelineId);
    if (pipeline) return;
    fetchPipeline(pipelineId).then(setPipeline);
  }, [pipelineId, getPipeline, setPipeline])

  useEffect(() => {
    fetchPipelines().then(setPipelines)
  }, [setPipelines])

  const pipeline = getPipeline(pipelineId);

  function onToggleExecutor() {
    setIsExecutorOpen(!isExecutorOpen);
  }

  function onUpdatePipeline(newPipeline: NewPipeline) {
    setPipeline(newPipeline)
  }

  async function onSaveExecution(execution: NewPipelineExecution) {
    await savePipelineExecution(execution);

    // TODO reflect saved in the ui
  }

  return (
    <div className="flex h-full w-full">
      <PipelineDesignerSidebar pipelines={getPipelines()} />
      <div className="flex-1">
        {pipeline === null ? (
          <IconPulseLoader
            Icon={<LoaderIcon className="animate-spin" />}
            text="Loading"
          />
        ) : (
          <PipelineDesignerFlow
            pipeline={pipeline}
            onUpdatePipeline={onUpdatePipeline}
            onSavePipeline={onSave}
            isSaving={isSaving}
            onToggleExecutor={onToggleExecutor}
            isExecutorOpen={isExecutorOpen}
            onExecutePipeline={onExecute}
            execution={execution}
            onSaveExecution={onSaveExecution}
            isExecuting={isExecuting}
          />
        )}
      </div>
    </div>
  )
}
