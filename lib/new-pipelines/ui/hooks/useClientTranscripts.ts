'use client';

import { useEffect, useState } from 'react';

import { useClientTranscriptStore } from '@/lib/new-pipelines/ui/stores';
import { fetchTranscripts } from '@/lib/new-pipelines/ui/api/transcripts';

type Status = 'fetching' | 'error' | 'success';

export function useClientTranscripts() {
  const [ status, setStatus ] = useState<Status>('fetching');

  const {
    getTranscripts,
    setTranscripts
  } = useClientTranscriptStore(state => ({
    getTranscripts: state.getTranscripts,
    setTranscripts: state.setTranscripts,
  }));

  useEffect(() => {
    if (status !== 'fetching') return;
    fetchTranscripts()
      .then(transcripts => {
        setTranscripts(transcripts);
        setStatus('success');
      }).catch(e => {
        setStatus('error');
      });
  }, [setTranscripts, status]);

  return getTranscripts();
}
