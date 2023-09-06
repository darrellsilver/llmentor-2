import { NextRequest, NextResponse } from 'next/server';
import { getSavedExecutions } from '@/lib/new-pipelines/storage';

export async function POST(req: NextRequest) {
  const { pipelineId }: { pipelineId: string } = await req.json();
  const clientExecutions = await getSavedExecutions(pipelineId);
  return NextResponse.json({ clientExecutions })
}

export async function GET(req: NextRequest) {
  const pipelineId = '4faf843e-e604-401b-a8d8-3e7c19c5572b';
  const clientExecutions = await getSavedExecutions(pipelineId);
  return NextResponse.json({ clientExecutions })
}
