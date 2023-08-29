import { fetchPost } from '@/lib/new-pipelines/ui/api/common/fetchPost';

const URL = '/api/transcripts/get-transcripts'
const POST_DATA = {};
const ENVELOPE = 'transcripts';

export async function fetchTranscripts(): Promise<{ id: string, name: string }[]> {
  return fetchPost(URL, POST_DATA, ENVELOPE);
}
