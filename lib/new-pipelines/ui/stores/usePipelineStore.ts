import { create } from 'zustand';
import { NewPipeline } from '@/lib/new-pipelines/types';

export type PipelineState = {
  pipelinesById: { [key: string]: NewPipeline }

  getPipelines: () => NewPipeline[];
  getPipeline: (pipelineId: string) => NewPipeline | null;
  setPipelines: (pipelines: NewPipeline[], replace?: boolean) => void;
  setPipeline: (pipeline: NewPipeline) => void;
  deletePipeline: (pipelineId: string) => void;
  clearPipelines: () => void;
}

export const usePipelineStore = create<PipelineState>((set, get) => ({
  pipelinesById: { },

  getPipelines: (): NewPipeline[] => {
    const { pipelinesById } = get();
    const pipelines = Object.values(pipelinesById);
    // Sort the pipelines by createdAt
    return pipelines.sort(function(a, b) {
      return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0);
    });
  },

  getPipeline: (pipelineId: string): NewPipeline | null => {
    const { pipelinesById } = get();
    return pipelinesById[pipelineId] || null
  },

  setPipelines: (pipelines: NewPipeline[], replace: boolean = false) => set(
    (state: PipelineState) => ({
      pipelinesById: pipelines.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }), replace ? {} : state.pipelinesById)
    })
  ),

  setPipeline: (pipeline: NewPipeline) => set(
    (state: PipelineState) => ({
      pipelinesById: { ...state.pipelinesById, [pipeline.id]: pipeline }
    })
  ),

  deletePipeline: (pipelineId: string): void => set(
    (state: PipelineState) => {
      const pipelinesById = Object.assign({}, state.pipelinesById);
      delete pipelinesById[pipelineId];
      return { pipelinesById: pipelinesById };
    }
  ),

  clearPipelines: () => set(
    (state: PipelineState) => ({
      pipelinesById: { },
    })
  )
}));
