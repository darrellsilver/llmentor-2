import { NewPipeline, NewPipelineNode } from '@/lib/new-pipelines/core/types';
import { Edge, Node } from 'reactflow';
import { usePipelineNodeStore } from '@/lib/new-pipelines/ui/stores/usePipelineNodeStore';
import { useEffect } from 'react';
import { getFlowEdges, getFlowNodes } from '@/lib/new-pipelines/ui/utils';
import { usePipelineExtensionStore } from '@/lib/new-pipelines/ui/stores/usePipelineExtensionStore';
import { getExtensions } from '@/lib/new-pipelines/extensions';

export function useSetPipelineEffect(
  pipeline: NewPipeline,
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
) {
  const setPipelineNodes = usePipelineNodeStore(state => state.setNodes);
  const setExtensions = usePipelineExtensionStore(state => state.setExtensions);

  useEffect(() => {
    setPipelineNodes(pipeline.nodes, true);
    setExtensions(getExtensions(pipeline.extensionIds), true)

    const flowNodes = getFlowNodes(pipeline.nodes)
    const flowEdges = getFlowEdges(pipeline.nodes);

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [
    pipeline.nodes,
    pipeline.extensionIds,
    setPipelineNodes,
    setExtensions,
    setNodes,
    setEdges,
  ])

}
