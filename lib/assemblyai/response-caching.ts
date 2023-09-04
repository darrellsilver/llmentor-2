import "server-only";
import { AssemblyAiTranscriptResponse } from "@/lib/assemblyai/types";
import KVStore from "@/lib/kvStore";

export async function getCachedResponse(
  id: string
): Promise<AssemblyAiTranscriptResponse | null> {
  const cachedResponseKey = getCachedResponseKey(id);
  const response: string = (await KVStore.get(cachedResponseKey)) || "";

  if (response) {
    return JSON.parse(response);
  }

  return null;
}

export async function cacheResponse(
  id: string,
  response: AssemblyAiTranscriptResponse
): Promise<AssemblyAiTranscriptResponse> {
  const cachedResponseKey = getCachedResponseKey(id);
  await KVStore.set(cachedResponseKey, JSON.stringify(response));

  return response;
}

export async function getCachedResponsePaths(): Promise<string[]> {
  const namespace = getNamespace();
  const keys = await KVStore.keys(`${namespace}:*`);
  return keys?.map((key) => key.replace(`${namespace}:`, "")) || [];
}

function getCachedResponseKey(id: string): string {
  const namespace = getNamespace();
  return `${namespace}:${id.split(".")[0]}`;
}

function getNamespace() {
  return "data:assemblyai";
}
