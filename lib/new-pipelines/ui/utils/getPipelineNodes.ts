import { Edge, Node } from 'reactflow';
import { NewPipelineNode, PipelineNodeRef, PipelineOutputNodeRef } from '@/lib/new-pipelines/core/types';
import { usePipelineNodeStore } from '@/lib/new-pipelines/ui/stores/usePipelineNodeStore';

export function getPipelineNodes(
  flowNodes: Node<NewPipelineNode>[],
  flowEdges: Edge[],
) {
  // Prevent any null values from being added to the array
  return flowNodes.reduce(
    (acc, curr) => {
      // Pre-filter the edges to avoid additional iteration
      const pipelineNode = getPipelineNode(
        curr,
        flowEdges.filter(edge => edge.source === curr.id)
      );
      return pipelineNode ? [ ...acc, pipelineNode ] : acc;
    },
    [] as NewPipelineNode[]
  );
}

function getPipelineNode(
  flowNode: Node<NewPipelineNode>,
  nodeEdges: Edge[]
): NewPipelineNode | null {
  const storedPipelineNode = usePipelineNodeStore.getState().getNode(flowNode.data);
  if (storedPipelineNode === null) return null;

  return {
    ...storedPipelineNode,
    position: flowNode.position,
    inputs: storedPipelineNode.inputs.map(input => ({
      ...input,
      outputNodeRefs: nodeEdges
        .filter(edge => edge.sourceHandle == input.name)
        .map(edge => getOutputNodeRef(edge.target, edge.targetHandle!)),
    }))
  };
}

function getOutputNodeRef(target: string, targetHandle: string): PipelineOutputNodeRef {
  return {
    ...parseFlowId(target),
    output: targetHandle,
  }
}

function parseFlowId(flowId: string): PipelineNodeRef {
   const [ extension, type, id ] = flowId.split('::');
   return {
     extension,
     type,
     id,
   }
}
