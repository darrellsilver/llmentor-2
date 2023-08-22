'use client'

import { Button } from '@/components/ui/button';
import { Pipeline } from '@/lib/pipelines/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type PipelineSidebarProps = {
  pipelines: Omit<Pipeline, 'nodes'>[];
}

export function PipelineSidebar({
  pipelines,
}: PipelineSidebarProps) {
  // TODO fix this so it's passed from the layout (layout props not working for some reason)
  const pathname = usePathname();
  const splitPath = pathname.split('/');
  const activePipelineId = splitPath[splitPath.length - pathname.indexOf('/run') === -1 ? 1 : 2];

  return (
    <div className="h-full min-w-[300px] max-w-[300px] border-r px-2 pt-4">
      <div className="flex items-center justify-center" style={{ height: 66 }}>
        <a className="w-full" href="/pipeline-designer">
          <Button
            className="w-full"
            variant="secondary"
          >
            + New
          </Button>
        </a>
      </div>

      {pipelines.map(pipeline => {
        const isActive = activePipelineId === pipeline.id;
        return (
          <a
            key={pipeline.id}
            href={`/pipeline-designer/${pipeline.id}`}
          >
            <Button
              className={`mt-2 w-full justify-start ${isActive ? 'border-none bg-purple-100 text-purple-950 dark:bg-purple-950 dark:text-purple-200' : 'text-gray-700'}`}
              variant={isActive ? 'outline' : 'ghost'}
            >
              {pipeline.title || '[No Title]'}
            </Button>
          </a>
        );
      })}
    </div>
  )
}
