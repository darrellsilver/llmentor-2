import { NodeType, Pipeline } from '@/lib/pipelines/types';
import { pipe } from 'next/dist/build/webpack/config/utils';
import path from 'path';
import fs from 'fs';

export async function getPipeline(pipelineId: string) {
  const pipelines = await getPipelines();
  return pipelines[pipelineId];
}

export async function getPipelines() {
  const filePath = getFilePath();
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return await JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function savePipeline(pipeline: Pipeline) {
  const pipelines = await getPipelines();

  pipelines[pipeline.id] = pipeline;

  await savePipelines(pipelines);

  return pipeline;
}

export async function savePipelines(pipelines: { [key: string]: Pipeline }) {
  fs.writeFileSync(getFilePath(), JSON.stringify(pipelines))
}

function getFilePath() {
  const dataDir = path.resolve(process.cwd(), 'data/pipelines');
  return `${dataDir}/data.json`
}
