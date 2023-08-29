'use client';

import { CenteredMessage } from '@/views/analysis-session/centered-message';

import { CorePipelineOutputNode } from './types';
import { Button } from '@/components/ui/button';
import { PipelineExecutor } from '@/lib/new-pipelines';
import { NewClientPipeline, NewPipelineExecution } from '@/lib/new-pipelines/types';
import { useEffect, useState } from 'react';
import { executePipelineId } from '@/lib/new-pipelines/ui/api';
import { usePipelineStore } from '@/lib/new-pipelines/ui/stores/usePipelineStore';
import { OutputNode } from '@/lib/new-pipelines/ui/client/OutputNode';
import { buildClientPipeline } from '@/lib/new-pipelines/clients';
import { IconPulseLoader } from '@/views/analysis-session';
import { CloudIcon } from 'lucide-react';

export function renderOutput(
  node: CorePipelineOutputNode,
  value: any,
) {
  return (
    <div key={node.id}>
      <h4 className="mb-1 text-sm font-bold">{node.data.name}</h4>
      {value
        ? (
          <RenderOutput
            value={value}
          />
        ) : (
          <div className="mb-2 h-10 overflow-hidden rounded-md bg-accent">
            <CenteredMessage>
              No output
            </CenteredMessage>
          </div>
        )}
    </div>
  )
}

type RenderOutputProps = {
  value: {
    pipelineId: string;
    input: { [key: string]: any };
  },
}

function RenderOutput({
  value,
}: RenderOutputProps) {
  const [ clientPipeline, setClientPipeline ] = useState<NewClientPipeline | null>(null);
  const [ result, setResult ] = useState<NewPipelineExecution | null>(null);
  const [ isRunning, setIsRunning ] = useState(false);
  const getPipeline = usePipelineStore(state => state.getPipeline);

  useEffect(() => {
    const pipeline = getPipeline(value.pipelineId);
    if (pipeline === null) {
      console.warn(`No pipeline found with id "${value.pipelineId}"`);
      return;
    }

    setClientPipeline(buildClientPipeline(pipeline));
  }, [getPipeline, setClientPipeline, value.pipelineId]);

  async function onClickRun() {
    setIsRunning(true);
    setResult(null);
    const execution = await executePipelineId(value.pipelineId, value.input);
    setResult(execution);
    setIsRunning(false);
  }

  return (
    <div className="my-2 border-b-2 pb-2">
      <Button
        className="mb-2 w-full"
        onClick={onClickRun}
        disabled={isRunning}
      >
        Run
      </Button>
      {isRunning && (
        <div className="h-72 w-full">
          <IconPulseLoader Icon={<CloudIcon />} text="Running" />
        </div>
      )}
      {result && result.status === 'error' && (
        <CenteredMessage>
          {result.message}
        </CenteredMessage>
      )}
      {clientPipeline && result && result.status === 'success' && (
        <>
          {clientPipeline.outputNodes.map(node => (
            <OutputNode
              key={node.id}
              node={node}
              value={result.output[node.id]}
            />
          ))}
        </>
      )}
    </div>
  )
}
