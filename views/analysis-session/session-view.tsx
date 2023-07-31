'use client';

import { useState } from 'react';
import { SessionUploadSection } from '@/views/analysis-session/session-upload-section';
import { SessionAnalysisSection } from '@/views/analysis-session/session-analysis-section';

export function SessionView() {
  const [ uploadResultText, setUploadResultText ] = useState<string | null>(null)

  return (
    <div className="container flex max-h-full flex-col py-4">
      <div className="grid h-full flex-1 grid-cols-2 grid-rows-1 gap-4">
        <SessionUploadSection
          onResultTextChange={setUploadResultText}
        />
        <SessionAnalysisSection
          disabled={uploadResultText === null}
          inputText={uploadResultText}
        />
      </div>
    </div>
  )
}
