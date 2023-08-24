import { Panel } from 'reactflow';
import { Card } from '@/components/ui/card';
import { PipelineRunner, RunningStatus } from '@/components/pipelines/runner/pipeline-runner';
import React, { useEffect, useState } from 'react';
import { Pipeline, PipelineNode, PipelineProperty } from '@/lib/pipelines/types';
import { PropertiesPanel } from '@/components/pipelines/runner/PropertiesPanel';
import { usePipelineNodesStore } from '@/components/pipelines/stores';

type PipelineRunnerPanelProps = {
  isOpen: boolean;
  pipeline: Pipeline;
  status: RunningStatus;
  result: string;
  onRun: (properties: PipelineProperty[]) => void;
}

export function PipelineRunnerPanel({
  isOpen,
  status,
  result,
                                      onRun,
}: PipelineRunnerPanelProps) {
  const [ properties, setProperties ] = useState<PipelineNode[]>(
    usePipelineNodesStore
      .getState()
      .getPropertyNodes()
      .sort((a, b) => a.position.y - b.position.y)
  );

  // Force a refresh when opening the panel
  useEffect(() => {
    if (isOpen) {
      refreshProperties();
    }
  }, [isOpen]);

  function refreshProperties() {
    const propertyNodes = usePipelineNodesStore.getState().getPropertyNodes();

    const newProperties = propertyNodes.map(propertyNode => {
      const existing = properties.find(p => propertyNode.type === p.type && propertyNode.id === p.id);

      // Update some node properties
      if (existing) {
        existing.name = propertyNode.name;
        existing.position = propertyNode.position;
        return existing
      }

      // Return the new node by default
      return propertyNode;
    }).sort((a, b) => a.position.y - b.position.y);

    setProperties(newProperties);
  }


  function updateProperty(newProperty: PipelineNode) {
    setProperties(properties.map(property =>
      property.type === newProperty.type && property.id === newProperty.id
        ? newProperty
        : property
    ))
  }

  function onClickRun() {
    // TODO transform these properly
    onRun(properties as PipelineProperty[]);
  }

  return (
    <>
      {isOpen && (
        <Panel position="top-right">
          <Card className={`mt-20 flex h-[600px] w-[750px] overflow-hidden`}>
            <PropertiesPanel
              properties={properties}
              onRefreshProperties={refreshProperties}
              onPropertyChange={updateProperty}
            />
            <div className="flex-1 p-4">
              <PipelineRunner
                status={status}
                result={result}
                onClickRun={onClickRun}
              />
            </div>
          </Card>
        </Panel>
      )}
    </>
  )
}
