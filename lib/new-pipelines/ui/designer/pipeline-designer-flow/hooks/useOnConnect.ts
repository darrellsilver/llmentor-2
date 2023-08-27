import { addEdge, Connection, Edge } from 'reactflow';
import { useCallback } from 'react';
import { usePipelineNodeStore } from '@/lib/new-pipelines/ui/stores/usePipelineNodeStore';

export function useOnConnect(
  edges: Edge[],
  setEdges: (edges: Edge[]) => void,
) {
  return useCallback(
    (edge: Edge | Connection) => {
      if (!(edge.source && edge.sourceHandle && edge.target && edge.targetHandle)) {
        console.warn(`onConnect received unrecognized value: ${edge}`);
        return;
      }

      // Prevent connections to self
      if (edge.source === edge.target) return;

      const { getNodeByFlowId } = usePipelineNodeStore.getState();

      const sourceNode = getNodeByFlowId(edge.source);
      if (sourceNode == null) return;

      const sourceInput = sourceNode.inputs.find(input => input.name === edge.sourceHandle) || null;
      if (sourceInput == null) return;

      // Remove existing edges if multiple refs aren't allowed
      const newEdges = sourceInput.allowMultiple
        ? edges
        : edges.filter(e => e.source !== edge.source && e.sourceHandle !== edge.sourceHandle);

      setEdges(addEdge(edge, newEdges));
    },
    [edges, setEdges]
  );
}
