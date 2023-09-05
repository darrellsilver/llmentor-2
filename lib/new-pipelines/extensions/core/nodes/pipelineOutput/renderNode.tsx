'use client';

import { NewPipelineNode, NewPipelineNodeInputs } from '@/lib/new-pipelines/types';
import { PipelineFlowNode, PipelineFlowNodeProps } from '@/lib/new-pipelines/ui/nodes/PipelineFlowNode';

import { CorePipelineOutputNode } from './types'
import { getRenderIcon } from '@/lib/new-pipelines/utils';
import { Play } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePipelineStore } from '@/lib/new-pipelines/ui/stores/usePipelineStore';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { buildClientPipeline } from '@/lib/new-pipelines/clients';

export const renderIcon = getRenderIcon(Play, 'red');

export function renderNode(
  node: CorePipelineOutputNode,
  onNodeChange: (node: NewPipelineNode) => void
) {
  return (
    <PipelineOutputNode node={node} onNodeChange={onNodeChange} />
  )
}

type PipelineOutputNodeProps = PipelineFlowNodeProps<CorePipelineOutputNode>

function PipelineOutputNode({
  node,
  onNodeChange,
}: PipelineOutputNodeProps) {
  const getPipeline = usePipelineStore(state => state.getPipeline);

  useEffect(() => {
    const pipeline = getPipeline(node.data.pipelineId);
    if (pipeline === null) return;

    // Build the inputs
    const inputs: NewPipelineNodeInputs = buildClientPipeline(pipeline).inputNodes.map(inputNode => ({
      name: inputNode.data.name,
      type: 'text',
      allowMultiple: false,
      outputNodeRefs: []
    }))

    // Set the new inputs on the node
    onNodeChange && onNodeChange({ ...node, inputs });
  }, [getPipeline, node.data.pipelineId]);

  function onNameChange(name: string) {
    const newNode: CorePipelineOutputNode = {
      ...node,
      data: { ...node.data, name },
    };
    onNodeChange && onNodeChange(newNode)
  }

  function onPipelineIdChange(pipelineId: string) {
    const inputsWithRefs = node.inputs.filter(input => input.outputNodeRefs.length > 0);
    if (inputsWithRefs.length) return;

    const newNode: CorePipelineOutputNode = {
      ...node,
      data: { ...node.data, pipelineId },
    };
    onNodeChange && onNodeChange(newNode)
  }

  const inputsWithRefs = node.inputs.filter(input => input.outputNodeRefs.length > 0);

  return (
    <PipelineFlowNode
      className="min-w-72"
      node={node}
      name={`Pipeline Output: ${node.data.name || '[No Name]'}`}
      Icon={renderIcon()}
    >
      <NameInput
        value={node.data.name}
        onValueChange={onNameChange}
      />
      <PipelineSelect
        value={node.data.pipelineId}
        onChange={onPipelineIdChange}
        disabled={inputsWithRefs.length > 0}
      />
    </PipelineFlowNode>
  )
}

type PipelineSelectProps = {
  value: string,
  onChange: (value: string) => void;
  disabled: boolean;
}

type NameInputProps = {
  value: string;
  onValueChange: (value: string) => void;
}

function NameInput({
  value,
  onValueChange,
}: NameInputProps) {
  return (
    <Input
      className="mb-2 w-full"
      type="text"
      placeholder="Name"
      value={value}
      onChange={e => onValueChange(e.target.value)}
    />
  )
}

function PipelineSelect({
  value,
  onChange,
  disabled,
}: PipelineSelectProps) {
  const pipelines = usePipelineStore(state => state.getPipelines());

  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="mb-2">
        <SelectValue placeholder="Pipeline" />
      </SelectTrigger>
      <SelectContent>
        {pipelines.map(pipeline => (
          <SelectItem
            key={pipeline.id}
            value={pipeline.id}
          >
            {pipeline.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
