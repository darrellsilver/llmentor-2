export interface IRunnable<T> {
  // Run method return generic
  run: () => Promise<T>;
}
