import { IProvider, IQuery } from '@/lib/pipelines/interfaces';
import { StringProvider } from '@/lib/pipelines/providers/string-providers/StringProvider';


export class LLMQuery implements IQuery {
  id: string;

  promptProvider: StringProvider;
  systemMessageProvider?: StringProvider;
  contextProviders?: Array<StringProvider>;

  constructor(
    id: string,
    promptProvider: StringProvider,
    contextProviders?: Array<StringProvider>,
    systemMessageProvider?: StringProvider,
  ) {
    this.id = id;
    this.promptProvider = promptProvider;
    this.contextProviders = contextProviders;
    this.systemMessageProvider = systemMessageProvider;
  }

  async run() {
    const prompt = await this.constructPrompt();

    // Make the call to the LLM
    console.log(prompt);

    return prompt;
  }

  async constructPrompt() {
    const systemMessage = this.systemMessageProvider
      ? (await this.systemMessageProvider.run()) + '\n\n'
      : '';
    const contexts = this.contextProviders ?
      await (Promise.all(
        this.contextProviders.map(
          async (contextProvider) => (await contextProvider.run()) + '\n\n'
        )
      ))
      : []
    const prompt = await this.promptProvider.run()

    return `${systemMessage}${contexts.join('')}${prompt}`
  }

  async save() {
    // TODO save to backing store

    return this;
  }
}
