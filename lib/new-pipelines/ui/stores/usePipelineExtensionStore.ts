import { create } from 'zustand';
import { PipelineExtension } from '@/lib/new-pipelines/core/extensions';

export type PipelineExtensionState = {
  extensionsById: { [key: string]: PipelineExtension }

  getExtension: (extensionId: string) => PipelineExtension | null;
  setExtensions: (extensions: PipelineExtension[], replace: boolean) => void;
  setExtension: (extension: PipelineExtension) => void;
  deleteExtension: (extension: string) => void;
  clearExtensions: () => void;
}

export const usePipelineExtensionStore = create<PipelineExtensionState>((set, get) => ({
  extensionsById: { },

  getExtension: (extensionId: string): PipelineExtension | null => {
    const { extensionsById } = get();
    return extensionsById[extensionId] || null
  },

  setExtensions: (extensions: PipelineExtension[], replace: boolean = false) => set(
    (state: PipelineExtensionState) => ({
      extensionsById: extensions.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }), replace ? {} : state.extensionsById)
    })
  ),

  setExtension: (extension: PipelineExtension) => set(
    (state: PipelineExtensionState) => ({
      extensionsById: { ...state.extensionsById, [extension.id]: extension }
    })
  ),

  deleteExtension: (extensionId: string): void => set(
    (state: PipelineExtensionState) => {
      const extensionsById = Object.assign({}, state.extensionsById);
      delete extensionsById[extensionId];
      return { extensionsById };
    }
  ),

  clearExtensions: () => set(
    (state: PipelineExtensionState) => ({
      extensionsById: { },
    })
  )
}));
