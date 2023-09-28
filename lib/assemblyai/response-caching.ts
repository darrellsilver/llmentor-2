import "server-only";
import _ from "lodash";

import { AssemblyAiTranscriptResponse } from "@/lib/assemblyai/types";
import KVStore from "@/lib/kvStore";

export async function getCachedResponse(
  fileName: string,
  deviceId: string
): Promise<AssemblyAiTranscriptResponse | null> {
  const cachedResponseKey = getCachedResponseKey(fileName, deviceId);
  const response: string = (await KVStore.get(cachedResponseKey)) || "";

  if (response) {
    return JSON.parse(response);
  }

  return null;
}

export async function cacheResponse(
  fileName: string,
  deviceId: string,
  response: AssemblyAiTranscriptResponse
): Promise<AssemblyAiTranscriptResponse> {
  const cachedResponseKey = getCachedResponseKey(fileName, deviceId);

  await KVStore.set(cachedResponseKey, JSON.stringify(response));

  const cachedData = await KVStore.get(`${deviceId}:${fileName}`);
  const existing = JSON.parse(cachedData || "{}");

  let speakerAliases = existing?.speakerAliases;
  if (!speakerAliases && response?.utterances?.length) {
    const speakerIds = _.uniq(
      response.utterances.map(({ speaker }) => speaker)
    );
    speakerAliases = speakerIds.map((speakerId: string) => ({
      id: speakerId,
      nickname: "",
      isUser: false,
    }));
  }
  await KVStore.set(
    `${deviceId}:${fileName}`,
    JSON.stringify({
      fileName,
      createdAt: existing?.createdAt || new Date().toISOString(),
      speakerAliases,
    })
  );

  return response;
}

export async function getCachedResponsePaths(): Promise<string[]> {
  const namespace = getNamespace();
  const keys = await KVStore.keys(`${namespace}:*`);
  return keys?.map((key) => key.replace(`${namespace}:`, "")) || [];
}

function getCachedResponseKey(fileName: string, deviceId: string): string {
  const namespace = getNamespace();
  return `${namespace}:${deviceId}:${fileName.split(".")[0]}`;
}

function getNamespace() {
  return "data:assemblyai";
}
