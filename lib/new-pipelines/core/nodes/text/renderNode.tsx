import { NewPipelineNode, TextInputFormat } from '@/lib/new-pipelines/core/types';
import { PipelineFlowNodeProps, PipelineFlowNode } from '@/lib/new-pipelines/core/ui/PipelineFlowNode';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { CoreTextNode } from './types';
import { renderIcon } from './renderIcon';


type TextFlowNodeProps = PipelineFlowNodeProps<CoreTextNode>;

export function renderNode(
  node: CoreTextNode,
  onNodeChange: (node: NewPipelineNode) => void
) {
  return (
    <TextFlowNode node={node} onNodeChange={onNodeChange} />
  )
}

export function TextFlowNode({
 node,
 onNodeChange,
}: TextFlowNodeProps) {

  function onFormatChange(format: TextInputFormat) {
    onNodeChange && onNodeChange({
      ...node,
      data: { ...node.data, format},
    })
  }

  function onContentChange(content: string) {
    onNodeChange && onNodeChange({
      ...node,
      data: { ...node.data, content},
    })
  }

  return (
    <PipelineFlowNode
      className="w-72"
      node={node}
      name="Text"
      Icon={renderIcon()}
    >
      <FormatSelect
        value={node.data.format}
        onValueChange={onFormatChange}
      />
      <ContentEditor
        format={node.data.format}
        value={node.data.content}
        onValueChange={onContentChange}
      />
    </PipelineFlowNode>
  )
}

type FormatSelectProps = {
  value: TextInputFormat;
  onValueChange: (value: TextInputFormat) => void;
}

function FormatSelect({
  value,
  onValueChange,
}: FormatSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="mb-2">
        <SelectValue placeholder="Format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="input">Input</SelectItem>
        <SelectItem value="textarea">Textarea</SelectItem>
        <SelectItem value="code">Code</SelectItem>
      </SelectContent>
    </Select>
  );
}

type ContentEditorProps = {
  format: TextInputFormat;
  value: string;
  onValueChange: (value: string) => void;
}

function ContentEditor({
 format,
 value,
 onValueChange,
}: ContentEditorProps) {
  switch (format) {
    case 'input':
      return <Input
        className="w-full"
        type="text"
        value={value}
        onChange={e => onValueChange(e.target.value)}
      />
    case 'textarea':
      return <Textarea
        className="h-64 w-full"
        value={value}
        onChange={e => onValueChange(e.target.value)}
      />
    case 'code':
      return <Textarea
        className="h-64 bg-accent font-mono text-xs"
        value={value}
        onChange={e => onValueChange(e.target.value)}
      />
  }
}
