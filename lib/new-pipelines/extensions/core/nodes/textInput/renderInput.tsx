import { NewPipelineInputNode } from '@/lib/new-pipelines/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function renderInput(
  node: NewPipelineInputNode,
  value: string,
  onValueChange: (value: string) => void
) {
  return (
    <Label>
      <div className="mb-2 ml-0.5 font-bold">
        {node.data.name}
      </div>
      {node.data.description && (
        <div className="mb-2 ml-0.5 text-sm font-medium text-muted-foreground">
          {node.data.description}
        </div>
      )}
      <Input
        className="mb-4"
        placeholder={node.data.name}
        value={value || ''}
        onChange={e => onValueChange(e.target.value)}
      />
    </Label>
  )
}
