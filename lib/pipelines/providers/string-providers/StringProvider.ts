import { IRunnable, ISavable } from '@/lib/pipelines/interfaces';

export abstract class StringProvider implements IRunnable<string>, ISavable {
  id: string;

  protected constructor(id: string) {
    this.id = id;
  }

  abstract run(): Promise<string>;
}
