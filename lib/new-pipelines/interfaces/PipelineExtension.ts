import {
  NewPipelineInputNode,
  NewPipelineNode,
  NewPipelineNodeExecution,
  NewPipelineOutputNode
} from '@/lib/new-pipelines/types';
import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces/PipelineNodeExtension';

export interface IPipelineExtension<T extends NewPipelineNode> {
  id: string;
  createNode: (type: string) => T | null;
  renderNode(node: T, onNodeChange: (node: NewPipelineNode) => void): JSX.Element | null;
  renderInputNode(node: NewPipelineInputNode, value: any, onValueChange: (value: any) => void): JSX.Element | null;
  renderOutputNode(node: NewPipelineOutputNode, value: any): JSX.Element | null;
  executeNode: (executor: PipelineExecutor, node: T) => Promise<NewPipelineNodeExecution>;
}

export abstract class PipelineExtensionBase<T extends NewPipelineNode> implements IPipelineExtension<T> {
  abstract id: string;
  abstract name: string;

  abstract nodeExtensions: IPipelineNodeExtension<T>[];

  createNode(type: string): T | null {
    return this.getNodeExtension(type)?.createNode() || null;
  }

  renderNode(node: T, onNodeChange: (node: NewPipelineNode) => void): JSX.Element | null {
    return this.getNodeExtension(node.type)?.renderNode(node, onNodeChange) || null;
  }

  renderInputNode(node: NewPipelineInputNode, value: any, onValueChange: (value: any) => void): JSX.Element | null {
    const renderInput = this.getNodeExtension(node.type)?.renderInput;
    return renderInput ? renderInput(node, value, onValueChange) : null;
  }

  renderOutputNode(node: NewPipelineOutputNode, value: any): JSX.Element | null {
    const renderOutput = this.getNodeExtension(node.type)?.renderOutput;
    return renderOutput ? renderOutput(node, value) : null;
  }

  async executeNode(executor: PipelineExecutor, node: T): Promise<NewPipelineNodeExecution> {
    // Return an error if the node extension isn't found
    return (
      this.getNodeExtension(node.type)?.executeNode(executor, node) ||
      executor.getNodeErrorExecution(node, `Could not find node extension for type "${node.type}"`)
    );
  }

  getNodeExtension(type: string) {
    return this.nodeExtensions.find(nodeExtension => nodeExtension.type === type) || null
  }
}

export abstract class PipelineExtension extends PipelineExtensionBase<NewPipelineNode> { }
