import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

export async function getOpenAiCompletion(
  modelName: string,
  temperature: number,
  contexts: string[],
  prompt: string
) {
  const model = new OpenAI({ modelName, temperature });

  const promptTemplate = PromptTemplate.fromTemplate(`
{context}

{prompt}
  `);
  const chain = new LLMChain({ llm: model, prompt: promptTemplate });

  // The result is an object with a `text` property.
  const response = await chain.call({
    context: contexts.join('\n\n'),
    prompt,
  });

  return response.text
}
