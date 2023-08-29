import { fetchPost } from '@/lib/new-pipelines/ui/api/common/fetchPost';
import { NewPipeline } from '@/lib/new-pipelines/types';

export async function fetchPipelines(): Promise<NewPipeline[]> {
  return await fetchPost(
    `/api/pipelines/fetch-pipelines`,
    { directory: 'new-pipelines' },
    'pipelines'
  );
}
