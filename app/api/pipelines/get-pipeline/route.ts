import { NextRequest, NextResponse } from 'next/server';
import { NewPipeline, NewPipelineNode } from '@/lib/new-pipelines/core/types';
import { coreExtension } from '@/lib/new-pipelines/core/extensions';
import { CoreTextNode } from '@/lib/new-pipelines/core/nodes/text';
import { getNodeRef } from '@/lib/new-pipelines/core/utils';
import { getUuid } from '@/components/pipelines/common/getUuid';
import { getPipeline } from '@/lib/pipelines/storage';

export async function POST(req: NextRequest) {
  const { pipelineId, directory } = await req.json();
  const pipeline = await getPipeline(pipelineId, directory);
  return NextResponse.json({ pipeline })
}
