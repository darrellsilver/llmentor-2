export type AssemblyAiUploadResponse = {
  upload_url: string;
}

export type AssemblyAiTranscriptRequest = {
  audio_url: string,
  speaker_labels: boolean,
  speakers_expected: null | number,
};

export type AssemblyAiTranscriptResponse = {
  id: string;
  audio_url: string;
  status: AssemblyAiTranscriptStatus;
  utterances: null | AssemblyAiTranscriptUtterance[];
  expected_speakers: number;
};

export type AssemblyAiTranscriptStatus = 'queued' | 'processing' | 'error' | 'completed';

export type AssemblyAiTranscriptUtterance = {
  speaker: string,
  text: string,
}
