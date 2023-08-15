'use client';

import { Button } from '@/components/ui/button';
import { Pipeline, PipelineRunnable } from '@/lib/pipelines/types';
import { useState } from 'react';

type PipelineRunnerProps = {
  pipeline: Pipeline
}

type RunningStatus = 'inactive' | 'running' | 'error' | 'success';

async function runPipeline(pipeline: Pipeline) {
  const response = await fetch(
    '/api/pipelines/run-pipeline',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pipeline }),
    }
  )
  return await response.json();
}

export function PipelineRunner({
 pipeline,
}: PipelineRunnerProps) {
  const [ status, setStatus ] = useState<RunningStatus>('inactive')
  const [ result, setResult ] = useState('')

  async function onClickRun () {
    setResult('');
    setStatus('running');

    const response = await runPipeline(pipeline) as PipelineRunnable;

    if (response.status === 'success') {
      setResult(response.result);
      setStatus('success');
    } else {
      setResult(response.message);
      setStatus('error');
    }
  }

  return (
    <div className="flex h-full flex-col">
      <Button
        className="w-full"
        disabled={status === 'running'}
        onClick={onClickRun}
      >
        {status === 'running' ? 'Running' : 'Start'}
      </Button>
      {result ? (
        <div
          className="no-scrollbar mt-4 overflow-y-scroll"
        >
          {result}
        </div>
      ) : (
        <div
          className="flex w-full flex-1 items-center justify-center"
        >
          {status === 'inactive' && 'Run for result'}
          {status === 'running' && 'Running...'}
          {status === 'error' && `An error occurred: ${result}`}
        </div>
      )}
    </div>
  )
}
