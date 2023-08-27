import { NextResponse } from 'next/server';
import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { NewPipeline } from '@/lib/new-pipelines/core/types';

export async function POST(req: Request) {
  const {
    pipeline,
    input,
  }: {
    pipeline: NewPipeline,
    input: { [key: string]: any },
  } = await req.json();

  const execution = await new PipelineExecutor()
    .registerExtensionIds(pipeline.extensionIds)
    .execute(pipeline, input)

  return NextResponse.json({ execution });
}
