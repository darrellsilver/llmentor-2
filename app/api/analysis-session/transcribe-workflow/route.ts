import { NextRequest, NextResponse } from "next/server";

import { cacheResponse } from "@/lib/assemblyai/response-caching";
import {
  TEST_FILE_URL,
  fetchTranscription,
  startTranscription,
  startTranscriptionForFile,
} from "@/lib/assemblyai/transcription";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const deviceId = req.nextUrl.searchParams.get("deviceId");
  const fileName = req.nextUrl.searchParams.get("fileName");

  if (!id) {
    return NextResponse.json({ error: "No transcript-analysis id" });
  }

  if (!deviceId) {
    return NextResponse.json({ error: "No device id" });
  }

  if (!fileName) {
    return NextResponse.json({ error: "No file name" });
  }

  const session = await fetchTranscription(id);

  await cacheResponse(fileName, deviceId, session);

  return NextResponse.json(session);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const deviceId = formData.get("deviceId") as string;
  let expectedSpeakers = Number(formData.get("expectedSpeakers"));

  if (!expectedSpeakers) {
    expectedSpeakers = 2;
  }

  // Form data is stringified
  const response =
    formData.get("file") !== undefined && formData.get("file") !== "undefined"
      ? await startTranscriptionForFile(
          file.name.split(".")[0],
          deviceId,
          file,
          expectedSpeakers
        )
      : await startTranscription(
          "TestFile.mp3",
          deviceId,
          TEST_FILE_URL,
          expectedSpeakers
        );

  return NextResponse.json(response);
}
