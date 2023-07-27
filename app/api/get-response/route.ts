import { NextRequest, NextResponse } from 'next/server';
import { getVectorStore } from '@/lib/langchain/get-vector-store';
import { getRetrievalQaChainResponse } from '@/lib/langchain/get-retrieval-qa-chain-response';

export async function GET(request: NextRequest) {
  // TODO change to a POST with a body?

  const source = request.nextUrl.searchParams.get('source');
  if (!source) {
    return NextResponse.json({
      error: 'No source provided. Please provide one with the `source` search param',
    });
  }

  const query = request.nextUrl.searchParams.get('q');
  if (!query) {
    return NextResponse.json({
      error: 'No query provided. Please provide one with the `q` search param',
    });
  }

  const vectorStore = await getVectorStore(source)

  if (!vectorStore) {
    return NextResponse.json({
      error: `No vector store for ${source}`,
    });
  }

  const result = await getRetrievalQaChainResponse(query, vectorStore);

  return NextResponse.json(result)
}
