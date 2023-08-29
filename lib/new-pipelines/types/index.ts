// -- Pipeline Clients --

export type NewClientPipeline = {
  id: string;
  createdAt: string,
  name: string;
  description: string;
  extensionIds: PipelineExtensionId[]
  inputNodes: NewPipelineInputNode[];
  outputNodes: NewPipelineOutputNode[];
}

// -- Pipeline Execution --

export type NewPipelineClientExecution = PipelineExecutionStatus<NewPipelineNode> & {
  id: string;
  pipelineId: string;
  input: { [key: string]: any };
}

export type NewPipelineExecution = PipelineExecutionStatus<NewPipelineNode> & {
  id: string;
  pipeline: NewPipeline;
  input: { [key: string]: any };
  nodeExecutions: NewPipelineNodeExecution[];
};

export type NewPipelineNodeExecution = NewPipelineNodeExecutionBase<NewPipelineNode>;

export type NewPipelineNodeExecutionBase<T extends NewPipelineNode> = PipelineExecutionStatus<T> & {
  nodeRef: PipelineNodeRef;
};

type PipelineExecutionStatus<T extends NewPipelineNode> = (
  PipelineExecutionStatusRunning |
  PipelineExecutionStatusError |
  PipelineExecutionStatusSuccess<NodeOutputObjectBase<T>>
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
  createdAt: string;
  name: string;
  description: string;
  extensionIds: PipelineExtensionId[],
  nodes: NewPipelineNode[];
}

// -- Pipeline Extensions --

export type PipelineExtensionId = string;

// -- Nodes --

export type TextInputFormat = 'input' | 'textarea' | 'code';

export type NewPipelineNode = NewPipelineNodeBase<
  NewPipelineNodeData,
  NewPipelineNodeInputs,
  NewPipelineNodeOutputs
>;

export type NewPipelineInputNode = NewPipelineInputNodeBase<
  NewPipelineNodeData,
  NewPipelineNodeInputs,
  NewPipelineNodeOutputs
>

export type NewPipelineOutputNode = NewPipelineOutputNodeBase<
  NewPipelineOutputNodeDataBase<NewPipelineNodeData>,
  NewPipelineNodeInputs,
  NewPipelineNodeOutputs
>

export const INPUT_TAG = 'Input';
export type NewPipelineInputNodeBase<
  Data extends NewPipelineNodeData,
  Inputs extends NewPipelineNodeInputs,
  Outputs extends NewPipelineNodeOutputs,
> = NewPipelineNodeBase<
  NewPipelineInputNodeDataBase<Data>,
  Inputs,
  Outputs
> & {
  tag: typeof INPUT_TAG;
};

export const OUTPUT_TAG = 'Output';
export type NewPipelineOutputNodeBase<
  Data extends NewPipelineNodeData,
  Inputs extends NewPipelineNodeInputs,
  Outputs extends NewPipelineNodeOutputs,
> = NewPipelineNodeBase<
  NewPipelineOutputNodeDataBase<Data>,
  Inputs,
  Outputs
> & {
  tag: typeof OUTPUT_TAG;
};

export type NewPipelineNodeBase<
  Data extends NewPipelineNodeData,
  Inputs extends NewPipelineNodeInputs,
  Outputs extends NewPipelineNodeOutputs,
> = {
  readonly extension: string;
  readonly type: string;
  readonly tag: string;
  id: string;
  data: Data;
  inputs: Inputs;
  outputs: Outputs;
  position: { x: number, y: number };
}

export type NewPipelineInputNodeDataBase<T extends NewPipelineNodeData> = T & {
  name: string,
  description: string;
};

export type NewPipelineOutputNodeDataBase<T extends NewPipelineNodeData> = T & {
  name: string,
};

export type NewPipelineNodeData = { [key: string]: any }

// -- Ports --

export type TextSingleInputPort<Name extends string> = SingleInputPort<Name, PipelineDataTypeText>;
export type TextMultiInputPort<Name extends string> = MultiInputPort<Name, PipelineDataTypeText>;
export type TextOutputPort<Name extends string> = OutputPort<Name, PipelineDataTypeText>;

export type SingleInputPort<Name extends string, Type extends string> = InputPort<Name, Type> & {
  readonly allowMultiple: false;
}

export type MultiInputPort<Name extends string, Type extends string> = InputPort<Name, Type> & {
  readonly allowMultiple: true;
}

export type NodeInputObjectBase<T extends NewPipelineNode> = {
  [key in ExtractName<T['inputs'][number]>]: any;
}

export type NodeOutputObjectBase<T extends NewPipelineNode> = {
  [key in ExtractName<T['outputs'][number]>]: any;
}

export type NewPipelineNodeInputs = InputPort<string, string>[];
export type NewPipelineNodeOutputs = OutputPort<string, string>[];

export type InputPort<Name extends string, Type extends string> = {
  readonly name: Name;
  readonly type: Type;
  readonly allowMultiple: boolean;
  outputNodeRefs: PipelineOutputNodeRef[]
}

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

// -- Utilities --

type ExtractName<T> = T extends { name: infer Name } ? Name : never;

