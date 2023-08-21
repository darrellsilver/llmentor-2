import { NodeReference, NodeType, OpenAiNode, OutputNode, PipelineNode, TranscriptNode } from '@/lib/pipelines/types';
import { Edge, Node } from 'reactflow';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { PipelineNodesState } from '@/components/pipelines/stores/usePipelineNodesStore';

// Pipeline to Flow

export function getFlowDataFromPipelineNodes(pipelineNodes: PipelineNode[]) {
  return {
    initialNodes: pipelineNodes.map(getFlowNodeFromPipelineNode),
    initialEdges: pipelineNodes.reduce(
      (acc, curr) => acc.concat(getFlowEdgesFromPipelineNode(curr)),
      [] as Edge[]
    ),
  }
}

function getFlowNodeFromPipelineNode(pipelineNode: PipelineNode) : Node<PipelineNode> {
  return {
    type: pipelineNode.type,
    id: `${pipelineNode.type}::${pipelineNode.id}`,
    position: pipelineNode.position,
    data: pipelineNode,
  }
}

function getFlowEdgesFromPipelineNode(pipelineNode: PipelineNode) : Edge[] {
  switch (pipelineNode.type) {
    case NodeType.OutputNode: return getFlowEdgesFromOutputNode(pipelineNode);
    case NodeType.OpenAiNode: return getFlowEdgesFromOpenAiNode(pipelineNode);
    default: return [];
  }
}

function getFlowEdgesFromOutputNode(outputNode: OutputNode): Edge[] {
  const edges: Edge[] = [];

  const nodeFlowId = flowIdFromNodeRef(outputNode)

  outputNode.inputReferences?.forEach(inputNodeRef => {
    edges.push({
      id: `OutputNode-${outputNode.id}-input`,
      source: nodeFlowId,
      sourceHandle: 'input',
      target: flowIdFromNodeRef(inputNodeRef),
      targetHandle: 'output'
    })
  })

  return edges;
}

function getFlowEdgesFromOpenAiNode(openAiNode: OpenAiNode): Edge[] {
  const edges: Edge[] = [];

  const openAiNodeFlowId = flowIdFromNodeRef(openAiNode);

  openAiNode.contextReferences.forEach(contextReference => {
    const contextNodeFlowId = flowIdFromNodeRef(contextReference);
    edges.push({
      id: `OpenAiNode-${openAiNode.id}-context-${contextNodeFlowId}`,
      source: openAiNodeFlowId,
      sourceHandle: 'context',
      target: contextNodeFlowId,
      targetHandle: 'output',
    })
  })

  if (openAiNode.promptReference) {
    edges.push({
      id: `OpenAiNode-${openAiNode.id}-prompt`,
      source: openAiNodeFlowId,
      sourceHandle: 'prompt',
      target: flowIdFromNodeRef(openAiNode.promptReference),
      targetHandle: 'output',
    })
  }

  return edges;
}

// Flow to Pipeline

export function getPipelineNodesFromFlowData(nodes: Node<PipelineNode>[], edges: Edge[]) : PipelineNode[] {
  const state = usePipelineNodesStore.getState();
  return nodes.map(node => getPipelineNodeFromFlowData(state, node, edges));
}

function getPipelineNodeFromFlowData(state: PipelineNodesState, node: Node<PipelineNode>, edges: Edge[]) {
  switch (node.data.type) {
    // Nodes that don't have node reference edges
    case NodeType.TextNode:
    case NodeType.TranscriptNode:
      return getDataNodeFromFlowData(state.getNode(node.data)!, node);
    case NodeType.OutputNode:
      return getOutputNodeFromFlowData(state.getOutputNode(node.data.id)!, node, edges);
    case NodeType.OpenAiNode:
      return getOpenAiNodeFromFlowData(state.getOpenAiNode(node.data.id)!, node, edges);
    default:
      throw new Error(`Node type not recognized: ${node.type}`);
  }
}

function getDataNodeFromFlowData(pipelineNode: PipelineNode, node: Node<PipelineNode>): PipelineNode {
  return {
    ...pipelineNode,
    position: node.position,
  }
}

function getOutputNodeFromFlowData(outputNode: OutputNode, node: Node<PipelineNode>, edges: Edge[]): OutputNode {
  const inputEdges = edges.filter(e => e.source === node.id && e.sourceHandle === 'input');
  return {
    ...outputNode,
    position: node.position,
    inputReferences: inputEdges.map(inputEdge => nodeRefFromFlowId(inputEdge.target)),
  }
}

function getOpenAiNodeFromFlowData(openAiNode: OpenAiNode, node: Node<PipelineNode>, edges: Edge[]): OpenAiNode {
  const contextEdges = edges.filter(e => e.source === node.id && e.sourceHandle === 'context');
  const promptEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'prompt');
  return {
    ...openAiNode,
    position: node.position,
    contextReferences: contextEdges.map(edge => nodeRefFromFlowId(edge.target)).sort(),
    promptReference: promptEdge ? nodeRefFromFlowId(promptEdge.target) : null,
  }
}

// Transformation utils

function flowIdFromNodeRef(nodeReference: NodeReference) : string {
  return `${nodeReference.type}::${nodeReference.id}`
}

function nodeRefFromFlowId(flowId: string) : NodeReference {
  const parts = flowId.split('::');
  return {
    type: parts[0] as NodeType,
    id: parts[1],
  }
}
