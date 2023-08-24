import { create } from 'zustand';
import { TranscriptList, TranscriptListItem } from '@/components/pipelines/api/fetchTranscriptList';

export type TranscriptsState = {
  transcripts: TranscriptList;

  setTranscripts: (transcripts: TranscriptList) => void;
  addTranscript: (transcript: TranscriptListItem) => void;
  getTranscript: (transcriptId: string) => TranscriptListItem | null;
  removeTranscript: (transcriptId: string) => void;
}

export const useTranscriptsStore = create<TranscriptsState>((set, get) => ({
  transcripts: [],

  setTranscripts: (transcripts: TranscriptList) => set(
    (state: TranscriptsState) => ({
      transcripts,
    })
  ),

  addTranscript: (transcript: TranscriptListItem) => set(
    (state: TranscriptsState) => ({
      transcripts: [ ...state.transcripts, transcript ],
    })
  ),

  getTranscript: (transcriptId: string): TranscriptListItem | null => {
    return get().transcripts.find(transcript => transcript.id === transcriptId) || null;
  },

  removeTranscript: (transcriptId: string) => set(
    (state: TranscriptsState) => ({
      transcripts: state.transcripts.filter(transcriptItem => transcriptItem.id !== transcriptId),
    })
  ),
}));
