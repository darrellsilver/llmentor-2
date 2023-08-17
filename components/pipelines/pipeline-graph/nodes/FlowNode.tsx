import { Card } from '@/components/ui/card';
import { NodeProps } from 'reactflow';
import { ReactNode } from 'react';
import { PipelineNode } from '@/lib/pipelines/types';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

type BaseNodeProps = NodeProps & {
  title: string;
  pipelineNode: PipelineNode | null;
  canBeProperty?: boolean;
  children: ReactNode;
}

export function FlowNode({
  title,
  pipelineNode,
  canBeProperty,
  selected,
  children,
}: BaseNodeProps) {
  const {
    setNode,
  } = usePipelineNodesStore(state => ({
    setNode: state.setNode,
  }));

  function setIsProperty(isProperty: boolean) {
    if (!pipelineNode) return;
    setNode({
      ...pipelineNode,
      isProperty,
    })
  }

  function setName(name: string) {
    if (!pipelineNode) return;
    setNode({
      ...pipelineNode,
      name,
    })
  }

  return (
    <Card className={`h-full w-full ${selected ? 'border-blue-500' : ''}`}>
      <div className="flex items-center justify-between rounded-t-md bg-accent px-2 py-1">
        <h3 className="text-sm font-bold dark:bg-blue-950">
          {title}
          {pipelineNode && pipelineNode.isProperty && ` - ${pipelineNode.name || '[NoName]'}`}
        </h3>
        {canBeProperty && pipelineNode && (
          <Switch checked={pipelineNode.isProperty} onCheckedChange={setIsProperty} />
        )}
      </div>
      <div className={`p-2`}>
        {pipelineNode && pipelineNode.isProperty && (
          <Input
            className="mb-2"
            placeholder="Name"
            value={pipelineNode.name}
            onChange={e => setName(e.target.value)}
          />
        )}
        {children}
      </div>
    </Card>
  )
}
