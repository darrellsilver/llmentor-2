import { NewPipeline, NewPipelineNode } from '@/lib/new-pipelines/types';
import { Panel } from 'reactflow';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { usePipelineExtensionStore } from '@/lib/new-pipelines/ui/stores/usePipelineExtensionStore';
import { PipelineExtension } from '@/lib/new-pipelines/interfaces';

type PipelineDesignerFlowTopbarProps = {
  pipeline: NewPipeline;
  onAddNode: (node: NewPipelineNode) => void;
  onClickSave: () => void;
  isSaving: boolean;
  onToggleExecutor: () => void;
  isExecutorOpen: boolean;
};

export function PipelineDesignerFlowTopbar({
  pipeline,
  onAddNode,
  onClickSave,
  isSaving,
  onToggleExecutor,
  isExecutorOpen,
}: PipelineDesignerFlowTopbarProps) {
  return (
    <Panel
      className="w-full p-4"
      style={{ margin: 0 }}
      position={'top-left'}
    >
      <Card
        className="flex items-center justify-between p-3"
      >
        <AddNodeDropdown
          extensionIds={pipeline.extensionIds}
          onAddNode={onAddNode}
        />
        <PipelineName pipeline={pipeline} />
        <div className="flex w-56">
          <Button
            className="mr-2"
            variant="ghost"
            onClick={onClickSave}
            disabled={isSaving}
          >
            Save
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            onClick={onToggleExecutor}
          >
            {isExecutorOpen ? 'Close' : 'Open'} Runner
          </Button>
        </div>
      </Card>
    </Panel>
  );
}

type AddNodeDropdownProps = {
  extensionIds: string[];
  onAddNode: (node: NewPipelineNode) => void;
}

function AddNodeDropdown({
  extensionIds,
  onAddNode,
}: AddNodeDropdownProps) {
  const getExtension = usePipelineExtensionStore(state => state.getExtension);

  const extensions = extensionIds.reduce(
    (acc, curr) => {
      const extension = getExtension(curr);
      return extension ? [ ...acc, extension ] : acc;
    },
    [] as PipelineExtension[]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${buttonVariants({ variant: 'default' })} w-56`}
      >
        Add Node
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
      >
        {extensions.map((extension, idx) => (
          <AddNodeDropdownExtensionItems
            key={idx}
            extension={extension}
            onAddNode={onAddNode}
            renderSeparator={idx !== 0}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type AddNodeDropdownExtensionItemsProps = {
  extension: PipelineExtension;
  onAddNode: (node: NewPipelineNode) => void;
  renderSeparator: boolean,
};

function AddNodeDropdownExtensionItems({
  extension,
  onAddNode,
  renderSeparator,
}: AddNodeDropdownExtensionItemsProps) {
  function onClickAddNode(extensionId: string, type: string) {
    const node = extension.createNode(type);

    if (node === null) {
      console.warn(`Cannot add "${type}" node: Extension "${extensionId}" returned no node`);
      return;
    }

    onAddNode(node);
  }

  return (
    <>
      {renderSeparator && <DropdownMenuSeparator/>}
      <DropdownMenuLabel className="text-xs">{extension.name}</DropdownMenuLabel>
      {extension.nodeExtensions.map(nodeExtension => (
        <DropdownMenuItem
          key={nodeExtension.type}
          onClick={() => onClickAddNode(extension.id, nodeExtension.type)}
        >
          {nodeExtension.renderIcon()} {nodeExtension.name}
        </DropdownMenuItem>
      ))}
    </>
  )
}

type PipelineNameProps = {
  pipeline: NewPipeline;
}

function PipelineName({
  pipeline,
}: PipelineNameProps) {
  return (
    <div>
      <h1
        className="text-xl font-bold"
      >
        {pipeline.name}
      </h1>
    </div>
  )
}
