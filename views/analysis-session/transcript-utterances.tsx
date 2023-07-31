import { AssemblyAiTranscriptUtterance } from '@/lib/assemblyai/types';
import { Badge } from '@/components/ui/badge';

interface TranscriptUtterancesProps {
  utterances: AssemblyAiTranscriptUtterance[]
}

function getSpeakerColor(speaker: string) {
  if (speaker === 'A') return 'bg-green-100 dark:bg-green-900'
  if (speaker === 'B') return 'bg-blue-100 dark:bg-blue-900'
  if (speaker === 'C') return 'bg-orange-100 dark:bg-orange-900'
  if (speaker === 'D') return 'bg-cyan-100 dark:bg-cyan-900'
  if (speaker === 'E') return 'bg-yellow-100 dark:bg-yellow-900'
  if (speaker === 'F') return 'bg-purple-100 dark:bg-purple-900'
  return ''
}

export function TranscriptUtterances({
  utterances,
}: TranscriptUtterancesProps) {
  return (
    <>
      {utterances.map((u, idx) => (
        <div key={idx} className="mb-3">
          <Badge variant="secondary" className={`mb-1 rounded ${getSpeakerColor(u.speaker)}`}>Speaker {u.speaker}</Badge>
          <p className="pl-0.5">{u.text}</p>
        </div>
      ))}
    </>
  )
}
