import { NewPipelineNode, NewPipelineNodeExecution } from '@/lib/new-pipelines/core/types';
import { PipelineExecutor } from '@/lib/new-pipelines/execution';

export interface IPipelineExtension<T extends NewPipelineNode> {
  id: string;
  createNode: (type: string) => T | null;
  renderNode(node: T, onNodeChange: (node: NewPipelineNode) => void): JSX.Element
  executeNode: (executor: PipelineExecutor, node: T) => Promise<NewPipelineNodeExecution>;
}
