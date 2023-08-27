import {
  NewPipeline,
  NewPipelineExecution,
  NewPipelineNode,
  NewPipelineNodeExecution,
  PipelineNodeRef,
} from '@/lib/new-pipelines/core/types';
import { PipelineExtension } from '@/lib/new-pipelines/core/extensions';
import { getExtensions } from '@/lib/new-pipelines/extensions';

export class PipelineExecutor {
  extensions: { [key: string]: PipelineExtension } = { };

  pipeline: null | NewPipeline = null;
  input: { [key: string]: any } = { };
  output: { [key: string]: any } = { };
  nodeExecutions: NewPipelineNodeExecution[] = [];

  registerExtensionIds(extensionIds: string[]) {
    return this.registerExtensions(getExtensions(extensionIds));
  }

  registerExtensions(extensions: PipelineExtension[]) {
    for (const extension of extensions) {
      this.registerExtension(extension)
    }
    return this;
  }

  registerExtension(extension: PipelineExtension) {
    this.extensions[extension.id] = extension;
    return this;
  }

  unregisterExtension(extension: PipelineExtension) {
    this.unregisterExtensionId(extension.id);
    return this;
  }

  unregisterExtensionId(extensionId: string) {
    delete this.extensions[extensionId];
    return this;
  }

  getInput(key: string) {
    return this.input[key] || null;
  }

  setOutput(key: string, value: any) {
    this.output[key] = value;
    return value;
  }

  async execute(pipeline: NewPipeline, input: { [key: string]: any }): Promise<NewPipelineExecution> {
    this.pipeline = pipeline;
    this.input = input;
    this.nodeExecutions = [];
    this.output = { };

    const outputNodes = this.pipeline.nodes.filter(node => node.tag === 'output');

    for (const outputNode of outputNodes) {
      const nodeExecution = await this.executeNode(outputNode);
      if (nodeExecution.status === 'error') {
        return this.getPipelineErrorExecution(nodeExecution.message);
      }
    }

    return this.getPipelineSuccessExecution();
  }

  async executeNode(node: NewPipelineNode): Promise<NewPipelineNodeExecution> {
    const extension = this.extensions[node.extension] || null;

    if (extension == null) {
      return {
        nodeRef: node,
        status: 'error',
        message: `No extension found for "${node.extension}"`
      }
    }

    const nodeExecution = await extension.executeNode(this, node);

    this.nodeExecutions.push(nodeExecution);

    return nodeExecution;
  }

  getNode(nodeRef: PipelineNodeRef): NewPipelineNode | null {
    return this.pipeline?.nodes.find(node => (
      node.extension === nodeRef.extension &&
      node.type === nodeRef.type &&
      node.id === nodeRef.id
    )) || null;
  }

  getPipelineErrorExecution(message: string): NewPipelineExecution {
    if (this.pipeline === null) {
      throw new Error('No pipeline set, cannot create pipeline execution')
    }

    return {
      pipeline: this.pipeline,
      input: this.input,
      nodeExecutions: this.nodeExecutions,
      status: 'error',
      message,
    }
  }

  getPipelineSuccessExecution(): NewPipelineExecution {
    if (this.pipeline === null) {
      throw new Error('No pipeline set, cannot create pipeline execution')
    }

    return {
      pipeline: this.pipeline,
      input: this.input,
      nodeExecutions: this.nodeExecutions,
      status: 'success',
      output: this.output,
    }
  }

  getNodeErrorExecution(node: NewPipelineNode, message: string): NewPipelineNodeExecution {
    return {
      nodeRef: this.nodeToNodeRef(node),
      status: 'error',
      message,
    }
  }

  getNodeSuccessExecution(node: NewPipelineNode, output: { [key: string]: any }): NewPipelineNodeExecution {
    return {
      nodeRef: this.nodeToNodeRef(node),
      status: 'success',
      output,
    }
  }

  nodeToNodeRef(node: NewPipelineNode): PipelineNodeRef {
    return {
      extension: node.extension,
      type: node.type,
      id: node.id,
    };
  }
}

