import { NewPipeline, NewPipelineExecution } from '@/lib/new-pipelines/core/types';
import { executePipeline } from '@/lib/new-pipelines/ui/api';
import { useState } from 'react';

export function usePipelineExecution(
  onBeforeExecute: (pipeline: NewPipeline) => void = (pipeline) => {},
  onAfterExecute: (pipeline: NewPipeline) => void = (pipeline) => {},
) {
  const [ isExecuting, setIsExecuting ] = useState(false)
  const [ execution, setExecution ] = useState<NewPipelineExecution | null>(null);

  async function onExecute(pipeline: NewPipeline, input: { [key: string]: any }) {
    onBeforeExecute(pipeline);
    setIsExecuting(true)
    const execution = await executePipeline(pipeline, input);
    setIsExecuting(false);
    setExecution(execution)
    onAfterExecute(pipeline);
    console.log(execution);
  }

  return { isExecuting, execution, onExecute }
}
