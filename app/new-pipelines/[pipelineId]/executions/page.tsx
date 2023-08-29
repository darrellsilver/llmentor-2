import { SavedPipelineExecutions } from '@/lib/new-pipelines/ui/saved-executions/SavedPipelineExecutions';

export default function PipelineExecutionsPage({ params }: { params: { pipelineId: string } }) {
  return (
    <SavedPipelineExecutions pipelineId={params.pipelineId} />
  )
}
