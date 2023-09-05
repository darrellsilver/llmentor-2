import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

import { NewPipeline, NewPipelineExecution, NewPipelineNode } from '@/lib/new-pipelines/types';

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
  onUpdatePipeline: (pipeline: NewPipeline) => void;
  onSavePipeline: (pipeline: NewPipeline) => void;
  isSaving: boolean;
  onToggleExecutor: () => void;
  isExecutorOpen: boolean;
  onExecutePipeline: (pipeline: NewPipeline, input: { [key: string]: any }) => void;
  execution: NewPipelineExecution | null;
  onSaveExecution: (execution: NewPipelineExecution) => void;
  isExecuting: boolean;
}

const nodeTypes = {
  'pipelineNode': PipelineDesignerFlowNode,
}

export function PipelineDesignerFlow({
  pipeline,
  onUpdatePipeline,
  onSavePipeline,
  isSaving,
  onToggleExecutor,
  isExecutorOpen,
  onExecutePipeline,
  isExecuting,
  onSaveExecution,
  execution,
}: PipelineDesignerFlowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useSetPipelineEffect(pipeline, setNodes, setEdges)

  const onConnect = useOnConnect(edges, setEdges);

  function onExecute(input: { [key: string]: any }) {
    onExecutePipeline(buildPipeline(), input);
  }

  function onClickSave() {
    onSavePipeline(buildPipeline());
  }

  function buildAndSetPipeline() {
    onUpdatePipeline(buildPipeline())
  }

  function buildPipeline() {
    return {
      ...pipeline,
      nodes: getPipelineNodes(nodes, edges),
    }
  }

  function onClickToggleExecutor() {
    // Build the pipeline if opening the executor, so the view is updated
    if (!isExecutorOpen) {
      buildAndSetPipeline()
    }
    onToggleExecutor();
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
        onToggleExecutor={onClickToggleExecutor}
        isExecutorOpen={isExecutorOpen}
      />
      <PipelineDesignerFlowExecutor
        isOpen={isExecutorOpen}
        onRefresh={buildAndSetPipeline}
        onExecute={onExecute}
        isExecuting={isExecuting}
        execution={execution}
        onSaveExecution={onSaveExecution}
        pipeline={pipeline}
      />
      <PipelineDesignerFlowExtensions />
    </ReactFlow>
  );
}
