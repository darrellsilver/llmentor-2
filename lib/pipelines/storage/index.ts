import { ClientPipeline, NodeType, Pipeline, PipelineNode, PipelineProperty } from '@/lib/pipelines/types';
import path from 'path';
import fs from 'fs';

export async function getClientPipeline(pipelineId: string, directory: string = 'pipelines'): Promise<ClientPipeline | null> {
  const pipeline = await getPipeline(pipelineId, directory);
  if (pipeline === null) return pipeline;

  // TODO find a cleaner way to do this conversion
  const properties = [];
  for (const property of pipeline.nodes.filter(node => node.isProperty).map(nodeToProperty)) {
    if (property === null) continue;
    properties.push(property);
  }

  return {
    id: pipeline.id,
    title: pipeline.title,
    description: pipeline.description,
    properties,
  }
}

function nodeToProperty(node: PipelineNode): PipelineProperty | null {
  switch (node.type) {
    case NodeType.TextNode:
      return {
        type: node.type,
        id: node.id,
        name: node.name,
        content: node.content,
        useTextbox: node.useTextbox,
      };
    case NodeType.TranscriptNode:
      return {
        type: node.type,
        id: node.id,
        name: node.name,
        transcriptId: node.transcriptId,
      };
    default:
      return null;
  }
}

export async function getPipeline(pipelineId: string, directory: string = 'pipelines'): Promise<Pipeline | null> {
  // Prioritize individual pipeline file
  const pipelineFile = await getPipelineFromFile(pipelineId, directory);
  if (pipelineFile) {
    return pipelineFile;
  }

  const pipelineData = await getPipelineData(directory);
  const pipeline = pipelineData[pipelineId] || null;
  if (!pipeline) return null;

  // Ensure backwards compatability with single input
  pipeline.nodes.forEach((node) => {
    if (node.type === NodeType.OutputNode && !node.inputReferences) {
      node.inputReferences = []
      if (node.inputReference) {
        node.inputReferences.push(node.inputReference)
      }
    }
  })

  // Stub in description
  if (!pipeline.description) {
    pipeline.description = '';
  }

  // Save to own file
  await savePipeline(pipeline);

  return pipeline;
}

export async function getPipelines(directory: string = 'pipelines'): Promise<Pipeline[]> {
  const pipelines: Pipeline[] = [];

  // Get all the pipelines
  const pipelineIds = await getPipelineIds(directory);
  for (const pipelineId of pipelineIds) {
    const pipeline = await getPipeline(pipelineId, directory);
    if (pipeline === null) continue;
    pipelines.push(pipeline);
  }

  return pipelines;
}

export async function getPipelineData(directory: string = 'pipelines') : Promise<{ [key: string]: Pipeline }> {
  const filePath = getDataFilePath(directory);
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return await JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function savePipeline(pipeline: Pipeline, directory: string = 'pipelines') {
  fs.writeFileSync(await getPipelineFilePath(pipeline.id, directory), JSON.stringify(pipeline));
  return pipeline;
}

export async function upgradeFromDataJson(directory: string = 'pipelines') {
  const pipelineData = getPipelineData(directory);

  for (const pipeline of Object.values(pipelineData)) {
    await savePipeline(pipeline, directory);
  }
}

export async function savePipelineData(pipelines: { [key: string]: Pipeline }, directory: string = 'pipelines') {
  fs.writeFileSync(getDataFilePath(), JSON.stringify(pipelines));
}

async function getPipelineFromFile(pipelineId: string, directory: string = 'pipelines'): Promise<Pipeline | null> {
  const filePath = await getPipelineFilePath(pipelineId, directory);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return await JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Pipeline;
}

async function getPipelineIds(directory: string = 'pipelines') {
  const dataDir = path.resolve(process.cwd(), `data/${directory}`);
  return fs.readdirSync(dataDir)
    .map(fileName => fileName.replace('.json', ''))
    .filter(pipelineId => pipelineId !== 'data');
}

async function getPipelineFilePath(pipelineId: string, directory: string = 'pipelines') {
  const dataDir = path.resolve(process.cwd(), `data/${directory}`);

  return `${dataDir}/${pipelineId}.json`
}

function getDataFilePath(directory: string = 'pipelines') {
  const dataDir = path.resolve(process.cwd(), `data/${directory}`);
  return `${dataDir}/data.json`
}
