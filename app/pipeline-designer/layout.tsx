import { ReactNode } from 'react';
import { PipelineSidebar } from '@/components/pipelines';
import { getPipeline, getPipelineData, getPipelines, upgradeFromDataJson } from '@/lib/pipelines/storage';

type PipelineDesignerLayoutProps = {
  params: { pipelineId: string };
  children: ReactNode;
}

export const dynamic = 'force-dynamic';

export default async function PipelineDesignerLayout({
  children,
}: PipelineDesignerLayoutProps) {
  let pipelines = await getPipelines();

  // Upgrade from data.json if needed
  if (pipelines.length === 0) {
    await upgradeFromDataJson();
    pipelines = await getPipelines();
  }

  return (
    <div className="flex h-full w-full">
      <PipelineSidebar pipelines={pipelines} />
      {children}
    </div>
  );
}
