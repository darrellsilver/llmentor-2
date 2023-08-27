import { NewPipeline } from '@/lib/new-pipelines/core/types';
import { fetchPost } from '@/lib/new-pipelines/ui/api/fetchPost';

export async function savePipeline(pipeline: NewPipeline) {
  return await fetchPost(
    `/api/pipelines/save-pipeline`,
    { pipeline, directory: 'new-pipelines' },
    'pipeline'
  );
}
