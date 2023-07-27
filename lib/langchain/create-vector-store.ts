import { EPubLoader } from "langchain/document_loaders/fs/epub";
import * as console from 'console';
import path from 'path'
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import * as fs from 'fs';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { VectorStore } from 'langchain/vectorstores';

const EPUB_LOADER_CONFIG = {
  splitChapters: false,
};

const CHUNK_SIZE = 1000;

function getEPubPath(fileName: string): string {
  const dataDir = path.resolve(process.cwd(), 'data/epubs');
  return `${dataDir}/${fileName}`
}

function getVectorStorePath(fileName: string): string {
  const dataDir = path.resolve(process.cwd(), 'data/vector-stores');
  return `${dataDir}/${fileName.split('.')[0]}.index`
}

export async function createVectorStoreForEPub(sourceFileName: string): Promise<VectorStore | null> {
  const vectorStorePath = getVectorStorePath(sourceFileName);

  if (fs.existsSync(vectorStorePath)) {
    console.log('Vector already exists. not creating');
    return await HNSWLib.load(vectorStorePath, new OpenAIEmbeddings());
  }

  const sourceFilePath = getEPubPath(sourceFileName)

  if (!fs.existsSync(sourceFilePath)) {
    console.error(`No source file ${sourceFileName} found. Check the /data/epubs directory and file name`)
    return null;
  }

  const loader = new EPubLoader(
    sourceFilePath,
    EPUB_LOADER_CONFIG
  );

  const content = await loader.load();

  // Split the input text into documents
  const texts = [content[0].pageContent];
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: CHUNK_SIZE });
  const docs = await textSplitter.createDocuments(texts);

  // Create a new vector store from the documents using OpenAIEmbeddings
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  // Save the vector store to a file
  await vectorStore.save(vectorStorePath);

  return vectorStore;
}
