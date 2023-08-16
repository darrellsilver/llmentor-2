import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NodeType, Pipeline, PipelineNode } from '@/lib/pipelines/types';
import { Node } from 'reactflow';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { v4 } from 'uuid';
import { TranscriptList } from '@/components/pipelines/api/fetchTranscriptList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type PipelineEditorTopbarProps = {
  pipeline: Pipeline;
  transcripts: TranscriptList,
  isDirty: boolean;
  onAddNode: (node: Node<PipelineNode>) => void;
  onSave: () => void;
  onToggleRunner: () => void;
  isSaving: boolean;
}

export function PipelineEditorTopbar({
  pipeline,
  transcripts,
  isDirty,
  onAddNode,
  onSave,
  onToggleRunner,
  isSaving,
}: PipelineEditorTopbarProps) {
  const [ newTextNodeContent, setNewTextNodeContent ] = useState('')
  const [ transcriptId, setTranscriptId ] = useState('')

  function onClickAddTextNode() {
    if (!newTextNodeContent) return;

    console.log("Adding text node...");

    const nodeType = NodeType.TextNode
    const nodeId = Math.random().toString();
    const nodePosition = { x: 100, y: 250 };

    const node: Node<PipelineNode> = {
      id: `${nodeType}::${nodeId}`,
      type: nodeType,
      position: nodePosition,
      data: {
        type: nodeType,
        id: nodeId,
        position: nodePosition,
        content: newTextNodeContent,
      }
    }

    onAddNode(node);

    setNewTextNodeContent('')
  }

  function onClickAddOutputNode() {
    console.log("Adding output node...");

    const nodeType = NodeType.OutputNode
    const nodeId = Math.random().toString();
    const nodePosition = { x: 100, y: 250 };

    const node: Node<PipelineNode> = {
      id: `${nodeType}::${nodeId}`,
      type: nodeType,
      position: nodePosition,
      data: {
        type: nodeType,
        id: nodeId,
        position: nodePosition,
        inputReference: null,
      }
    }

    onAddNode(node);
  }

  function onClickAddOpenAiNode() {
    console.log("Adding output node...");

    const nodeType = NodeType.OpenAiNode
    const nodeId = Math.random().toString();
    const nodePosition = { x: 100, y: 250 };

    const node: Node<PipelineNode> = {
      id: `${nodeType}::${nodeId}`,
      type: nodeType,
      position: nodePosition,
      data: {
        type: nodeType,
        id: nodeId,
        position: nodePosition,
        temperature: 1,
        contextReferences: [],
        promptReference: null,
      }
    }

    onAddNode(node);
  }

  function onClickAddTranscriptNode() {
    if (!transcriptId) return;

    console.log("Adding transcript node...");

    const nodeType = NodeType.TranscriptNode
    const nodeId = v4();
    const nodePosition = { x: 100, y: 250 };

    const node: Node<PipelineNode> = {
      id: `${nodeType}::${nodeId}`,
      type: nodeType,
      position: nodePosition,
      data: {
        type: nodeType,
        id: nodeId,
        position: nodePosition,
        transcriptId: transcriptId,
      }
    }

    onAddNode(node);
  }

  return (
    <Card className="flex h-[65px] w-full items-center justify-between border-b px-3">
      <Popover>
        <PopoverTrigger className={`${buttonVariants({ variant: 'default' })} w-48`}>
          Add Node
        </PopoverTrigger>
        <PopoverContent>
          <Textarea
            value={newTextNodeContent}
            onChange={e => setNewTextNodeContent(e.target.value)}
          />
          <Button
            className="mt-2 w-full"
            variant="outline"
            onClick={onClickAddTextNode}
          >
            Add Text Node
          </Button>

          <div className="mt-4 border-t border-gray-200 dark:border-gray-800"/>

          <Select
            value={transcriptId}
            onValueChange={setTranscriptId}
          >
            <SelectTrigger className="mt-4 w-full">
              <SelectValue placeholder="Transcript" />
            </SelectTrigger>
            <SelectContent>
              {(transcripts || []).map(({ id }) => (
                <SelectItem key={id} value={id}>
                  {id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={onClickAddTranscriptNode}
          >
            Add Transcript Node
          </Button>

          <div className="mt-4 border-t border-gray-200 dark:border-gray-800"/>

          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={onClickAddOpenAiNode}
          >
            Add OpenAi Node
          </Button>

          <div className="mt-4 border-t border-gray-200 dark:border-gray-800"/>

          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={onClickAddOutputNode}
          >
            Add Output Node
          </Button>

        </PopoverContent>
      </Popover>
      <h1 className="text-xl font-bold">
        {pipeline.title}
      </h1>
      <div className="flex items-center">
        <div className={`mr-2 h-2 w-2 rounded-full ${isDirty ? 'bg-red-500' : ''}`}>&nbsp;</div>
        <Button
          className="w-16"
          variant="ghost"
          disabled={isSaving}
          onClick={onSave}
        >
          Save
        </Button>

        <Button
          className="ml-2"
          variant="secondary"
          onClick={onToggleRunner}
        >
          Toggle Runner
        </Button>
      </div>
    </Card>
  );
}
