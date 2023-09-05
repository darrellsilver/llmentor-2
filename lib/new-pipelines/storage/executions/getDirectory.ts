import path from 'path';
import fs from 'fs';

export function getDirectory(pipelineId: string) {
  const dataDir = path.resolve(process.cwd(), `data/pipeline-executions/${pipelineId}`);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  return dataDir;
}

