import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadForm } from '@/views/analysis-session/upload-form';
import { useEffect, useState } from 'react';
import { useWorkflow, WorkflowStatus } from '@/views/analysis-session/use-workflow';
import { MessageSquare } from 'lucide-react';
import { AssemblyAiTranscriptResponse } from '@/lib/assemblyai/types';
import { IconPulseLoader } from '@/views/analysis-session/icon-pulse-loader';
import { TranscriptUtterances } from '@/views/analysis-session/transcript-utterances';
import { CenteredMutedMessage } from '@/views/analysis-session/centered-muted-message';

interface SessionUploadSectionProps {
  onResultTextChange: (result: string) => void;
}

const apiRoute = '/api/analysis-session/transcribe-workflow';

async function startTranscription(file: File, expectedSpeakers: string): Promise<AssemblyAiTranscriptResponse> {
  const body = new FormData();
  body.append('file', file);
  body.append('expectedSpeakers', expectedSpeakers);

  const result = await fetch(apiRoute, {
    method: 'POST',
    body,
  })

  return await result.json()
}

async function fetchTranscript(id: string): Promise<AssemblyAiTranscriptResponse> {
  const url = `${apiRoute}?id=${id}`;
  const result = await fetch(url);
  return await result.json()
}

function getResultText(result: AssemblyAiTranscriptResponse): string {
  if (!result.utterances) return '';
  return result.utterances.map((u => `${u.speaker}: ${u.text}`)).join('\n');
}

export function SessionUploadSection({
  onResultTextChange
}: SessionUploadSectionProps) {
  const [ files, onSetFiles ] = useState<File[]>([])
  const [ expectedSpeakers, setExpectedSpeakers ] = useState('2');

  const {
    result,
    setResult,
    status,
    setStatus,
  } = useWorkflow<AssemblyAiTranscriptResponse>();

  async function onStartUpload() {
    setStatus(WorkflowStatus.Running);

    let response = await startTranscription(files[0], expectedSpeakers)
    console.log(response);

    // Poll while the transcription is being processed
    while (response.status === 'queued' || response.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 3000));
      response = await fetchTranscript(response.id);
    }

    setStatus(response.status === 'completed' ? WorkflowStatus.Complete : WorkflowStatus.Error);
    setResult(response);
  }

  useEffect(() => {
    if (!result) return;
    onResultTextChange(getResultText(result));
  }, [result])

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <h2 className="text-lg font-bold">
          Transcript Analysis
        </h2>
        <Button
          style={{ margin: 0 }}
          onClick={onStartUpload}
          disabled={status !== WorkflowStatus.Waiting}
        >
          Start Upload
        </Button>
      </CardHeader>
      <CardContent className="no-scrollbar flex-1 overflow-y-scroll p-4">
        {status === WorkflowStatus.Waiting && (
          <UploadForm
            files={files}
            onFilesChange={onSetFiles}
            speakerCount={expectedSpeakers}
            onSpeakerCountChange={setExpectedSpeakers}
          />
        )}
        {status === WorkflowStatus.Running && (
          <IconPulseLoader Icon={MessageSquare} text="Transcribing" />
        )}
        {status === WorkflowStatus.Error && (
          <CenteredMutedMessage>
            An Error Occurred
          </CenteredMutedMessage>
        )}
        {status === WorkflowStatus.Complete && result && result.utterances && (
          <TranscriptUtterances utterances={result.utterances} />
        )}
      </CardContent>
    </Card>
  )
}
