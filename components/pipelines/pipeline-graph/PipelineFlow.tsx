'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Panel,
  Node,
  Edge,
  Connection, NodeChange, OnNodesChange, OnEdgesChange,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { nodeTypes } from '@/components/pipelines/pipeline-graph/nodes';
import { Pipeline, PipelineNode, PipelineRunnable } from '@/lib/pipelines/types';
import {
  getFlowDataFromPipelineNodes,
  getPipelineNodesFromFlowData
} from '@/components/pipelines/pipeline-graph/node-conversions';

import { PipelineEditorTopbar } from '@/components/pipelines/editor/pipeline-editor-topbar';
import { Card } from '@/components/ui/card';
import { RunningStatus, PipelineRunner } from '@/components/pipelines/runner';
import { savePipeline, runPipeline } from '@/components/pipelines/api';
import { TranscriptList } from '@/components/pipelines/api/fetchTranscriptList';
import { usePipelineNodesStore } from '@/components/pipelines/stores';


type PipelineGraphProps = {
  pipeline: Pipeline;
}

const singleConnectionPorts = [
  { type: 'OutputNode', handle: 'input' },
  { type: 'OpenAiNode', handle: 'prompt' },
]

function shouldClearEdges(edge: Edge) : boolean {
  const edgeSource = edge.source.split('::')[0];
  const edgeSourceHandle = edge.sourceHandle;

  for (const port of singleConnectionPorts) {
    if (port.type === edgeSource && port.handle === edgeSourceHandle) return true;
  }

  return false;
}

export function PipelineFlow({
  pipeline,
}: PipelineGraphProps) {
  const [ currentPipeline, setCurrentPipeline ] = useState(pipeline);
  // TODO Find out how to derive this accurately (the onNodes/EdgesChange callbacks don't work for this)
  const [ isDirty, setIsDirty ] = useState(false);
  const [ isSaving, setIsSaving ] = useState(false);
  const [ isRunnerOpen, setIsRunnerOpen ] = useState(false);
  const [ runningStatus, setRunningStatus ] = useState<RunningStatus>('inactive')
  const [ runResult, setRunResult ] = useState('')

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const {
      initialNodes,
      initialEdges,
    } = getFlowDataFromPipelineNodes(pipeline.nodes);

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [pipeline.nodes, setEdges, setNodes])

  const onConnect = useCallback(
    (newEdge: Edge | Connection) => {
      const newEdges = shouldClearEdges(newEdge as Edge)
        ? edges.filter(edge => {
          return edge.source !== newEdge.source || edge.sourceHandle !== newEdge.sourceHandle
        })
        : edges;

      setEdges(addEdge(newEdge, newEdges));
    },
    [edges, setEdges]
  );

  function onAddNode(node: Node<PipelineNode>) {
    // Add the node to the store
    usePipelineNodesStore.getState().setNode(node.data);

    setNodes([...nodes, node]);
  }

  async function onSave() {
    if (isSaving) return;

    console.log('Save requested');

    setIsSaving(true);

    const newPipeline = {
      ...currentPipeline,
      nodes: getPipelineNodesFromFlowData(nodes, edges),
    }

    setCurrentPipeline(newPipeline);
    await savePipeline(newPipeline);

    setIsSaving(false);
    setIsDirty(false);
  }

  const onNodesChangePatched: OnNodesChange = (changes) => {
    onNodesChange(changes);
    setIsDirty(true);
  }

  const onEdgesChangePatched: OnEdgesChange = (changes) => {
    onEdgesChange(changes);
    setIsDirty(true);
  }

  async function toggleIsRunnerOpen() {
    setIsRunnerOpen(!isRunnerOpen);
  }

  async function onClickRun () {
    setRunResult('');
    setRunningStatus('running');

    // Send the pipeline instead of the saved one
    const pipelineToRun = {
      ...currentPipeline,
      nodes: getPipelineNodesFromFlowData(nodes, edges),
    }

    const response = await runPipeline(pipelineToRun);

    if (response.status === 'success') {
      setRunResult(response.result);
      setRunningStatus('success');
    } else {
      setRunResult(response.message);
      setRunningStatus('error');
    }
  }

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangePatched}
        onEdgesChange={onEdgesChangePatched}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        {isRunnerOpen && (
          <Panel position="top-right">
            <Card className="mt-20 h-[600px] w-[450px] p-4">
              <PipelineRunner
                pipeline={currentPipeline}
                status={runningStatus}
                result={runResult}
                onClickRun={onClickRun}
              />
            </Card>
          </Panel>
        )}

        <Panel
          className="w-full pr-8"
          position="top-left"
        >
          <PipelineEditorTopbar
            pipeline={currentPipeline}
            isDirty={isDirty}
            onAddNode={onAddNode}
            onSave={onSave}
            onToggleRunner={toggleIsRunnerOpen}
            isSaving={isSaving}
          />
        </Panel>

        <Controls />

        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="gray"/>
      </ReactFlow>
    </>
  );
}
