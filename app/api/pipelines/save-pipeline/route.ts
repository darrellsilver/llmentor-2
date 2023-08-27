import { NextRequest, NextResponse } from 'next/server';
import { savePipeline } from '@/lib/pipelines/storage';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const pipeline = await savePipeline(data.pipeline, data.directory || 'pipelines');
  return NextResponse.json({ pipeline })
}
