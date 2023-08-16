import { getTranscriptIds } from '@/lib/assemblyai/transcription';
import { NextResponse } from 'next/server';

export async function POST() {
  const transcriptIds = await getTranscriptIds()
  const transcripts = transcriptIds.map(id => ({ id }));
  return NextResponse.json({ transcripts });
}
