import { NewPipelineClientExecution } from '@/lib/new-pipelines/types';
import { getDirectory } from '@/lib/new-pipelines/storage/executions/getDirectory';
import fs from 'fs';

export async function getSavedExecutions(pipelineId: string): Promise<NewPipelineClientExecution[]> {
  const directory = getDirectory(pipelineId);

  const executionPaths = fs.readdirSync(directory).map(p => `${directory}/${p}`);

  return executionPaths.map(
    executionPath => JSON.parse(
      fs.readFileSync(executionPath, 'utf-8')
    ) as NewPipelineClientExecution
  )
}
