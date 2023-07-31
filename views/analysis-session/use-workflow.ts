import { useState } from 'react';

export enum WorkflowStatus {
  Waiting,
  Running,
  Streaming,
  Error,
  Complete,
}

export function useWorkflow<T>() {
  const [ status, setStatus ] = useState(WorkflowStatus.Waiting);
  const [ result, setResult ] = useState<null | T>(null);

  return {
    status,
    setStatus,
    result,
    setResult,
  }
}
