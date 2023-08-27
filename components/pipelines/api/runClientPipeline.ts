import { ClientPipeline, PipelineRunnable } from '@/lib/pipelines/types';

export async function runClientPipeline(
  clientPipeline: ClientPipeline,
) : Promise<PipelineRunnable> {
  const response = await fetch(
    '/api/pipelines/run-pipeline-id',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pipelineId: clientPipeline.id,
        properties: clientPipeline.properties,
      }),
    }
  )
  return await response.json();
}
