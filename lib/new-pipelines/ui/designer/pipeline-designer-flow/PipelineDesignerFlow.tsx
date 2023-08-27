import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

import { NewPipeline, NewPipelineExecution, NewPipelineNode } from '@/lib/new-pipelines/core/types';

import { PipelineDesignerFlowExtensions } from './PipelineDesignerFlowExtensions';
import { PipelineDesignerFlowNode } from './PipelineDesignerFlowNode';
import { useOnConnect, useSetPipelineEffect } from './hooks';
import {
  PipelineDesignerFlowTopbar
} from '@/lib/new-pipelines/ui/designer/pipeline-designer-flow/PipelineDesignerFlowTopbar';
import { getFlowNode } from '@/lib/new-pipelines/ui/utils/getFlowNodes';
import { usePipelineNodeStore } from '@/lib/new-pipelines/ui/stores/usePipelineNodeStore';
import { getPipelineNodes } from '@/lib/new-pipelines/ui/utils';
import {
  PipelineDesignerFlowExecutor
} from '@/lib/new-pipelines/ui/designer/pipeline-designer-flow/PipelineDesignerFlowExecutor';

type PipelineDesignerFlowProps = {
  pipeline: NewPipeline;
  onSavePipeline: (pipeline: NewPipeline) => void;
  isSaving: boolean;
  onToggleExecutor: () => void;
  isExecutorOpen: boolean;
  onExecutePipeline: (pipeline: NewPipeline, input: { [key: string]: any }) => void;
  execution: NewPipelineExecution | null;
  isExecuting: boolean;
}

const nodeTypes = {
  'pipelineNode': PipelineDesignerFlowNode,
}

export function PipelineDesignerFlow({
  pipeline,
  onSavePipeline,
  isSaving,
  onToggleExecutor,
  isExecutorOpen,
  onExecutePipeline,
  isExecuting,
  execution,
}: PipelineDesignerFlowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useSetPipelineEffect(pipeline, setNodes, setEdges)

  const onConnect = useOnConnect(edges, setEdges);

  function onClickExecute(input: { [key: string]: any }) {
    onExecutePipeline(buildPipeline(), input);
  }

  function onClickSave() {
    onSavePipeline(buildPipeline());
  }

  function buildPipeline() {
    return {
      ...pipeline,
      nodes: getPipelineNodes(nodes, edges),
    }
  }

  const onAddNode = (node: NewPipelineNode) => {
    usePipelineNodeStore.getState().setNode(node);
    setNodes([ ...nodes, getFlowNode(node) ])
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
    >
      <PipelineDesignerFlowTopbar
        pipeline={pipeline}
        onAddNode={onAddNode}
        onClickSave={onClickSave}
        isSaving={isSaving}
        onToggleExecutor={onToggleExecutor}
        isExecutorOpen={isExecutorOpen}
        onClickExecute={onClickExecute}
        isExecuting={isExecuting}
      />
      <PipelineDesignerFlowExecutor
        isOpen={isExecutorOpen}
        onClickExecute={onClickExecute}
        isExecuting={isExecuting}
        execution={execution}
        pipeline={pipeline}
      />
      <PipelineDesignerFlowExtensions />
    </ReactFlow>
  );
}
