import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranscriptsStore } from '@/components/pipelines/stores/useTranscriptsStore';

type TranscriptSelectProps = {
  selectedTranscriptId: string | null,
  onTranscriptIdChange: (transcriptId: string) => void;
}

export function TranscriptSelect({
  selectedTranscriptId,
  onTranscriptIdChange,
}: TranscriptSelectProps) {
  const transcripts = useTranscriptsStore(state => state.transcripts);

  return (
    <Select
      value={selectedTranscriptId || undefined}
      onValueChange={onTranscriptIdChange}
    >
      <SelectTrigger className="w-64 bg-background">
        <SelectValue placeholder="Pick transcript" />
      </SelectTrigger>
      <SelectContent>
        {(transcripts || []).map(({ id }) => (
          <SelectItem key={id} value={id}>
            {id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
