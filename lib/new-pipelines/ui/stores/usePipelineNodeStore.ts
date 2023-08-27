import { create } from 'zustand';
import { getFlowId } from '@/lib/new-pipelines/ui/utils';
import { NewPipelineNode, PipelineNodeRef } from '@/lib/new-pipelines/core/types';

export type PipelineNodeState = {
  nodesByFlowId: { [key: string]: NewPipelineNode }

  getNode: (nodeRef: PipelineNodeRef) => NewPipelineNode | null;
  getNodeByFlowId: (flowId: string | null) => NewPipelineNode | null;
  setNodes: (nodes: NewPipelineNode[], replace: boolean) => void;
  setNode: (node: NewPipelineNode) => void;
  deleteNode: (nodeRef: PipelineNodeRef) => void;
  clearNodes: () => void;
}

export const usePipelineNodeStore = create<PipelineNodeState>((set, get) => ({
  nodesByFlowId: { },

  getNode: (nodeRef: PipelineNodeRef): NewPipelineNode | null => {
    const { nodesByFlowId } = get();
    return nodesByFlowId[getFlowId(nodeRef)] || null
  },

  getNodeByFlowId: (flowId: string | null) => flowId ? get().nodesByFlowId[flowId] || null : null,

  setNodes: (nodes: NewPipelineNode[], replace: boolean = false) => set(
    (state: PipelineNodeState) => ({
      nodesByFlowId: nodes.reduce((acc, curr) => ({
        ...acc,
        [getFlowId(curr)]: curr,
      }), replace ? {} : state.nodesByFlowId)
    })
  ),

  setNode: (node: NewPipelineNode, replace: boolean = false) => set(
    (state: PipelineNodeState) => ({
      nodesByFlowId: { ...state.nodesByFlowId, [getFlowId(node)]: node }
    })
  ),

  deleteNode: (nodeRef: PipelineNodeRef): void => set(
    (state: PipelineNodeState) => {
      const nodesByFlowId = Object.assign({}, state.nodesByFlowId);
      delete nodesByFlowId[getFlowId(nodeRef)];
      return { nodesByFlowId };
    }
  ),

  clearNodes: () => set(
    (state: PipelineNodeState) => ({
      nodesByFlowId: { },
    })
  )
}));
