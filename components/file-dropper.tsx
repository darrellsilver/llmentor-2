'use client';

import { Accept, useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface FileDropperProps {
  accept?: Accept;
  maxFiles: number;
  files: File[];
  onDrop: (files: File[]) => void;
}

export function FileDropper({ accept, files, maxFiles, onDrop }: FileDropperProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    onDrop,
  });

  return (
    <Card {...getRootProps()} className="flex cursor-pointer flex-col items-center justify-center p-6">
      <Upload className="mb-2" />
      <input {...getInputProps()} />
      <div className="mb-2">
        {files.length === 0 && (
          <Label>Select a file</Label>
        )}
        {files.map(file => (
          <Label key={file.name}>{file.name}</Label>
        ))}
      </div>
      {accept && (
        <div className="mb-4 uppercase text-secondary">
          {Object.values(accept)
            .reduce((curr, acc) => acc.concat(curr), [])
            .map(ext => ext.replace('.', ''))
            .map(ext => (
              <Badge key={ext} variant="secondary" className="mx-1 rounded">{ext}</Badge>
            )
          )}
        </div>
      )}
      <Label>
        {isDragActive ? (
          'Drop files here'
        ) : (
          'Drag and drop files here, or click to select'
        )}
      </Label>
    </Card>
  )
}
