import { NextResponse } from 'next/server';
import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { NewPipeline } from '@/lib/new-pipelines/types';

export async function POST(req: Request) {
  const {
    pipeline,
    input,
  }: {
    pipeline: NewPipeline,
    input: { [key: string]: any },
  } = await req.json();

  const execution = await new PipelineExecutor(pipeline).execute(input)

  return NextResponse.json({ execution });
}
