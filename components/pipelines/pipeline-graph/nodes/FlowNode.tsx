import { Card } from '@/components/ui/card';
import { NodeProps } from 'reactflow';
import { ReactNode } from 'react';
import { PipelineNode } from '@/lib/pipelines/types';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { FileTextIcon, LucideIcon, TextCursorIcon } from 'lucide-react';

type BaseNodeProps = NodeProps & {
  title: string;
  pipelineNode?: PipelineNode | null;
  canBeProperty?: boolean;
  iconColor?: string;
  Icon?: LucideIcon;
  children: ReactNode;
}

export function FlowNode({
  title,
  pipelineNode,
  canBeProperty,
  iconColor = 'default',
  Icon,
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

  const iconClasses = getIconClasses(iconColor);

  return (
    <Card className={`h-full w-full ${selected ? 'border-blue-500' : ''}`}>
      <div className="flex items-center justify-start rounded-t-md bg-accent px-2 py-1">
        {Icon && (
          <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm ${iconClasses.container}`}>
            <Icon size={10} className={iconClasses.icon} />
          </div>
        )}
        <h3 className="flex-1 text-sm font-bold">
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

function getIconClasses(color: string) {
  switch (color) {
    case 'blue':
      return {
        container: 'bg-blue-200 dark:bg-blue-900',
        icon: "text-blue-900 dark:text-blue-400",
      }
    case 'purple':
      return {
        container: 'bg-purple-200 dark:bg-purple-900',
        icon: "text-purple-900 dark:text-purple-400",
      }
    case 'red':
      return {
        container: 'bg-red-200 dark:bg-red-900',
        icon: "text-red-900 dark:text-red-400",
      }
    default:
      return {
        container: 'bg-gray-300 dark:bg-gray-900',
        icon: "text-gray-700 dark:text-gray-300",
      }
  }
}
