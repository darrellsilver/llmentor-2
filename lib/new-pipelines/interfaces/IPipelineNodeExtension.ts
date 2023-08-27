import {
  NewPipelineNode,
  NewPipelineNodeExecution,
} from '@/lib/new-pipelines/core/types';
import { PipelineExecutor } from '@/lib/new-pipelines/execution';

export interface IPipelineNodeExtension<T extends NewPipelineNode> {
  type: string;
  name: string;
  createNode(): T;
  renderIcon(): JSX.Element | null;
  renderNode(node: T, onNodeChange: (node: NewPipelineNode) => void): JSX.Element | null;
  executeNode(executor: PipelineExecutor, node: T): Promise<NewPipelineNodeExecution>;
}
