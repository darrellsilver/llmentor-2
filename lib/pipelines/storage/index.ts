import { NodeType, Pipeline } from '@/lib/pipelines/types';
import path from 'path';
import fs from 'fs';

export async function getPipeline(pipelineId: string): Promise<Pipeline | null> {
  const pipelineData = await getPipelines();
  const pipeline = pipelineData[pipelineId] || null;
  if (!pipeline) return pipeline;

  // Ensure backwards compatability with single input
  pipeline.nodes.forEach((node) => {
    if (node.type === NodeType.OutputNode && !node.inputReferences) {
      node.inputReferences = []
      if (node.inputReference) {
        node.inputReferences.push(node.inputReference)
      }
    }
  })

  return pipelineData[pipelineId] || null;
}

export async function getPipelines() : Promise<{ [key: string]: Pipeline }> {
  const filePath = getFilePath();
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return await JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function savePipeline(pipeline: Pipeline) {
  const pipelineData = await getPipelines();

  pipelineData[pipeline.id] = pipeline;

  await savePipelineData(pipelineData);

  return pipeline;
}

export async function savePipelineData(pipelines: { [key: string]: Pipeline }) {
  fs.writeFileSync(getFilePath(), JSON.stringify(pipelines));
}

function getFilePath() {
  const dataDir = path.resolve(process.cwd(), 'data/pipelines');
  return `${dataDir}/data.json`
}
