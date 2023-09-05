import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { PipelineOutputFormat, PipelineRunnableOutput } from '@/lib/pipelines/types';

export type RunningStatus = 'inactive' | 'running' | 'error' | 'success';

type PipelineRunnerProps = {
  status: RunningStatus;
  result: string;
  outputs: PipelineRunnableOutput[];
  onClickRun: () => void;
}

export function PipelineRunner({
  status,
  result,
  outputs,
  onClickRun,
}: PipelineRunnerProps) {
  return (
    <div className="flex h-full w-[420px] flex-col">
      <Button
        className="w-full"
        disabled={status === 'running'}
        onClick={onClickRun}
      >
        {status === 'running' ? 'Running' : 'Start'}
      </Button>
      {outputs.length > 0 ? (
        <div className="no-scrollbar  mt-2 overflow-y-scroll">
          {outputs.map(output => (
            <PipelineRunnerOutput output={output} />
          ))}
        </div>
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

type PipelineRunnerOutputProps = {
  output: PipelineRunnableOutput;
}

function PipelineRunnerOutput({
  output,
}: PipelineRunnerOutputProps) {
  return (
    <div className="mb-4">
      <h3 className="text-md font-bold">{output.name}</h3>
      <PipelineRunnerValue format={output.name === 'Analysis' ? 'json' : output.format} value={output.value} />
    </div>
  )
}

type PipelineRunnerValueProps = {
  format: PipelineOutputFormat;
  value: string;
}

function PipelineRunnerValue({
  format,
  value,
}: PipelineRunnerValueProps) {
  switch (format) {
    case 'text':
      return (
        <p>
          {value}
        </p>
      )
    case 'markdown':
      return (
        <ReactMarkdown>
          {value}
        </ReactMarkdown>
      )
    case 'json':
      return (
        <ReactMarkdown className="w-full rounded-md bg-gray-100 p-2">
          {'```\n' + value + '\n```'}
        </ReactMarkdown>
      )
  }
}
