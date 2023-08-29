import { NewPipeline, NewPipelineExecution } from '@/lib/new-pipelines/types';
import { executePipeline } from '@/lib/new-pipelines/ui/api';
import { useState } from 'react';

export function usePipelineExecution(
  onBeforeExecute?: null | ((pipeline: NewPipeline) => void),
  onAfterExecute?: null | ((pipeline: NewPipeline) => void),
) {
  const [ isExecuting, setIsExecuting ] = useState(false)
  const [ execution, setExecution ] = useState<NewPipelineExecution | null>(null);

  async function onExecute(pipeline: NewPipeline, input: { [key: string]: any }) {
    onBeforeExecute && onBeforeExecute(pipeline);
    setIsExecuting(true)
    const execution = await executePipeline(pipeline, input);
    setIsExecuting(false);
    setExecution(execution)
    onAfterExecute && onAfterExecute(pipeline);
  }

  return { isExecuting, execution, onExecute }
}
