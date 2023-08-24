import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { OpenAiNode } from '@/lib/pipelines/types';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { ArrowRightIcon, CloudIcon } from 'lucide-react';
import { IconKeys } from 'next/dist/lib/metadata/constants';
import { FlowInputHandle, FlowOutputHandle } from '@/components/pipelines/pipeline-graph/handles';

export function OpenAiFlowNode({
 data,
 ...props
}: NodeProps<OpenAiNode>) {
  const {
    node,
    setOpenAiNode,
  } = usePipelineNodesStore(state => ({
    node: state.getOpenAiNode(data.id),
    setOpenAiNode: state.setOpenAiNode,
  }));

  if (!node) return (
    <FlowNode title="OpenAi" data={data} {...props}>
      Error: No node found
    </FlowNode>
  )

  function setTemperature(temperature: number) {
    if (!node) return;
    setOpenAiNode({
      ...node,
      temperature,
    })
  }

  return (
    <FlowNode
      title="OpenAi"
      data={data}
      iconColor="purple"
      Icon={CloudIcon}
      {...props}
    >
      <Label>
        Temperature: {node.temperature}
        <Slider
          className="mb-4 mt-2 w-48"
          value={[node.temperature]}
          onValueChange={(values: number[]) => setTemperature(values[0])}
          min={0}
          max={1}
          step={0.01}
        />
      </Label>

      <FlowInputHandle name="Contexts" id="context" allowMultiple />
      <FlowInputHandle name="Prompt" id="prompt" />
      <FlowOutputHandle name="Output" id="output" />
    </FlowNode>
  )
}
