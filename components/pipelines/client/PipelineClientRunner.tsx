'use client';

import { ClientPipeline, PipelineNode, PipelineProperty, PipelineRunnable } from '@/lib/pipelines/types';
import { Card } from '@/components/ui/card';
import { PropertiesPanel } from '@/components/pipelines/runner/PropertiesPanel';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { runClientPipeline } from '@/components/pipelines/api/runClientPipeline';
import { IconPulseLoader } from '@/views/analysis-session';
import { GlassesIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type PipelineClientRunnerProps = {
  clientPipeline: ClientPipeline;
}

export function PipelineClientRunner({
  clientPipeline
}: PipelineClientRunnerProps) {
  const [ pipeline, setPipeline ] = useState(clientPipeline);
  const [ isRunning, setIsRunning ] = useState(false);
  const [ result, setResult ] = useState<PipelineRunnable | null>(null);

  function onPropertyChange(property: PipelineProperty | PipelineNode) {
    setPipeline({
      ...pipeline,
      properties: pipeline.properties.map(p => p.type === property.type && p.id === property.id ? property : p),
    })
  }

  async function onClickRun() {
    setIsRunning(true)
    const result = await runClientPipeline(pipeline);

    setResult(result);
    setIsRunning(false);

    console.log(result);
  }

  return (
    <div className="container flex h-full flex-col pt-4">
      <h1
        className="text-2xl font-bold"
      >
        {clientPipeline.title}
      </h1>
      <p className="text-accent-foreground">
        {clientPipeline.description}
      </p>
      <Card
        className="my-4 flex flex-1 overflow-hidden"
      >
        <PropertiesPanel
          properties={clientPipeline.properties}
          onRefreshProperties={() => {}}
          onPropertyChange={onPropertyChange}
          canRefresh={false}
        />
        <div className="flex flex-1 flex-col p-4">
          <Button
            className="mb-4 w-full"
            onClick={onClickRun}
          >
            Run Pipeline
          </Button>
          {isRunning && <IconPulseLoader Icon={GlassesIcon} text="Running" />}
          {result && result.status === 'error' && <ReactMarkdown>{result.message}</ReactMarkdown>}
          {result && result.status === 'success' && <ReactMarkdown className="overflow-y-scroll">{result.result}</ReactMarkdown>}
        </div>
      </Card>
    </div>
  )
}
