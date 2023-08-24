import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

export type RunningStatus = 'inactive' | 'running' | 'error' | 'success';

type PipelineRunnerProps = {
  status: RunningStatus;
  result: string;
  onClickRun: () => void;
}

export function PipelineRunner({
  status,
  result,
  onClickRun,
}: PipelineRunnerProps) {
  return (
    <div className="flex h-full flex-col">
      <Button
        className="w-full"
        disabled={status === 'running'}
        onClick={onClickRun}
      >
        {status === 'running' ? 'Running' : 'Start'}
      </Button>
      {result ? (
        <ReactMarkdown
          className="no-scrollbar mt-4 overflow-y-scroll"
        >
          {result}
        </ReactMarkdown>
      ) : (
        <div
          className="flex w-full flex-1 items-center justify-center"
        >
          {status === 'inactive' && 'Run for result'}
          {status === 'running' && 'Running...'}
          {status === 'error' && `An error occurred: ${result}`}
        </div>
      )}
    </div>
  )
}
