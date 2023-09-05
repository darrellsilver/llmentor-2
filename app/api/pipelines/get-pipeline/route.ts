import { NextRequest, NextResponse } from 'next/server';
import { getPipeline } from '@/lib/pipelines/storage';

export async function POST(req: NextRequest) {
  const { pipelineId, directory } = await req.json();
  const pipeline = await getPipeline(pipelineId, directory);
  return NextResponse.json({ pipeline })
}
