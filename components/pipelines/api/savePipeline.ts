import { Pipeline } from '@/lib/pipelines/types';

export async function savePipeline(pipeline: Pipeline) {
  const response = await fetch(
    `/api/pipelines/save-pipeline`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pipeline }),
    }
  )
  const data = await response.json();
  return data.pipeline;
}
