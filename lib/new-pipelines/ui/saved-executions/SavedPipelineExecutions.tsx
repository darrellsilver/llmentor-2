'use client';

import { NewPipeline, NewPipelineClientExecution } from '@/lib/new-pipelines/types';
import { useEffect, useState } from 'react';
import { fetchPipelineExecutions } from '@/lib/new-pipelines/ui/api';
import { Card } from '@/components/ui/card';
import { usePipeline } from '@/lib/new-pipelines/ui/hooks';
import { IconPulseLoader } from '@/views/analysis-session';
import { Loader } from 'lucide-react';

type SavedPipelineExecutionsProps = {
  pipelineId: string;
}

export function SavedPipelineExecutions({
  pipelineId,
}: SavedPipelineExecutionsProps ) {
  const [ executions, setExecutions ] = useState<NewPipelineClientExecution[]>([]);

  const { pipeline } = usePipeline(pipelineId);

  useEffect(() => {
    fetchPipelineExecutions(pipelineId).then(setExecutions);
  }, [pipelineId]);

  return (
    <div className="container h-full py-4">
      <h1 className="mb-2 text-xl font-semibold">
        Executions
      </h1>
      {!pipeline && (
        <IconPulseLoader
          Icon={<Loader className="animate-spin" />}
          text="Loading"
        />
      )}
      {pipeline && executions.map(execution => (
        <PipelineExecution
          key={execution.id}
          pipeline={pipeline}
          execution={execution}
        />
      ))}
    </div>
  )
}

type PipelineExecutionProps = {
  pipeline: NewPipeline;
  execution: NewPipelineClientExecution;
}

function PipelineExecution({
  pipeline,
  execution,
}: PipelineExecutionProps) {
  return (
    <Card className="p-4">
      {execution.status === 'success' && Object.values(execution.output).map(outputValue => (
        <p className="mb-2">
          {JSON.stringify(outputValue)}
        </p>
      ))}
    </Card>
  )
}
