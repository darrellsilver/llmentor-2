import { NextRequest, NextResponse } from 'next/server';
import { NewPipelineExecution } from '@/lib/new-pipelines/types';
import { saveExecution } from '@/lib/new-pipelines/storage';

export async function POST(req: NextRequest) {
  const { execution }: { execution: NewPipelineExecution } = await req.json();
  const clientExecution = await saveExecution(execution);
  return NextResponse.json({ clientExecution })
}
