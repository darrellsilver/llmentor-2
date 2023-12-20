import { NextRequest, NextResponse } from "next/server";

import { cacheResponse } from "@/lib/assemblyai/response-caching";
import {
  TEST_FILE_URL,
  fetchTranscription,
  startTranscription,
  startTranscriptionForFile,
} from "@/lib/assemblyai/transcription";

export async function GET(req: NextRequest) {
  console.log("***GET /transcribe-workflow");
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

  try {
    const response = await fetchTranscription(id);
    const result = await cacheResponse(fileName, deviceId, response);
    console.log("***GET: result");
    try {
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.log("***GET: bad JSON");
      console.log(result);
    }
    return NextResponse.json(result);
  } catch (err) {
    console.log("***GET: error!");
    console.log(err);
    try {
      console.log(JSON.stringify(err, null, 2));
    } catch (err) {
      console.log("***GET: bad JSON");
    }
    return NextResponse.json({
      error:
        // @ts-ignore
        err?.response?.data?.error ||
        "Error fetching transcription from Assembly API",
    });
  }
}

export async function POST(req: NextRequest) {
  console.log("***POST /transcribe-workflow");
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

  console.log("***POST: response");
  try {
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.log("***POST: bad JSON");
    console.log(response);
  }
  return NextResponse.json(response);
}
