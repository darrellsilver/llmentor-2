import { coreExtension, PipelineExtension } from '@/lib/new-pipelines/core/extensions';

const EXTENSIONS: PipelineExtension[] = [
  coreExtension,
];

export function getExtensions(extensionIds: string[]): PipelineExtension[] {
  const extensions: PipelineExtension[] = [];

  for (const extensionId of extensionIds) {
    const extension = getExtension(extensionId);
    if (extension === null) continue;
    extensions.push(extension);
  }

  return extensions;
}

function getExtension(extensionId: string): PipelineExtension | null {
  return EXTENSIONS.find(extension => extension.id === extensionId) || null;
}
