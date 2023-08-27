// -- Pipeline Execution --

export type NewPipelineExecution = PipelineExecutionStatus<{ [key: string]: any }> & {
  pipeline: NewPipeline;
  input: { [key: string]: any };
  nodeExecutions: NewPipelineNodeExecution[];
};
// TODO: Have each extension export it's own execution types

export type NewPipelineNodeExecution = NewPipelineNodeExecutionType<{ [key: string]: any }>;

export type NewPipelineNodeExecutionType<T extends { [key: string]: any }> = PipelineExecutionStatus<T> & {
  nodeRef: PipelineNodeRef;
};

type PipelineExecutionStatus<T extends { [key: string]: any }> = (
  PipelineExecutionStatusRunning |
  PipelineExecutionStatusError |
  PipelineExecutionStatusSuccess<T>
);

type PipelineExecutionStatusRunning = {
  status: 'running';
  progress: number;
}

type PipelineExecutionStatusError = {
  status: 'error';
  message: string;
};

type PipelineExecutionStatusSuccess<T extends { [key: string]: any }> = {
  status: 'success';
  output: T;
};

// -- Pipeline --

export type NewPipeline = {
  id: string;
  name: string;
  description: string;
  extensionIds: string[],
  nodes: NewPipelineNode[];
}

// -- Nodes --

export type TextInputFormat = 'input' | 'textarea' | 'code';

export type CorePipelineInputNode = BaseCorePipelineNode & NewPipelineInputNode;
export type CorePipelineOutputNode = BaseCorePipelineNode & NewPipelineOutputNode;

export type NewPipelineInputNode = NewPipelineNode & {
  tag: 'input'
  data: {
    name: string;
    description: string;
  }
}

export type NewPipelineOutputNode = NewPipelineNode & {
  tag: 'output';
  data: {
    name: string;
  }
}

type BaseCorePipelineNode = NewPipelineNode & {
  extension: 'core';
}

export type NewPipelineNode = NewPipelineNodeBase<any>;

export type NewPipelineNodeBase<T extends any> = {
  readonly extension: string;
  readonly type: string;
  readonly tag: string;
  id: string;
  data: T;
  inputs: InputPort<string, any>[] | never[];
  outputs: OutputPort<string, any>[] | never[];
  position: { x: number, y: number };
}

// -- Ports --

export type TextSingleInputPort<Name extends string> = SingleInputPort<Name, PipelineDataTypeText>;
export type TextMultiInputPort<Name extends string> = MultiInputPort<Name, PipelineDataTypeText>;

export type SingleInputPort<Name extends string, Type> = InputPort<Name, Type> & {
  readonly allowMultiple: false;
}

export type MultiInputPort<Name extends string, Type> = InputPort<Name, Type> & {
  readonly allowMultiple: true;
}

export type InputPort<Name extends string, Type> = {
  readonly name: Name;
  readonly type: Type;
  readonly allowMultiple: boolean;
  outputNodeRefs: PipelineOutputNodeRef[]
}

export type TextOutputPort<Name extends string> = OutputPort<Name, PipelineDataTypeText>;

export type OutputPort<Name extends string, Type extends string> = {
  readonly name: Name,
  readonly type: Type;
}

export type PipelineDataTypeText = 'text';

export type PipelineOutputNodeRef = PipelineNodeRef & {
  output: string;
}

export type PipelineNodeRef = {
  extension: string;
  type: string;
  id: string;
}

type EmptyObj = Record<PropertyKey, never>;
