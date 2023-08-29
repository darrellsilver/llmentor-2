export type TranscriptList = TranscriptListItem[];

export type TranscriptListItem = {
  id: string;
}

export async function fetchTranscriptList() : Promise<TranscriptList> {
  const response = await fetch(
    '/api/transcripts/get-transcripts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
    }
  )

  const responseData = await response.json();

  return responseData.transcripts;
}
