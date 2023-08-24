import { create } from 'zustand';
import {
  NodeReference,
  NodeType,
  OpenAiNode,
  OutputNode,
  PipelineNode,
  TextNode,
  TranscriptNode
} from '@/lib/pipelines/types';

export type PipelineNodesState = {
  textNodesById: { [key: string]: TextNode };
  transcriptNodesById: { [key: string]: TranscriptNode };
  openAiNodesById: { [key: string]: OpenAiNode };
  outputNodesById: { [key: string]: OutputNode };

  setNode: (node: PipelineNode) => void;
  setTextNode: (node: TextNode) => void;
  setTranscriptNode: (node: TranscriptNode) => void;
  setOpenAiNode: (node: OpenAiNode) => void;
  setOutputNode: (node: OutputNode) => void;

  getPropertyNodes: () => PipelineNode[];
  getAllNodes: () => PipelineNode[];
  getNode: (nodeRef: NodeReference) => PipelineNode | null;
  getTextNode: (nodeId: string) => TextNode | null,
  getTranscriptNode: (nodeId: string) => TranscriptNode | null,
  getOpenAiNode: (nodeId: string) => OpenAiNode | null,
  getOutputNode: (nodeId: string) => OutputNode | null,

  deleteNode: (nodeRef: NodeReference) => void;
  deleteTextNode: (nodeId: string) => void;
  deleteTranscriptNode: (nodeId: string) => void;
  deleteOpenAiNode: (nodeId: string) => void;
  deleteOutputNode: (nodeId: string) => void;
}

export const usePipelineNodesStore = create<PipelineNodesState>((set, get) => ({
  textNodesById: {},
  transcriptNodesById: {},
  openAiNodesById: {},
  outputNodesById: {},

  // Setting nodes

  setNode: (node: PipelineNode) => {
    const state = get();

    const nodeType = node.type;
    switch (nodeType) {
      case NodeType.TextNode:
        state.setTextNode(node);
        break;
      case NodeType.TranscriptNode:
        state.setTranscriptNode(node);
        break;
      case NodeType.OpenAiNode:
        state.setOpenAiNode(node);
        break;
      case NodeType.OutputNode:
        state.setOutputNode(node);
        break;
      default:
        console.warn(`Unrecognized node type for setNode: ${nodeType}`)
    }
  },

  setTextNode: (node: TextNode) => set(
    (state: PipelineNodesState) => ({
    textNodesById: { ...state.textNodesById, [node.id]: node }
  })),
  setTranscriptNode: (node: TranscriptNode) => set(
    (state: PipelineNodesState) => ({
    transcriptNodesById: { ...state.transcriptNodesById, [node.id]: node }
  })),
  setOpenAiNode: (node: OpenAiNode) => set(
    (state: PipelineNodesState) => ({
    openAiNodesById: { ...state.openAiNodesById, [node.id]: node }
  })),
  setOutputNode: (node: OutputNode) => set(
    (state: PipelineNodesState) => ({
    outputNodesById: { ...state.outputNodesById, [node.id]: node }
  })),

  // Getting nodes

  getPropertyNodes: (): PipelineNode[] => {
    return get()
      .getAllNodes()
      .filter(node => node.isProperty);
  },

  getAllNodes: (): PipelineNode[] => {
    const {
      textNodesById,
      transcriptNodesById,
      openAiNodesById,
      outputNodesById,
    } = get();

    return ([] as PipelineNode[])
      .concat(Object.values(textNodesById))
      .concat(Object.values(transcriptNodesById))
      .concat(Object.values(openAiNodesById))
      .concat(Object.values(outputNodesById));
  },

  getNode: (nodeRef: NodeReference): PipelineNode | null => {
    const state = get();

    const nodeType = nodeRef.type;
    switch (nodeType) {
      case NodeType.TextNode:
        return state.getTextNode(nodeRef.id);
      case NodeType.TranscriptNode:
        return state.getTranscriptNode(nodeRef.id);
      case NodeType.OpenAiNode:
        return state.getOpenAiNode(nodeRef.id);
      case NodeType.OutputNode:
        return state.getOutputNode(nodeRef.id);
      default:
        throw new Error(`Unrecognized node type for getNode: ${nodeRef.type}`)
    }
  },

  getTextNode: (nodeId: string) => get().textNodesById[nodeId] || null,
  getTranscriptNode: (nodeId: string) => get().transcriptNodesById[nodeId] || null,
  getOpenAiNode: (nodeId: string) => get().openAiNodesById[nodeId] || null,
  getOutputNode: (nodeId: string) => get().outputNodesById[nodeId] || null,

  // Deleting nodes

  deleteNode: (nodeRef: NodeReference): void => {
    const state = get();

    const nodeType = nodeRef.type;
    switch (nodeType) {
      case NodeType.TextNode:
        state.deleteTextNode(nodeRef.id);
        break;
      case NodeType.TranscriptNode:
        state.deleteTranscriptNode(nodeRef.id);
        break;
      case NodeType.OpenAiNode:
        state.deleteOpenAiNode(nodeRef.id);
        break;
      case NodeType.OutputNode:
        state.deleteOutputNode(nodeRef.id);
        break;
      default:
        throw new Error(`Unrecognized node type for deleteNode: ${nodeRef.type}`)
    }
  },

  // TODO Replace with lodash.omit

  deleteTextNode: (nodeId: string) => {
    set((state: PipelineNodesState) => {
      const textNodesById = Object.assign({}, state.textNodesById);
      delete textNodesById[nodeId];
      return { textNodesById };
    })
  },
  deleteTranscriptNode: (nodeId: string) => {
    set((state: PipelineNodesState) => {
      const transcriptNodesById = Object.assign({}, state.transcriptNodesById);
      delete transcriptNodesById[nodeId];
      return { transcriptNodesById };
    })
  },
  deleteOpenAiNode: (nodeId: string) => {
    set((state: PipelineNodesState) => {
      const openAiNodesById = Object.assign({}, state.openAiNodesById);
      delete openAiNodesById[nodeId];
      return { openAiNodesById };
    })
  },
  deleteOutputNode: (nodeId: string) => {
    set((state: PipelineNodesState) => {
      const outputNodesById = Object.assign({}, state.outputNodesById);
      delete outputNodesById[nodeId];
      return { outputNodesById };
    })
  },
}));
