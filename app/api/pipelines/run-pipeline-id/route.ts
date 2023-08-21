import { NextResponse } from 'next/server';
import { runPipeline } from '@/lib/pipelines/runners';
import { getPipeline } from '@/lib/pipelines/storage';

export async function POST(req: Request) {
  const { pipelineId, properties } = await req.json();

  const pipeline = await getPipeline(pipelineId);

  if (!pipeline) {
    return NextResponse.json({
      error: `No pipeline with id "${pipelineId}"`,
    });
  }

  const response = await runPipeline(pipeline, properties || []);

  return NextResponse.json(response);
}
