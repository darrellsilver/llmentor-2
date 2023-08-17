import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { OpenAiNode } from '@/lib/pipelines/types';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { usePipelineNodesStore } from '@/components/pipelines/stores';

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
    <FlowNode title="OpenAi" data={data} {...props}>
      <Label>
        Temperature: {node.temperature}
        <Slider
          className="my-2 w-48"
          value={[node.temperature]}
          onValueChange={(values: number[]) => setTemperature(values[0])}
          min={0}
          max={1}
          step={0.01}
        />
      </Label>

      <Handle type="source" position={Position.Left} id="context" style={{ top: 40 }} />
      <Handle type="source" position={Position.Left} id="prompt" style={{ top: 55 }} />
      <Handle type="target" position={Position.Right} id="output" />
    </FlowNode>
  )
}
