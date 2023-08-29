import { create } from 'zustand';

type ClientTranscript = {
  id: string;
  name: string;
}

export type TranscriptState = {
  transcriptsById: { [key: string]: ClientTranscript }

  getTranscripts: () => ClientTranscript[];
  getTranscript: (transcriptId: string) => ClientTranscript | null;
  setTranscripts: (transcripts: ClientTranscript[], replace?: boolean) => void;
  setTranscript: (transcript: ClientTranscript) => void;
  deleteTranscript: (transcriptId: string) => void;
  clearTranscripts: () => void;
}

export const useClientTranscriptStore = create<TranscriptState>((set, get) => ({
  transcriptsById: { },

  getTranscripts: (): ClientTranscript[] => {
    const { transcriptsById } = get();
    const transcripts = Object.values(transcriptsById);
    // Sort the transcripts by name
    return transcripts.sort(function(a, b) {
      return (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0);
    });
  },

  getTranscript: (transcriptId: string): ClientTranscript | null => {
    const { transcriptsById } = get();
    return transcriptsById[transcriptId] || null
  },

  setTranscripts: (transcripts: ClientTranscript[], replace: boolean = false) => set(
    (state: TranscriptState) => ({
      transcriptsById: transcripts.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }), replace ? {} : state.transcriptsById)
    })
  ),

  setTranscript: (transcript: ClientTranscript) => set(
    (state: TranscriptState) => ({
      transcriptsById: { ...state.transcriptsById, [transcript.id]: transcript }
    })
  ),

  deleteTranscript: (transcriptId: string): void => set(
    (state: TranscriptState) => {
      const transcriptsById = Object.assign({}, state.transcriptsById);
      delete transcriptsById[transcriptId];
      return { transcriptsById: transcriptsById };
    }
  ),

  clearTranscripts: () => set(
    (state: TranscriptState) => ({
      transcriptsById: { },
    })
  )
}));
