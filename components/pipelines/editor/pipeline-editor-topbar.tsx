import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NodeType, Pipeline, PipelineNode } from '@/lib/pipelines/types';
import { Node } from 'reactflow';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getUuid } from '@/components/pipelines/common/getUuid';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type PipelineEditorTopbarProps = {
  pipeline: Pipeline;
  isDirty: boolean;
  onAddNode: (node: Node<PipelineNode>) => void;
  onSave: () => void;
  onToggleRunner: () => void;
  isRunnerOpen: boolean;
  isSaving: boolean;
  onSetTitle: (title: string) => void;
  onSetDescription: (description: string) => void;
}

export function PipelineEditorTopbar({
  pipeline,
  isDirty,
  onAddNode,
  onSave,
  onToggleRunner,
  isRunnerOpen,
  isSaving,
  onSetTitle,
  onSetDescription,
}: PipelineEditorTopbarProps) {
  const [ isEditorOpen, setIsEditorOpen ] = useState(false);

  function onClickAddTextNode() {
    console.log("Adding Text node...");

    const nodeType = NodeType.TextNode
    const nodeId = getUuid();
    const nodePosition = { x: 100, y: 250 };

    const node: Node<PipelineNode> = {
      id: `${nodeType}::${nodeId}`,
      type: nodeType,
      position: nodePosition,
      data: {
        type: nodeType,
        id: nodeId,
        position: nodePosition,
        content: '',
      }
    }

    onAddNode(node);
  }

  function onClickAddOutputNode() {
    console.log("Adding Output node...");

    const nodeType = NodeType.OutputNode
    const nodeId = getUuid();
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
    console.log("Adding OpenAi node...");

    const nodeType = NodeType.OpenAiNode
    const nodeId = getUuid();
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
    console.log("Adding Transcript node...");

    const nodeType = NodeType.TranscriptNode
    const nodeId = getUuid();
    const nodePosition = { x: 100, y: 250 };

    const node: Node<PipelineNode> = {
      id: `${nodeType}::${nodeId}`,
      type: nodeType,
      position: nodePosition,
      data: {
        type: nodeType,
        id: nodeId,
        position: nodePosition,
        transcriptId: null,
      }
    }

    onAddNode(node);
  }

  function onToggleEditor(open: boolean) {
    if (isEditorOpen && !pipeline.title) return;
    setIsEditorOpen(open);
  }

  function onClickSave() {
    onSave();
    setIsEditorOpen(false);
  }

  return (
    <Card className="flex h-[65px] w-full items-center justify-between border-b px-3">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`${buttonVariants({ variant: 'default' })} w-48`}
        >
          Add Node
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48"
        >
          <DropdownMenuItem onClick={onClickAddTextNode}>Text</DropdownMenuItem>
          <DropdownMenuItem onClick={onClickAddTranscriptNode}>Transcript</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onClickAddOpenAiNode}>OpenAi</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onClickAddOutputNode}>Output</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Popover open={isEditorOpen} onOpenChange={onToggleEditor}>
        <PopoverTrigger>
          <h1 className="text-xl font-bold">
            {pipeline.title || '[No Title]'}
          </h1>
        </PopoverTrigger>
        {isEditorOpen && (
          <PopoverContent className="w-96">
            <Input
              value={pipeline.title}
              onChange={e => onSetTitle(e.target.value)}
            />
            <Textarea
              className="mt-2"
              value={pipeline.description}
              onChange={e => onSetDescription(e.target.value)}
            />
            <Button
              className="mt-2 w-full"
              onClick={onClickSave}
              disabled={pipeline.title.length < 1}
            >
              Update
            </Button>
          </PopoverContent>
        )}
      </Popover>
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
          className="ml-2 w-32"
          variant="secondary"
          onClick={onToggleRunner}
        >
          {isRunnerOpen ? 'Close' : 'Open'} Runner
        </Button>
      </div>
    </Card>
  );
}
