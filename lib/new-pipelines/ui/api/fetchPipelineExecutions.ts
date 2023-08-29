import { fetchPost } from '@/lib/new-pipelines/ui/api/common/fetchPost';
import { NewPipeline, NewPipelineClientExecution } from '@/lib/new-pipelines/types';

export async function fetchPipelineExecutions(pipelineId: string): Promise<NewPipelineClientExecution[]> {
  return await fetchPost(
    `/api/pipelines/fetch-pipeline-executions`,
    { pipelineId },
    'clientExecutions'
  );
}
