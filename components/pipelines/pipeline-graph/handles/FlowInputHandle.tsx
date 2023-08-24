import { Handle, Position } from 'reactflow';
import { ListIcon } from 'lucide-react';

type FlowInputHandleProps = {
  name: string;
  id: string;
  allowMultiple?: boolean;
}

export function FlowInputHandle({
  name,
  id,
  allowMultiple = false,
}: FlowInputHandleProps) {
  return (
    <div className="relative mt-1 w-full rounded-sm">
      <Handle className="absolute" position={Position.Left} type="source" id={id} style={{ left: -11, top: 9 }}/>
      <div className="flex items-center">
        {allowMultiple && <ListIcon className="mr-1" size={14} />}
        <span className="text-xs font-bold">{name}</span>
      </div>
    </div>
  )
}
