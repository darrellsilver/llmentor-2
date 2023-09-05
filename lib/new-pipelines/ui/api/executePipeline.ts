import { NewPipeline } from '@/lib/new-pipelines/types';
import { fetchPost } from '@/lib/new-pipelines/ui/api/common/fetchPost';

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
