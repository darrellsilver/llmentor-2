import { PipelineExtension } from '@/lib/new-pipelines/interfaces';

import { extension as coreExtension } from './core';
import { extension as assemblyAIExtension } from './assemblyai';
import { extension as openAIExtension } from './openai';

const EXTENSIONS: PipelineExtension[] = [
  coreExtension,
  assemblyAIExtension,
  openAIExtension,
];

const EXTENSIONS_BY_ID: { [key: string]: PipelineExtension } = EXTENSIONS.reduce(
  (acc, curr) => ({ ...acc, [curr.id]: curr }),
  { }
)

export function getAllExtensions(): PipelineExtension[] {
  return EXTENSIONS;
}

export function getExtensions(extensionIds: string[]): PipelineExtension[] {
  return extensionIds.reduce(
    (acc, curr) => {
      const extension = getExtension(curr);
      return extension ? [ ...acc, extension ] : acc;
    },
    [] as PipelineExtension[]
  )
}

function getExtension(extensionId: string): PipelineExtension | null {
  const extension = EXTENSIONS_BY_ID[extensionId] || null;

  if (extension === null) {
    console.warn(`No extension found with id "${extensionId}"`)
  }

  return extension;
}
