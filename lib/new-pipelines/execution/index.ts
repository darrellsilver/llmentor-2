import {
  NewPipeline,
  NewPipelineExecution,
  NewPipelineNode,
  NewPipelineNodeExecution,
  NewPipelineNodeExecutionBase, NewPipelineOutputNode,
  NodeOutputObjectBase,
  PipelineNodeRef,
} from '@/lib/new-pipelines/types';
import { PipelineExtension } from '@/lib/new-pipelines/interfaces';
import { getExtensions } from '@/lib/new-pipelines/extensions';
import { isOutputNode } from '@/lib/new-pipelines/utils';
import { getUuid } from '@/components/pipelines/common/getUuid';

export class PipelineExecutor {
  pipeline: NewPipeline;
  extensions: { [key: string]: PipelineExtension } = { };

  input: { [key: string]: any } = { };
  output: { [key: string]: any } = { };
  nodeExecutions: NewPipelineNodeExecution[] = [];

  constructor(pipeline: NewPipeline) {
    this.pipeline = pipeline;
    this.registerExtensionIds(pipeline.extensionIds);
  }

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
    return this.input[key];
  }

  setOutput(key: string, value: any) {
    this.output[key] = value;
    return value;
  }

  async execute(input: { [key: string]: any }): Promise<NewPipelineExecution> {
    this.input = input;
    this.nodeExecutions = [];
    this.output = { };

    const outputNodes = this.getOutputNodes(this.pipeline);

    for (const outputNode of outputNodes) {
      const nodeExecution = await this.executeNode(outputNode);
      if (nodeExecution.status === 'error') {
        return this.getPipelineErrorExecution(nodeExecution.message);
      }
    }

    return this.getPipelineSuccessExecution();
  }

  getOutputNodes(pipeline: NewPipeline) {
    return pipeline.nodes.filter(isOutputNode);
  }

  async executeNode(node: NewPipelineNode): Promise<NewPipelineNodeExecution> {
    // Return an existing execution if possible
    const existingExecution = this.getExistingNodeExecution(node);
    if (existingExecution !== null) return existingExecution;

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

  getExistingNodeExecution(node: NewPipelineNode) {
    return this.nodeExecutions.find(nodeExecution => (
      node.extension === nodeExecution.nodeRef.extension &&
      node.type === nodeExecution.nodeRef.type &&
      node.id === nodeExecution.nodeRef.id
    )) || null
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
      id: getUuid(),
      pipeline: this.pipeline,
      input: this.input,
      nodeExecutions: this.nodeExecutions,
      status: 'error',
      message,
    }
  }

  getPipelineSuccessExecution(): NewPipelineExecution {
    return {
      id: getUuid(),
      pipeline: this.pipeline,
      input: this.input,
      nodeExecutions: this.nodeExecutions,
      status: 'success',
      output: this.output,
    }
  }

  getNodeErrorExecution<Node extends NewPipelineNode>(
    node: Node,
    message: string
  ): NewPipelineNodeExecutionBase<Node> {
    return {
      nodeRef: this.nodeToNodeRef(node),
      status: 'error',
      message,
    }
  }

  getOutputNodeSuccessExecution<Node extends NewPipelineOutputNode>(
    node: Node,
    output: NodeOutputObjectBase<Node>,
    outputValue: any,
  ) {
    this.setOutput(node.id, outputValue)
    return this.getNodeSuccessExecution(node, output);
  }

  getNodeSuccessExecution<Node extends NewPipelineNode>(
    node: Node,
    output: NodeOutputObjectBase<Node>
  ): NewPipelineNodeExecutionBase<Node> {
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

