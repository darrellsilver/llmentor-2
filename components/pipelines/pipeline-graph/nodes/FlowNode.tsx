import { Card } from '@/components/ui/card';
import { NodeProps } from 'reactflow';
import { ReactNode } from 'react';

type BaseNodeProps = NodeProps & {
  title: string;
  children: ReactNode;
}

export function FlowNode({
  title,
  children,
  selected,
}: BaseNodeProps) {
  return (
    <Card className={`max-w-[400px] ${selected ? 'border-blue-500' : ''}`}>
      <h3 className="rounded-t-md bg-gray-100 px-2 py-1 text-sm font-bold dark:bg-blue-950">{title}</h3>
      <div className={`p-2 px-4`}>
        {children}
      </div>
    </Card>
  )
}
