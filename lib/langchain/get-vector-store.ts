import path from 'path'
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import * as fs from 'fs';
import { VectorStore } from 'langchain/vectorstores';

function getVectorStorePath(fileName: string): string {
  const dataDir = path.resolve(process.cwd(), 'data/vector-stores');
  return `${dataDir}/${fileName.split('.')[0]}.index`
}

export async function getVectorStore(sourceFileName: string): Promise<VectorStore | null> {
  const vectorStorePath = getVectorStorePath(sourceFileName)

  if (!fs.existsSync(vectorStorePath)) {
    console.error(`No vector store for ${sourceFileName}`);
    return null;
  }

  return await HNSWLib.load(vectorStorePath, new OpenAIEmbeddings());
}
