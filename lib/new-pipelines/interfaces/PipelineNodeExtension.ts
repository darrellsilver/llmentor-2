import {
  NewPipelineInputNode,
  NewPipelineNode,
  NewPipelineNodeExecution, NewPipelineNodeExecutionBase, NewPipelineOutputNode,
} from '@/lib/new-pipelines/types';
import { PipelineExecutor } from '@/lib/new-pipelines/execution';

export interface IPipelineNodeExtension<T extends NewPipelineNode> {
  type: string;
  name: string;
  createNode(): T;
  renderIcon(): JSX.Element | null;
  renderNode(node: T, onNodeChange: (node: NewPipelineNode) => void): JSX.Element | null;
  executeNode(executor: PipelineExecutor, node: T): Promise<NewPipelineNodeExecutionBase<T>>;
  renderInput?: (node: NewPipelineInputNode, value: any, onValueChange: (value: any) => void) => JSX.Element;
  renderOutput?: (node: NewPipelineOutputNode, value: any) => JSX.Element;
}
