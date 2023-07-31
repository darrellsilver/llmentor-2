import { FileDropper } from '@/components/file-dropper';
import { Input } from '@/components/ui/input';
import { ExpectedSpeakersSelect } from '@/views/analysis-session/speakers-expected-select';

interface UploadFormProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  speakerCount: string;
  onSpeakerCountChange: (value: string) => void;
}

const acceptedFiles = {
  'audio/mp3': ['.mp3'],
  'audio/m4a': ['.m4a'],
}

export function UploadForm({
  files,
  onFilesChange,
  speakerCount,
  onSpeakerCountChange,
}: UploadFormProps) {
  return (
    <div className="container flex h-full w-[600px] flex-col justify-center">
      <FileDropper
        accept={acceptedFiles}
        maxFiles={1}
        files={files}
        onDrop={onFilesChange}
      />
      <ExpectedSpeakersSelect
        disabled={false}
        value={speakerCount}
        onChange={onSpeakerCountChange}
      />
    </div>
  )
}
