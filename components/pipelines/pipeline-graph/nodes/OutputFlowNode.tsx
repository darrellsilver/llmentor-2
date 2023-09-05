import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { OutputNode } from '@/lib/pipelines/types';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { FlowInputHandle } from '@/components/pipelines/pipeline-graph/handles';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { Input } from '@/components/ui/input';

export function OutputFlowNode({
  data,
  ...props
}: NodeProps<OutputNode>) {
  const {
    node,
    setNode,
  } = usePipelineNodesStore(state => ({
    node: state.getOutputNode(data.id),
    setNode: state.setNode,
  }));

  function setName(name: string) {
    if (!node) return;
    setNode({
      ...node,
      name,
    })
  }

  return (
    <FlowNode
      pipelineNode={node}
      title={node?.name || 'Output'}
      data={data}
      iconColor="red"
      Icon={ArrowRightIcon}
      {...props}
    >
      <Input
        className="mb-2"
        placeholder="Name"
        value={node?.name}
        onChange={e => setName(e.target.value)}
      />
      <FlowInputHandle name="Inputs" id="input" allowMultiple />
    </FlowNode>
  )
}
