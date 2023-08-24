import { LLMQuery } from '@/lib/pipelines/queries/LLMQuery';
import { StringProvider } from '@/lib/pipelines/providers/string-providers/StringProvider';

export class LLMQueryProvider extends StringProvider {
  systemMessageProviderId?: string;
  contextProviderIds: string[];
  promptProviderId?: string;

  static async new(id: string) {
    return new LLMQueryProvider(id);
  }

  constructor(
    id: string
  ) {
    super(id);
    this.contextProviderIds = [];
  }

  async run() {
    return 'Query Result here';
  }
}
