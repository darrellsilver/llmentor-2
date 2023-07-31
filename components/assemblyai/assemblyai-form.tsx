'use client';

import { FileDropper } from '@/components/file-dropper';
import { useState } from 'react';

const acceptedFiles = {
  'image/png': ['.png'],
  'text/html': ['.html', '.htm'],
}

export default function AssemblyAIForm() {
  const [ files, onSetFiles ] = useState<File[]>([]);

  const onDrop = (files: File[]) => {
    console.log(files);
    onSetFiles(files)
  }

  return (
    <form className="h-fit">
      <FileDropper accept={acceptedFiles} maxFiles={1} files={files} onDrop={onDrop} />
    </form>
  );
}
