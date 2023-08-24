// const nodeTypes = {
//   TextNode: 'TextNode',
//   OutputNode: 'OutputNode',
// } as const;
// type NodeTypeObj = typeof nodeTypes;
// type NodeType = keyof NodeTypeObj;

export enum NodeType {
  TextNode = 'TextNode',
  OutputNode = 'OutputNode',
  OpenAiNode = 'OpenAiNode',
  TranscriptNode = 'TranscriptNode',
}

export type PipelineRunnable = {
  pipeline: Pipeline;
} & PipelineRunnableStatus;

type PipelineRunnableStatus = (
  { status: 'error', message: string } |
  { status: 'success', nodeResults: PipelineNodeRunnable[], result: string }
);

export type Pipeline = {
  id: string,
  title: string;
  description: string;
  nodes: PipelineNode[];
};

export type ClientPipeline = {
  id: string,
  title: string;
  description: string;
  properties: PipelineProperty[];
}

export type PipelineNodeRunnable = {
  node: PipelineNode,
} & PipelineNodeRunnableStatus;

type PipelineNodeRunnableStatus = (
  { status: 'error', message: string } |
  { status: 'success', result: string }
);

export type NodeReference = {
  id: string,
  type: NodeType,
};

// Properties

export type PipelineProperty = (
  TextProperty |
  TranscriptProperty
);

type BasePropertyType = {
  id: string;
};

export type TextProperty = BasePropertyType & (
  Pick<TextNode,
    'type' |
    'content'
  >
);

export type TranscriptProperty = BasePropertyType & (
  Pick<TranscriptNode,
    'type' |
    'transcriptId'
  >
);

// Nodes

export type PipelineNode = (
  TextNode |
  OutputNode |
  OpenAiNode |
  TranscriptNode
);

type BaseNodeType = {
  id: string;
  name?: string;
  isProperty?: boolean;
  position: { x: number, y: number };
}

export type TextNode = BaseNodeType & {
  type: NodeType.TextNode;
  useTextbox?: boolean;
  content: string;
};

export type OutputNode = BaseNodeType & {
  type: NodeType.OutputNode;
  inputReference: null | NodeReference;
  inputReferences?: NodeReference[];
};

export type OpenAiNode = BaseNodeType & {
  type: NodeType.OpenAiNode;
  temperature: number;
  promptReference: null | NodeReference;
  contextReferences: NodeReference[];
};

export type TranscriptNode = BaseNodeType & {
  type: NodeType.TranscriptNode;
  transcriptId: string | null;
};
