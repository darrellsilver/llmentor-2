

import { NewPipelineInputNode } from '@/lib/new-pipelines/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClientTranscripts } from '@/lib/new-pipelines/ui/hooks/useClientTranscripts';

export function renderInput(
  node: NewPipelineInputNode,
  value: string,
  onValueChange: (value: string) => void
) {
  return (
    <Label>
      <div className="mb-2 ml-0.5 font-bold">
        {node.data.name}
      </div>
      {node.data.description && (
        <div className="mb-2 ml-0.5 text-sm font-medium text-muted-foreground">
          {node.data.description}
        </div>
      )}
      <TranscriptIdSelect
        value={value}
        onValueChange={onValueChange}
      />
    </Label>
  )
}

type TranscriptIdSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
}

function TranscriptIdSelect({
  value,
  onValueChange,
}: TranscriptIdSelectProps) {
  const transcripts = useClientTranscripts();

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="mb-2 bg-background">
        <SelectValue placeholder="Pick Transcript" />
      </SelectTrigger>
      <SelectContent>
        {transcripts.map(transcript => (
          <SelectItem
            key={transcript.id}
            value={transcript.id}
          >
            {transcript.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
