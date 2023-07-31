import fs from 'fs';
import path from 'path';
import { AssemblyAiTranscriptResponse } from '@/lib/assemblyai/types';

export async function getCachedResponse(id: string): Promise<AssemblyAiTranscriptResponse | null> {
  const cachedResponsePath = getCachedResponsePath(id);

  if (!fs.existsSync(cachedResponsePath)) {
    return null;
  }

  return await JSON.parse(fs.readFileSync(cachedResponsePath, 'utf-8'));
}

export async function cacheResponse(
  id: string,
  response: AssemblyAiTranscriptResponse
): Promise<AssemblyAiTranscriptResponse> {
  const cachedResponsePath = getCachedResponsePath(id);
  fs.writeFileSync(cachedResponsePath, JSON.stringify(response));
  return response;
}

function getCachedResponsePath(id: string): string {
  const dataDir = path.resolve(process.cwd(), 'data/assemblyai');
  return `${dataDir}/${id.split('.')[0]}.json`
}
