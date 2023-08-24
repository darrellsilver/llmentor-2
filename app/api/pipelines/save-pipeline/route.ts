import { NextRequest, NextResponse } from 'next/server';
import { savePipeline } from '@/lib/pipelines/storage';

export async function POST(req: NextRequest) {
  const json = await req.json();
  const pipeline = await savePipeline(json.pipeline);
  return NextResponse.json({ pipeline })
}
