import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { TextNode } from '@/lib/pipelines/types';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { Textarea } from '@/components/ui/textarea';

export function TextFlowNode({
  data,
  ...props
}: NodeProps<TextNode>) {
  const {
    node,
    setNode,
  } = usePipelineNodesStore(state => ({
    node: state.getTextNode(data.id),
    setNode: state.setNode,
  }));

  function setContent(content: string) {
    if (!node) return;
    setNode({ ...node, content });
  }

  return (
    <FlowNode title="Text" data={data} {...props}>
      <Textarea
        className="h-32 w-72"
        value={node?.content}
        onChange={e => setContent(e.target.value)}
      />
      <Handle type="target" position={Position.Right} id="output" />
    </FlowNode>
  )
}
