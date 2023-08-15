import { ReactNode } from 'react';
import { PipelineSidebar } from '@/components/pipelines';
import { getPipelines } from '@/lib/pipelines/storage';

type PipelineDesignerLayoutProps = {
  params: { pipelineId: string };
  children: ReactNode;
}

export const dynamic = 'force-dynamic';

export default async function PipelineDesignerLayout({
  children,
}: PipelineDesignerLayoutProps) {
  const pipelineData = await getPipelines();

  return (
    <div className="flex h-full w-full">
      <PipelineSidebar pipelines={Object.values(pipelineData)} />
      {children}
    </div>
  );
}
