import { Edge, Node } from 'reactflow';
import { NewPipelineNode, PipelineNodeRef, PipelineOutputNodeRef } from '@/lib/new-pipelines/types';
import { usePipelineNodeStore } from '@/lib/new-pipelines/ui/stores/usePipelineNodeStore';
import { getNodeRef, getOutputNodeRef } from '@/lib/new-pipelines/utils';

export function getPipelineNodes(
  flowNodes: Node<NewPipelineNode>[],
  flowEdges: Edge[],
) {
  // Prevent any null values from being added to the array
  return flowNodes
    // Sort the flow nodes by x position (left to right)
    // so that inputs are likely updated before outputs they connect to.
    // If this remains an issue, update all nodes in the store with new
    // positions before running the reduce
    .sort((a, b) => a.position.x - b.position.x)
    .reduce(
      (acc, curr) => {
        // Pre-filter the edges to avoid additional iteration
        const pipelineNode = getPipelineNode(
          curr,
          flowEdges.filter(edge => edge.source === curr.id)
        );
        return pipelineNode ? [ ...acc, pipelineNode ] : acc;
      },
      [] as NewPipelineNode[]
    )
    // Sort the pipeline nodes by y position (top to bottom)
    // so that views display them correctly
    .sort((a, b) => a.position.y - b.position.y);
}

function getPipelineNode(
  flowNode: Node<NewPipelineNode>,
  nodeEdges: Edge[]
): NewPipelineNode | null {
  const { getNode, setNode } = usePipelineNodeStore.getState();

  const node = getNode(flowNode.data);
  if (node === null) return null;

  const updatedNode = {
    ...node,
    position: flowNode.position,
    inputs: getNodeInputs(node, nodeEdges),
  };

  // Update the node in the store, so other nodes can react to a position change
  setNode(updatedNode)

  return updatedNode;
}

function getNodeInputs(node: NewPipelineNode, nodeEdges: Edge[]) {
  return node.inputs.map(input => ({
    ...input,
    outputNodeRefs: getOutputNodeRefs(node, input.name, nodeEdges),
  }))
}

function getOutputNodeRefs(node: NewPipelineNode, inputName: string, nodeEdges: Edge[]) {
  const getNode = usePipelineNodeStore.getState().getNode;

  return nodeEdges
    .filter(edge => edge.sourceHandle == inputName)
    .map(edge => getOutputNodeRefFromFlowId(edge.target, edge.targetHandle!))
    // Sort the node refs by their node's y position
    .sort((a, b) => {
      const nodeA = getNode(a);
      const nodeB = getNode(b);
      if (!nodeA || !nodeB) return 0;
      return nodeA.position.y - nodeB.position.y;
    });
}

function getOutputNodeRefFromFlowId(flowId: string, output: string): PipelineOutputNodeRef {
  return {
    ...parseFlowId(flowId),
    output,
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
