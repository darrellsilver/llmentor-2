import { OpenAI as OpenAiLangchain } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

import OpenAI from 'openai';
import type { CompletionCreateParams, CreateChatCompletionRequestMessage } from 'openai/resources/chat'

const functions: CompletionCreateParams.Function[] = [
  {
    name: 'performAnalysis',
    description: 'Perform transcript analysis',
    parameters: {
      type: 'object',
      properties: {
        confrontation: {
          type: 'number',
          description: 'The level of confrontation present in the transcript, on a scale of 0-1',
        },
        interruptions: {
          type: 'number',
          description: 'The level of interruptions present in the transcript, on a scale of 0-1',
        },
        knowledge: {
          type: 'number',
          description: 'The level of knowledge of the transcript speakers, on a scale of 0-1',
        }
      },
      required: ['confrontation', 'interruptions', 'knowledge'],
    }
  }
]


// And use it like this:
export async function getOpenAiCompletionWithFuncs(
  modelName: string,
  temperature: number,
  contexts: string[],
  prompt: string,
) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const content = `
${contexts.join('\n\n')}

${prompt}`

  const messages: CreateChatCompletionRequestMessage[] = [
    {
      content,
      role: 'user',
    },
  ];

  const response = await openai.chat.completions.create({
    model: `${modelName}-0613`,
    temperature,
    messages,
    functions
  })

  console.log(prompt);

  console.log(response);
  console.log(response.choices[0].message);

  return response.choices[0].message.function_call?.arguments || response.choices[0].message.content;

  // const stream = OpenAIStream(response)
  // return new StreamingTextResponse(stream)
}

export async function getOpenAiCompletion(
  modelName: string,
  temperature: number,
  contexts: string[],
  prompt: string,
  useFunctions: boolean,
) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  if (useFunctions) {
    return await getOpenAiCompletionWithFuncs(
      modelName,
      temperature,
      contexts,
      prompt,
    );
  }

  const model = new OpenAiLangchain({ modelName, temperature });

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
