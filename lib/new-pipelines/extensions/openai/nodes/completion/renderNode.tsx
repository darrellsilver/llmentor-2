import { getRenderIcon } from '@/lib/new-pipelines/utils/getRenderIcon';
import { Cloud } from 'lucide-react';
import { OpenAICompletionNode } from '@/lib/new-pipelines/extensions/openai/nodes/completion/types';
import { NewPipelineNode } from '@/lib/new-pipelines/types';
import { PipelineFlowNode, PipelineFlowNodeProps } from '@/lib/new-pipelines/ui/nodes';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export const renderIcon = getRenderIcon(Cloud, 'purple');

export function renderNode(node: OpenAICompletionNode, onNodeChange: (node: NewPipelineNode) => void) {
  return (
    <OpenAICompletionFlowNode
      node={node}
      onNodeChange={onNodeChange}
    />
  )
}

type OpenAICompletionNodeProps = PipelineFlowNodeProps<OpenAICompletionNode>;

function OpenAICompletionFlowNode({
 node,
 onNodeChange,
}: OpenAICompletionNodeProps) {
  function onTemperatureChange(temperature: number) {
    onNodeChange && onNodeChange({
      ...node,
      data: { ...node.data, temperature },
    })
  }

  return (
    <PipelineFlowNode
      className="w-72"
      node={node}
      name="OpenAI Completion"
      Icon={renderIcon()}
    >
      <Label>
        <div className="mb-3 text-xs font-bold">Temperature: {node.data.temperature}</div>
        <Slider
          className="mb-2"
          min={0}
          max={1}
          step={0.01}
          value={[node.data.temperature]}
          onValueChange={(values) => onTemperatureChange(values[0])}
        />
      </Label>
    </PipelineFlowNode>
  )
}
