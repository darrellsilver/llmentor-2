import { PipelineEditor } from '@/components/pipelines/editor';
import { getPipeline } from '@/lib/pipelines/storage';

export const dynamic = 'force-dynamic';

export default async function PipelineDesignerEditorPage(
  { params }: { params: { pipelineId: string } }
) {
  const pipeline = await getPipeline(params.pipelineId);

  return (
    <div style={{ width: '100%', height: `calc(100vh - 65px)` }}>
      <PipelineEditor pipeline={pipeline} />
    </div>
  )
}
