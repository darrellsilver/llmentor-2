import {
  NewPipelineNode,
  NewPipelineNodeExecution
} from '@/lib/new-pipelines/core/types';
import { PipelineExecutor } from '@/lib/new-pipelines/execution';
import { IPipelineNodeExtension } from '@/lib/new-pipelines/interfaces';

import { CoreNode, nodeExtensions } from './nodes';

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

export interface IPipelineExtension<T extends NewPipelineNode> {
  id: string;

  nodeExtensions: IPipelineNodeExtension<T>[];

  createNode: (type: string) => T | null;
  renderNode(node: T, onNodeChange: (node: NewPipelineNode) => void): JSX.Element | null;
  executeNode: (executor: PipelineExecutor, node: T) => Promise<NewPipelineNodeExecution>;
}

export class CorePipelineExtension extends PipelineExtensionBase<CoreNode> {
  id = 'core';
  name = 'Core'

  nodeExtensions: IPipelineNodeExtension<NewPipelineNode>[] = nodeExtensions;
}

export const coreExtension = new CorePipelineExtension();
