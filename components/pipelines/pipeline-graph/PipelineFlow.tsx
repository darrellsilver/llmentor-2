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
  Connection,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {
  OpenAiFlowNode,
  OutputFlowNode,
  TextFlowNode,
} from '@/components/pipelines/pipeline-graph/nodes';
import { Pipeline, PipelineNode } from '@/lib/pipelines/types';
import {
  getFlowDataFromPipelineNodes,
  getPipelineNodesFromFlowData
} from '@/components/pipelines/pipeline-graph/node-conversions';

import { PipelineEditorTopbar } from '@/components/pipelines/editor/pipeline-editor-topbar';
import { Card } from '@/components/ui/card';
import { PipelineRunner } from '@/components/pipelines/runner';
import { savePipeline } from '@/components/pipelines/api';

const nodeTypes = {
  OutputNode: OutputFlowNode,
  TextNode: TextFlowNode,
  OpenAiNode: OpenAiFlowNode,
}

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
  const [ isRunnerOpen, setIsRunnerOpen ] = useState(false);
  const [ isSaving, setIsSaving ] = useState(false);
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
  }

  async function toggleIsRunnerOpen() {
    setIsRunnerOpen(!isRunnerOpen);
  }

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        {isRunnerOpen && (
          <Panel position="top-right">
            <Card className="mt-20 h-[600px] w-[450px] p-4">
              <PipelineRunner pipeline={currentPipeline} />
            </Card>
          </Panel>
        )}

        <Panel
          className="w-full pr-8"
          position="top-left"
        >
          <PipelineEditorTopbar
            pipeline={pipeline}
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
