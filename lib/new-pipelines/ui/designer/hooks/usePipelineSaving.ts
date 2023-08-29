import { NewPipeline } from '@/lib/new-pipelines/types';
import { savePipeline } from '@/lib/new-pipelines/ui/api';
import { useState } from 'react';

export function usePipelineSaving(
  onBeforeSave: (pipeline: NewPipeline) => void = (pipeline) => {},
  onAfterSave: (pipeline: NewPipeline) => void = (pipeline) => {},
) {
  const [ isSaving, setIsSaving ] = useState(false)

  async function onSave(pipeline: NewPipeline) {
    onBeforeSave(pipeline);
    setIsSaving(true)
    const result = await savePipeline(pipeline);
    setIsSaving(false);
    onAfterSave(pipeline);
  }

  return { isSaving, onSave }
}

