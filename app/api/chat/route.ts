import { LangChainStream, Message, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema';
import { getVectorStore } from '@/lib/langchain/get-vector-store';

export async function POST(req: Request) {

  const { messages, source } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  })

  const vectorStore = await getVectorStore(source);

  // Query for context and add it to the system message
  // TODO query for additional context (eg. if the chat references the previous response, the context search is iffy)
  const results = await vectorStore?.similaritySearch(messages[messages.length - 1].content);
  const systemMessage = new SystemMessage(
    'You are a teaching assistant for a course on author Barry Schwartz\'s book, "Why we Work". ' +
    'You exclusively use the content provided here to answer questions. If the context is not provided, ' +
    'you answer with "I don\'t have any knowledge on that subject":\n' +
    results?.map(r => r.pageContent).join('\n\n')
  );

  const chatMessages = [
    systemMessage
  ].concat((messages as Message[]).map(m =>
    m.role === 'user'
      ? new HumanMessage(m.content)
      : new AIMessage(m.content)
  ))

  // Call the chat chain
  llm.call(
    chatMessages,
    {},
    [handlers]
  )
    .catch(console.error)

  return new StreamingTextResponse(stream);
}
