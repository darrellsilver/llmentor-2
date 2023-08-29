import { NextRequest, NextResponse } from 'next/server';
import { getPipelines } from '@/lib/pipelines/storage';

export async function POST(req: NextRequest) {
  const { directory } = await req.json();
  const pipelines = await getPipelines(directory);
  return NextResponse.json({ pipelines })
}
