import "server-only";
import _ from "lodash";

import { AssemblyAiTranscriptResponse } from "@/lib/assemblyai/types";
import KVStore from "@/lib/kvStore";

export async function getCachedResponse(
  fileName: string,
  deviceId: string | undefined
): Promise<AssemblyAiTranscriptResponse | null> {
  let cachedResponseKey;
  if (!deviceId) {
    const cachedResponseKeys =
      (await KVStore.keys(`data:assemblyai:*:filename`)) || [];
    cachedResponseKey = cachedResponseKeys[0];
  } else {
    cachedResponseKey = getCachedResponseKey(fileName, deviceId);
  }

  if (!cachedResponseKey) return null;

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
) {
  const existing = JSON.parse(
    (await KVStore.get(`${deviceId}:${fileName}`)) || "{}"
  );

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

  const transcriptData = {
    fileName,
    createdAt: existing?.createdAt || new Date().toISOString(),
    speakerAliases,
    status: response.status,
    id: response.id,
    utterances: response.utterances,
  };
  await KVStore.set(`${deviceId}:${fileName}`, JSON.stringify(transcriptData));

  return transcriptData;
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
