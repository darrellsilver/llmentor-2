import { NewPipelineNode } from '@/lib/new-pipelines/types';
import { PipelineFlowNode } from '@/lib/new-pipelines/ui/nodes/PipelineFlowNode';
import { Input } from '@/components/ui/input';

import { CoreTextOutputNode } from './types'
import { getRenderIcon } from '@/lib/new-pipelines/utils';
import { TextCursor } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const renderIcon = getRenderIcon(TextCursor, 'red');

export function renderNode(
  node: CoreTextOutputNode,
  onNodeChange: (node: NewPipelineNode) => void
) {
  function onNameChange(name: string) {
    const newNode: CoreTextOutputNode = {
      ...node,
      data: { ...node.data, name },
    };
    onNodeChange && onNodeChange(newNode)
  }

  function onFormatChange(format: TextOutputFormat) {
    const newNode: CoreTextOutputNode = {
      ...node,
      data: { ...node.data, format },
    };
    onNodeChange && onNodeChange(newNode)
  }

  return (
    <PipelineFlowNode
      className="min-w-72"
      node={node}
      name={`Text Output: ${node.data.name || '[No Name]'}`}
      Icon={renderIcon()}
    >
      <NameInput
        value={node.data.name}
        onValueChange={onNameChange}
      />
      <FormatSelect
        format={node.data.format}
        onFormatChange={onFormatChange}
      />
    </PipelineFlowNode>
  )
}

type NameInputProps = {
  value: string;
  onValueChange: (value: string) => void;
}

function NameInput({
  value,
  onValueChange,
}: NameInputProps) {
  return (
    <Input
      className="mb-2 w-full"
      type="text"
      placeholder="Name"
      value={value}
      onChange={e => onValueChange(e.target.value)}
    />
  )
}

type TextOutputFormat = 'text' | 'markdown' | 'code';

type FormatSelectProps = {
  format: TextOutputFormat,
  onFormatChange: (format: TextOutputFormat) => void;
}

function FormatSelect({
  format,
  onFormatChange,
}: FormatSelectProps) {
  return (
    <Select value={format} onValueChange={onFormatChange}>
      <SelectTrigger className="mb-2">
        <SelectValue placeholder="Format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="text">Text</SelectItem>
        <SelectItem value="markdown">Markdown</SelectItem>
        <SelectItem value="code">Code</SelectItem>
      </SelectContent>
    </Select>
  );
}
