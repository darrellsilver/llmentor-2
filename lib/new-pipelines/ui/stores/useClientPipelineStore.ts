import { create } from 'zustand';
import { NewClientPipeline } from '@/lib/new-pipelines/types';

export type ClientPipelineState = {
  pipelinesById: { [key: string]: NewClientPipeline }

  getPipelines: () => NewClientPipeline[];
  getPipeline: (pipelineId: string) => NewClientPipeline | null;
  setPipelines: (pipelines: NewClientPipeline[], replace?: boolean) => void;
  setPipeline: (pipeline: NewClientPipeline) => void;
  deletePipeline: (pipelineId: string) => void;
  clearPipelines: () => void;
}

export const useClientPipelineStore = create<ClientPipelineState>((set, get) => ({
  pipelinesById: { },

  getPipelines: (): NewClientPipeline[] => {
    const { pipelinesById } = get();
    const pipelines = Object.values(pipelinesById);
    // Sort the pipelines by createdAt
    return pipelines.sort(function(a, b) {
      return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0);
    });
  },

  getPipeline: (pipelineId: string): NewClientPipeline | null => {
    const { pipelinesById } = get();
    return pipelinesById[pipelineId] || null
  },

  setPipelines: (pipelines: NewClientPipeline[], replace: boolean = false) => set(
    (state: ClientPipelineState) => ({
      pipelinesById: pipelines.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }), replace ? {} : state.pipelinesById)
    })
  ),

  setPipeline: (pipeline: NewClientPipeline) => set(
    (state: ClientPipelineState) => ({
      pipelinesById: { ...state.pipelinesById, [pipeline.id]: pipeline }
    })
  ),

  deletePipeline: (pipelineId: string): void => set(
    (state: ClientPipelineState) => {
      const pipelinesById = Object.assign({}, state.pipelinesById);
      delete pipelinesById[pipelineId];
      return { pipelinesById: pipelinesById };
    }
  ),

  clearPipelines: () => set(
    (state: ClientPipelineState) => ({
      pipelinesById: { },
    })
  )
}));
