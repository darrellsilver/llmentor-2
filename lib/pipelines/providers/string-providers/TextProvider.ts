import { StringProvider } from '@/lib/pipelines/providers/string-providers/StringProvider';

export class TextProvider extends StringProvider{
  content: string;

  static async new(id: string) {
    const content = `Hello from TextProvider ${id}`;
    return new TextProvider(id, content);
  }

  constructor(id: string, content: string = '') {
    super(id);
    this.content = content;
  }

  async run() {
    return this.content;
  }

  async save() {
    // TODO save to backing store
    console.log(`Saving TextProvider ${this.id}`);

    return this;
  }
}
