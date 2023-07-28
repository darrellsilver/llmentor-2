import { VectorStore } from 'langchain/vectorstores';
import { OpenAI } from 'langchain/llms/openai';
import { RetrievalQAChain } from 'langchain/chains';

export async function getRetrievalQaChainResponse(query: string, vectorStore: VectorStore) {
  const model = new OpenAI({});
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  return await chain.call({
    query,
  });
}
