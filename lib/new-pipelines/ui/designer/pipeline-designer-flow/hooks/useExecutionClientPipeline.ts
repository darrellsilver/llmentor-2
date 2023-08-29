import { NewClientPipeline, NewPipeline, NewPipelineInputNode } from '@/lib/new-pipelines/types';
import { useEffect, useState } from 'react';
import { buildClientPipeline } from '@/lib/new-pipelines/clients';

export function useExecutionClientPipeline(pipeline: NewPipeline) {
  const [ clientPipeline, setClientPipeline ] = useState<NewClientPipeline | null>(null)
  const [ input, setInput ] = useState<{ [key: string]: any }>({ })

  useEffect(() => {
    const clientPipeline = buildClientPipeline(pipeline);
    setClientPipeline(clientPipeline);
    setInput(clientPipeline.inputNodes.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: input[curr.id] || undefined }),
      { }
    ));
  }, [pipeline.nodes]);

  function getInputValue(node: NewPipelineInputNode) {
    return input[node.id];
  }

  function setInputValue(node: NewPipelineInputNode, value: any) {
    setInput({ ...input, [node.id]: value });
  }

  function buildInput(): { [key: string]: any } {
    return input;
  }

  return {
    clientPipeline,
    getInputValue,
    setInputValue,
    buildInput,
  }
}
