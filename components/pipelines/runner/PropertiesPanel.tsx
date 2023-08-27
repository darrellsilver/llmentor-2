import React from 'react';
import {
  NodeType,
  PipelineNode,
  PipelineProperty,
  TextNode,
  TextProperty,
  TranscriptNode, TranscriptProperty
} from '@/lib/pipelines/types';
import { Textarea } from '@/components/ui/textarea';
import { TranscriptSelect } from '@/components/pipelines/common';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

type PropertiesPanelProps = {
  properties: PipelineNode[] | PipelineProperty[],
  onRefreshProperties: () => void;
  onPropertyChange: (property: PipelineNode | PipelineProperty) => void;
  canRefresh: boolean;
}

export function PropertiesPanel({
  properties,
  onRefreshProperties,
  onPropertyChange,
  canRefresh = false,
}: PropertiesPanelProps) {
  return (
    <div className="h-full w-[300px] border-r bg-accent p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-bold">Properties</h2>
        {canRefresh && (
          <Button
            className="hover:bg-background"
            onClick={onRefreshProperties}
            variant="ghost"
          >
            <RefreshCwIcon height={18} />
          </Button>
        )}
      </div>

      {properties.map(property => {
        switch (property.type) {
          case NodeType.TextNode:
            return <TextPropertySetter key={property.id} property={property} onPropertyChange={onPropertyChange} />
          case NodeType.TranscriptNode:
            return <TranscriptPropertySetter key={property.id} property={property} onPropertyChange={onPropertyChange} />
          default:
            // TODO Add error state setter instead
            return <div key={property.id}></div>
        }
      })}
    </div>
  )
}

type TextPropertySetterProps = {
  property: TextNode | TextProperty,
  onPropertyChange: (property: PipelineNode | PipelineProperty) => void;
}

function TextPropertySetter({
  property,
  onPropertyChange,
}: TextPropertySetterProps) {
  function setContent(content: string) {
    onPropertyChange({
      ...property,
      content,
    });
  }

  return (
    <div className="w-full border-b pb-3 pt-2">
      <h3 className="mb-2 text-sm font-bold">
        {property.name || '[NoName]'}
      </h3>
      {property.useTextbox ? (
          <Textarea
          className="h-32 bg-background"
          value={property.content}
          onChange={e => setContent(e.target.value)}
        />
      ) : (
        <Input
          className="bg-background"
          value={property.content}
          onChange={e => setContent(e.target.value)}
        />
      )}
    </div>
  )
}

type TranscriptPropertySetterProps = {
  property: TranscriptNode | TranscriptProperty,
  onPropertyChange: (property: PipelineNode | PipelineProperty) => void;
}

function TranscriptPropertySetter({
  property,
  onPropertyChange,
}: TranscriptPropertySetterProps) {
  function setTranscriptId(transcriptId: string) {
    onPropertyChange({
      ...property,
      transcriptId,
    });
  }

  return (
    <div className="w-full border-b pb-3 pt-2">
      <h3 className="mb-2 text-sm font-bold">
        {property.name || '[NoName]'}
      </h3>
      <TranscriptSelect
        selectedTranscriptId={property.transcriptId}
        onTranscriptIdChange={setTranscriptId}
      />
    </div>
  )
}
