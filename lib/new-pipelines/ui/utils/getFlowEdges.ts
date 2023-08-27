import { NewPipelineNode, PipelineOutputNodeRef } from '@/lib/new-pipelines/core/types';
import { Edge } from 'reactflow';
import { getFlowId } from '@/lib/new-pipelines/ui/utils/getFlowId';

export function getFlowEdges(nodes: NewPipelineNode[]): Edge[] {
  return nodes.reduce((acc, curr) => acc.concat(getNodeFlowEdges(curr)), [] as Edge[])
}

export function getNodeFlowEdges(node: NewPipelineNode): Edge[] {
  const edges: Edge[] = [];

  for (const input of node.inputs) {
    for (const outputNodeRef of input.outputNodeRefs) {
      edges.push(getFlowEdge(node, input.name, outputNodeRef))
    }
  }

  return edges;
}

function getFlowEdge(node: NewPipelineNode, inputName: string, outputNodeRef: PipelineOutputNodeRef): Edge {
  const source = getFlowId(node);
  const sourceHandle = inputName;
  const target = getFlowId(outputNodeRef)
  const targetHandle = outputNodeRef.output;
  return {
    id: `${source}::${sourceHandle}->${target}::${targetHandle}`,
    source,
    sourceHandle,
    target,
    targetHandle,
  }
}
