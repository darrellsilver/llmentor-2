import { PipelineDesigner } from '@/lib/new-pipelines/ui/designer/PipelineDesigner';

export default function NewPipelineDesignerPage({ params }: { params: { pipelineId: string } }) {
  return (
    <PipelineDesigner pipelineId={params.pipelineId} />
  )
}
