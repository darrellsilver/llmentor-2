import * as process from "process";
import axios from "axios";

import {
  cacheResponse,
  getCachedResponse,
  getCachedResponsePaths,
} from "@/lib/assemblyai/response-caching";
import {
  AssemblyAiTranscriptRequest,
  AssemblyAiTranscriptResponse,
  AssemblyAiUploadResponse,
} from "@/lib/assemblyai/types";

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

export const TEST_FILE_URL =
  "https://github.com/AssemblyAI-Examples/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3";

// AssemblyAI transcript endpoints
const BASE_ENDPOINT = "https://api.assemblyai.com/v2";
const UPLOAD_ENDPOINT = `${BASE_ENDPOINT}/upload`;
const TRANSCRIPT_ENDPOINT = `${BASE_ENDPOINT}/transcript`;

export async function startTranscriptionForFile(
  fileName: string,
  deviceId: string,
  file: File,
  expectedSpeakers: number
): Promise<AssemblyAiTranscriptResponse> {
  // Check the cache
  let cachedResponse = await getRefreshedCacheResponse(fileName, deviceId);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Upload the file to AssemblyAI
  const fileUploadResponse = await uploadFile(file);

  // Start transcription using the uploaded file's url
  return startTranscription(
    fileName,
    deviceId,
    fileUploadResponse.upload_url,
    expectedSpeakers
  );
}

export async function uploadFile(
  file: File
): Promise<AssemblyAiUploadResponse> {
  const config = {
    headers: {
      Authorization: ASSEMBLYAI_API_KEY,
    },
  };

  const fileData = await file.arrayBuffer();
  const response = await axios.post(UPLOAD_ENDPOINT, fileData, config);

  return response.data;
}

export async function startTranscription(
  fileName: string,
  deviceId: string,
  fileUrl: string,
  speakersExpected: number
): Promise<AssemblyAiTranscriptResponse> {
  // Check the cache
  let cachedResponse = await getRefreshedCacheResponse(fileName, deviceId);
  if (cachedResponse) {
    return cachedResponse;
  }

  const data: AssemblyAiTranscriptRequest = {
    audio_url: fileUrl,
    speaker_labels: true,
    speakers_expected: speakersExpected === 0 ? null : speakersExpected,
  };

  const config = {
    headers: {
      Authorization: ASSEMBLYAI_API_KEY,
    },
  };

  const response = await axios.post(TRANSCRIPT_ENDPOINT, data, config);

  // Cache the response, so we don't request another transcription of the same object
  await cacheResponse(fileName, deviceId, response.data);

  return response.data;
}

async function getRefreshedCacheResponse(
  fileName: string,
  deviceId: string
): Promise<AssemblyAiTranscriptResponse | null> {
  let cachedResponse = await getCachedResponse(fileName, deviceId);
  if (cachedResponse) {
    // Refresh the cache if still pending
    if (
      cachedResponse.status === "queued" ||
      cachedResponse.status === "processing"
    ) {
      console.log("[getRefreshedCacheResponse] Cache response refreshing");
      cachedResponse = await fetchTranscription(cachedResponse.id);
      await cacheResponse(fileName, deviceId, cachedResponse);
    }
  }
  return cachedResponse;
}

export async function fetchTranscription(
  assemblyAiTranscriptId: string
): Promise<AssemblyAiTranscriptResponse> {
  const url = `${TRANSCRIPT_ENDPOINT}/${assemblyAiTranscriptId}`;
  const config = {
    headers: {
      Authorization: ASSEMBLYAI_API_KEY,
    },
  };

  const response = await axios.get(url, config);

  return response.data;
}

export async function getTranscriptIds(): Promise<string[]> {
  const paths = await getCachedResponsePaths();
  return paths.map((p) => p.split(".")[0]);
}

export async function getTranscript(
  transcriptId: string,
  deviceId: string
): Promise<AssemblyAiTranscriptResponse | null> {
  return await getCachedResponse(transcriptId, deviceId);
}
