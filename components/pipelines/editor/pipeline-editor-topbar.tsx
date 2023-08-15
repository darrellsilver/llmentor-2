import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NodeType, Pipeline, PipelineNode } from '@/lib/pipelines/types';
import { Node } from 'reactflow';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type PipelineEditorTopbarProps = {
  pipeline: Pipeline;
  onAddNode: (node: Node<PipelineNode>) => void;
  onSave: () => void;
  onToggleRunner: () => void;
  isSaving: boolean;
}

export function PipelineEditorTopbar({
  pipeline,
  onAddNode,
  onSave,
  onToggleRunner,
  isSaving,
}: PipelineEditorTopbarProps) {
  const [ newTextNodeContent, setNewTextNodeContent ] = useState('')

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

          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={onClickAddOutputNode}
          >
            Add Output Node
          </Button>

          <div className="mt-4 border-t border-gray-200 dark:border-gray-800"/>

          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={onClickAddOpenAiNode}
          >
            Add OpenAi Node
          </Button>
        </PopoverContent>
      </Popover>
      <h1 className="text-xl font-bold">
        {pipeline.title}
      </h1>
      <div>
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
