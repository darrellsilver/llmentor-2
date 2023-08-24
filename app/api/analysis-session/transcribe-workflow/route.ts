import { NextRequest, NextResponse } from 'next/server';
import {
  fetchTranscription,
  startTranscription,
  startTranscriptionForFile,
  TEST_FILE_URL,
} from '@/lib/assemblyai/transcription';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'No transcript-analysis id' });
  }

  const session = await fetchTranscription(id);

  return NextResponse.json(session);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  let expectedSpeakers = Number(formData.get('expectedSpeakers'));

  if (!expectedSpeakers) {
    expectedSpeakers = 2
  }

  // Form data is stringified
  const response = formData.get('file') !== undefined && formData.get('file') !== 'undefined'
    ? await startTranscriptionForFile(file.name, file, expectedSpeakers)
    : await startTranscription('TestFile.mp3', TEST_FILE_URL, expectedSpeakers);

  return NextResponse.json(response);
}
