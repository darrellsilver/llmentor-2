import { NewPipeline, NewPipelineExecution, NewPipelineNode } from '@/lib/new-pipelines/core/types';
import { Panel } from 'reactflow';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { usePipelineExtensionStore } from '@/lib/new-pipelines/ui/stores/usePipelineExtensionStore';
import { PipelineExtension } from '@/lib/new-pipelines/core/extensions';
import { getExtensions } from '@/lib/new-pipelines/extensions';

type PipelineDesignerFlowExecutorProps = {
  pipeline: NewPipeline;
  onClickExecute: (input: { [key: string]: any }) => void
  isExecuting: boolean;
  execution: NewPipelineExecution | null;
  isOpen: boolean;
};

export function PipelineDesignerFlowExecutor({
  isOpen,
  onClickExecute,
  isExecuting,
  execution,
  pipeline,
}: PipelineDesignerFlowExecutorProps) {
  if (!isOpen) return null;

  function onClick() {
    onClickExecute({ });
  }

  return (
    <Panel
      className="h-[600px] w-[750px] max-w-[750px] p-4"
      style={{ margin: 0, marginTop: 85 }}
      position={'top-right'}
    >
      <Card
        className="flex h-full w-full"
      >
        <div className="w-[280px] min-w-[280px]  bg-accent p-4">
          <h3 className="text-lg font-bold">
            Inputs
          </h3>
        </div>
        <div className="flex w-[480px] max-w-[480px] flex-col p-4">
          <Button
            className="w-full"
            onClick={onClick}
            disabled={isExecuting}
          >
            Run Pipeline
          </Button>
          <div className="no-scrollbar mt-2 flex-1 overflow-scroll">
            {execution
              ? (
                <pre className="bg-gray-200 text-xs">
                  { JSON.stringify(execution, null, 2) }
                </pre>
              )
              : 'not run yet'
            }
            {/*{Array.from(Array(1000).keys()).map(_ => 'Testing').join('\n')}*/}
          </div>
        </div>
      </Card>
    </Panel>
  );
}
