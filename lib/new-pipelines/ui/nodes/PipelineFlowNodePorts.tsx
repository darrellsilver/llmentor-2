import { InputPort, OutputPort } from '@/lib/new-pipelines/types';
import { Handle, Position } from 'reactflow';
import { ListIcon } from 'lucide-react';

type PipelineFlowNodePortsProps = {
  inputs: never[] | InputPort<string, string>[];
  outputs: never[] | OutputPort<string, string>[];
}

export function PipelineFlowNodePorts({
  inputs,
  outputs,
  children,
}: React.PropsWithChildren<PipelineFlowNodePortsProps>) {
  return (
    <div className="flex justify-between border-t px-2 pb-2 pt-1">
      {inputs.length > 0 && (
        <div>
          {inputs.map(input => (
            <FlowInputHandle
              key={input.name}
              input={input}
            />
          ))}
        </div>
      )}
      {children || <div />}
      {outputs.length > 0 && (
        <div>
          {outputs.map(output => (
            <FlowOutputHandle
              key={output.name}
              output={output}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type FlowInputHandleProps = {
  input: InputPort<string, string>;
}

export function FlowInputHandle({
  input
}: FlowInputHandleProps) {
  // console.log(input);
  return (
    <div className="relative mt-1 w-full rounded-sm">
      <Handle className="absolute" position={Position.Left} type="source" id={input.name} style={{ left: -11, top: 9 }}/>
      <div className="flex items-center">
        {input.allowMultiple && <ListIcon className="mr-1" size={14} />}
        <span className="text-xs font-bold">{input.name}</span>
      </div>
    </div>
  )
}

type FlowOutputHandleProps = {
  output: OutputPort<string, string>;
}

export function FlowOutputHandle({
 output,
}: FlowOutputHandleProps) {
  return (
    <div className="relative mt-1 w-full rounded-sm">
      <Handle className="absolute" position={Position.Right} type="target" id={output.name} style={{ right: -11, top: 9 }}/>
      <div className="flex items-center justify-end">
        <span className="ml-1 text-xs font-bold">{output.name}</span>
      </div>
    </div>
  )
}
