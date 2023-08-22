import { Handle, Position } from 'reactflow';

type FlowOutputHandleProps = {
  name: string;
  id: string;
  allowMultiple?: boolean;
}

export function FlowOutputHandle({
  name,
  id,
}: FlowOutputHandleProps) {
  return (
    <div className="relative mt-1 w-full rounded-sm p-1">
      <Handle className="absolute" position={Position.Right} type="target" id={id} style={{ right: -11, top: 12 }}/>
      <div className="flex items-center justify-end">
        <span className="ml-1 text-xs font-bold">{name}</span>
      </div>
    </div>
  )
}
