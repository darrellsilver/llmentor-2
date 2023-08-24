import { Pipeline, PipelineProperty, PipelineRunnable } from '@/lib/pipelines/types';

export async function runPipeline(
  pipeline: Pipeline,
  properties: PipelineProperty[] = []
) : Promise<PipelineRunnable> {
  const response = await fetch(
    '/api/pipelines/run-pipeline',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pipeline, properties }),
    }
  )
  return await response.json();
}
