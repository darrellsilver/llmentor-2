import { Pipeline, PipelineRunnable } from '@/lib/pipelines/types';

export async function runPipeline(pipeline: Pipeline) : Promise<PipelineRunnable> {
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
