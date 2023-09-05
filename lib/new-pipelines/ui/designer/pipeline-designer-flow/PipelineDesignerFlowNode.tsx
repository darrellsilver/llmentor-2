'use client';

import { Card } from '@/components/ui/card';
import { NodeProps } from 'reactflow';
import { NewPipelineNode, PipelineNodeRef } from '@/lib/new-pipelines/types';
import { usePipelineNodeStore } from '@/lib/new-pipelines/ui/stores/usePipelineNodeStore';
import { ErrorFlowNode } from '@/lib/new-pipelines/ui/nodes/ErrorFlowNode';
import { usePipelineExtensionStore } from '@/lib/new-pipelines/ui/stores/usePipelineExtensionStore';

type PipelineDesignerFlowNodeProps = NodeProps<PipelineNodeRef>;

export function PipelineDesignerFlowNode({
  selected,
  data
}: PipelineDesignerFlowNodeProps) {
  const { node, setNode } = usePipelineNodeStore(state => ({
    node: state.getNode(data),
    setNode: state.setNode,
  }));
  const getExtension = usePipelineExtensionStore(state => state.getExtension);

  function onNodeChange(newNode: NewPipelineNode) {
    setNode(newNode)
  }

  if (node === null) {
    return (
      <div className={`rounded-lg border-2  ${selected ? 'border-blue-500' : 'border-transparent'}` }>
        <Card className="p-2">
          <p>No node data found for node:</p>
          <p>Extension: {data.extension}</p>
          <p>Type: {data.type}</p>
          <p>Id: {data.id}</p>
          <p>Ensure node was added to store</p>
        </Card>
      </div>
    )
  }

  const extension = getExtension(node.extension);

  if (extension === null) {
    return (
      <div className={`rounded-lg border-2  ${selected ? 'border-blue-500' : 'border-transparent'}` }>
        <ErrorFlowNode
          node={node}
          message={`Extension "${node.extension}" not found`}
        />
      </div>
    );
  }

  return (
    <div className={`rounded-lg border-2  ${selected ? 'border-blue-500' : 'border-transparent'}` }>
      {extension.renderNode(node, onNodeChange)}
    </div>
  );
}
