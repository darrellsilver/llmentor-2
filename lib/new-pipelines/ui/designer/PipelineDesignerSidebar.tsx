import { NewPipeline } from '@/lib/new-pipelines/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

type PipelineDesignerSidebarProps = {
  pipelines: NewPipeline[];
}

export function PipelineDesignerSidebar({
  pipelines,
}: PipelineDesignerSidebarProps) {
  return (
    <div className="h-full min-w-[300px] max-w-[300px] border-r px-2 pt-4">
      <div className="flex items-center justify-center" style={{ height: 66 }}>
        <Link className="w-full" href="/new-pipelines/new">
          <Button
            className="w-full"
            variant="secondary"
          >
            + New
          </Button>
        </Link>
      </div>

      <div className="flex flex-col">
        {pipelines.map(pipeline => (
          <PipelineLink key={pipeline.id} pipeline={pipeline} />
        ))}
      </div>
    </div>
  )
}

type PipelineLinkProps = {
  pipeline: NewPipeline;
}

export function PipelineLink({
  pipeline
}: PipelineLinkProps) {
  const { pipelineId } = useParams();
  const isActive = pipeline.id === pipelineId;
  return (
    <Link
      href={`/new-pipelines/${pipeline.id}`}
    >
      <Button
        className={`mt-2 w-full justify-start ${isActive ? 'border-none bg-purple-100 text-purple-950 dark:bg-purple-950 dark:text-purple-200' : 'text-gray-700'}`}
        variant={isActive ? 'outline' : 'ghost'}
      >
        {pipeline.name || '[No Title]'}
      </Button>
    </Link>
  )
}
