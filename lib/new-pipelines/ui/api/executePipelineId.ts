import { fetchPost } from '@/lib/new-pipelines/ui/api/common/fetchPost';

export async function executePipelineId(
  pipelineId: string,
  input: { [key: string]: any },
) {
  return await fetchPost(
    `/api/pipelines/execute-pipeline-id`,
    { pipelineId, input },
    'execution'
  );
}
