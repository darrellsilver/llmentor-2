import { PipelineEditor } from '@/components/pipelines/editor';
import { getClientPipeline, getPipeline } from '@/lib/pipelines/storage';
import { PipelineClientRunner } from '@/components/pipelines/client';

export default async function PipelineRunnerPage(
  { params }: { params: { pipelineId: string } }
) {
  const clientPipeline = await getClientPipeline(params.pipelineId);

  return (
    <div style={{ width: '100%', height: `calc(100vh - 65px)` }}>
      {clientPipeline && <PipelineClientRunner clientPipeline={clientPipeline} />}
    </div>
  )
}
