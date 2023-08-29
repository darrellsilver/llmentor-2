import { NewPipelineExecution } from '@/lib/new-pipelines/types';
import { fetchPost } from '@/lib/new-pipelines/ui/api/common/fetchPost';

export async function savePipelineExecution(execution: NewPipelineExecution) {
  return fetchPost(
    '/api/pipelines/save-execution',
    { execution },
    'clientExecution'
  )
}
