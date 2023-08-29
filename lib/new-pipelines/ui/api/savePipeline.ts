import { NewPipeline } from '@/lib/new-pipelines/types';
import { fetchPost } from '@/lib/new-pipelines/ui/api/common/fetchPost';

export async function savePipeline(pipeline: NewPipeline) {
  return await fetchPost(
    `/api/pipelines/save-pipeline`,
    { pipeline, directory: 'new-pipelines' },
    'pipeline'
  );
}
