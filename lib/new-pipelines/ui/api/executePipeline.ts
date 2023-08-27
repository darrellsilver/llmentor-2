import { NewPipeline } from '@/lib/new-pipelines/core/types';
import { fetchPost } from '@/lib/new-pipelines/ui/api/fetchPost';

export async function executePipeline(
  pipeline: NewPipeline,
  input: { [key: string]: any },
) {
  return await fetchPost(
    `/api/pipelines/execute-pipeline`,
    { pipeline, input },
    'execution'
  );
}
