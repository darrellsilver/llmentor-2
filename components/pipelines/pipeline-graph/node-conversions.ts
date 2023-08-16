import { NodeReference, NodeType, OpenAiNode, OutputNode, PipelineNode, TranscriptNode } from '@/lib/pipelines/types';
import { Edge, Node } from 'reactflow';

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

  if (outputNode.inputReference) {
    edges.push({
      id: `OutputNode-${outputNode.id}-input`,
      source: flowIdFromNodeRef(outputNode),
      sourceHandle: 'input',
      target: flowIdFromNodeRef(outputNode.inputReference),
      targetHandle: 'output'
    })
  }

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
  return nodes.map(node => getPipelineNodeFromFlowData(node, edges));
}

function getPipelineNodeFromFlowData(node: Node<PipelineNode>, edges: Edge[]) {
  // TODO Find some type-safe way to do these passes, needing to cast here is confusing
  switch (node.data.type) {
    // Nodes that don't have node reference edges
    case NodeType.TextNode:
    case NodeType.TranscriptNode:
      return getDataNodeFromFlowData(node);
    case NodeType.OutputNode:
      return getOutputNodeFromFlowData(node as Node<OutputNode>, edges);
    case NodeType.OpenAiNode:
      return getOpenAiNodeFromFlowData(node as Node<OpenAiNode>, edges);
    default:
      throw new Error("Type not recognized!")
  }
}

function getDataNodeFromFlowData(node: Node<PipelineNode>): PipelineNode {
  return {
    ...node.data,
    position: node.position,
  }
}

function getOutputNodeFromFlowData(node: Node<OutputNode>, edges: Edge[]): OutputNode {
  const inputEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'input');
  return {
    ...node.data,
    position: node.position,
    inputReference: inputEdge ? nodeRefFromFlowId(inputEdge.target) : null,
  }
}

function getOpenAiNodeFromFlowData(node: Node<OpenAiNode>, edges: Edge[]): OpenAiNode {
  const contextEdges = edges.filter(e => e.source === node.id && e.sourceHandle === 'context');
  const promptEdge = edges.find(e => e.source === node.id && e.sourceHandle === 'prompt');
  return {
    ...node.data,
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
