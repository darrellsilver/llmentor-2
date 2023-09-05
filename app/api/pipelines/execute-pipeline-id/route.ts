import { NextResponse } from 'next/server';
import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { NewPipeline } from '@/lib/new-pipelines/types';
import { getPipeline } from '@/lib/pipelines/storage';

export async function POST(req: Request) {
  const {
    pipelineId,
    input,
  }: {
    pipelineId: string,
    input: { [key: string]: any },
  } = await req.json();

  const pipeline = await getPipeline(pipelineId, 'new-pipelines') as NewPipeline | null;
  if (pipeline === null) {
    return NextResponse.json({ error: `No pipeline with id "${pipelineId}"` }, { status: 400 });
  }

  const execution = await new PipelineExecutor(pipeline).execute(input)

  return NextResponse.json({ execution });
}
