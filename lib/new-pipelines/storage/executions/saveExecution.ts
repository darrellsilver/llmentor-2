import { NewPipelineClientExecution, NewPipelineExecution } from '@/lib/new-pipelines/types';

import { getDirectory } from './getDirectory';
import fs from 'fs';

export async function saveExecution(execution: NewPipelineExecution): Promise<NewPipelineClientExecution> {
  const directory = getDirectory(execution.pipeline.id);
  const clientExecution = getClientExecution(execution);

  fs.writeFileSync(`${directory}/${execution.id}.json`, JSON.stringify(clientExecution));

  return clientExecution;
}

function getClientExecution(execution: NewPipelineExecution): NewPipelineClientExecution {
  const base = {
    id: execution.id,
    pipelineId: execution.pipeline.id,
    input: execution.input,
  }

  switch (execution.status) {
    case 'running':
      return {
        ...base,
        status: execution.status,
        progress: execution.progress,
      };
    case 'error':
      return {
        ...base,
        status: execution.status,
        message: execution.message,
      }
    case 'success':
      return {
        ...base,
        status: execution.status,
        output: execution.output,
      }
  }
}

