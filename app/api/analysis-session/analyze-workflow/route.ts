import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export async function POST(req: Request) {
  const { analyzerPrompt, inputText } = await req.json();

  // We can construct an LLMChain from a PromptTemplate and an LLM.
  const model = new OpenAI({ temperature: 0 });
  const prompt = PromptTemplate.fromTemplate(`
    Analysis request:
    {analyzerPrompt}

    Analyze the following transcript according to the above analysis request:
    {inputText}
  `);
  const chainA = new LLMChain({ llm: model, prompt });

  // The result is an object with a `text` property.
  const response = await chainA.call({
    analyzerPrompt: analyzerPrompt,
    inputText: inputText.slice(0, 4000),
  });

  return NextResponse.json(response);
}
