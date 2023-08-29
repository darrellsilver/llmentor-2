import { fetchPost } from '@/lib/new-pipelines/ui/api/common/fetchPost';

export async function fetchPipeline(pipelineId: string) {
  return await fetchPost(
    `/api/pipelines/get-pipeline`,
    { pipelineId, directory: 'new-pipelines' },
    'pipeline'
  );
}
