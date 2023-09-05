'use client';

import { useEffect, useState } from 'react';
import { usePipelineStore } from '@/lib/new-pipelines/ui/stores/usePipelineStore';
import { fetchPipeline } from '@/lib/new-pipelines/ui/api';

type PipelineStatus = 'fetching' | 'error' | 'success'

export function usePipeline(pipelineId: string) {
  const [ status, setStatus ] = useState<PipelineStatus>('fetching');
  const [ error, setError ] = useState<string | null>(null);

  const {
    getPipeline,
    setPipeline,
  } = usePipelineStore(state => ({
    getPipeline: state.getPipeline,
    setPipeline: state.setPipeline,
  }));

  // Lazily fetch pipelines
  useEffect(() => {
    async function fetchAndSetPipeline(pipelineId: string) {
      setStatus('fetching');
      try {
        const pipeline = await fetchPipeline(pipelineId);
        setPipeline(pipeline);
        setStatus('success');
      }
      catch (e) {
        setStatus('error')
        setError(`Error fetching pipeline "${pipelineId}"`);
      }
    }

    getPipeline(pipelineId) || fetchAndSetPipeline(pipelineId);
  }, [pipelineId, getPipeline, setPipeline])

  return {
    status,
    error,
    pipeline: getPipeline(pipelineId),
  }
}
