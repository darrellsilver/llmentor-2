import { IRunnable, ISavable } from '@/lib/pipelines/interfaces';

export interface IProvider<T> extends IRunnable<T>, ISavable { }
