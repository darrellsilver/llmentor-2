import { NewPipelineOutputNode } from '@/lib/new-pipelines/types';
import { usePipelineExtensionStore } from '@/lib/new-pipelines/ui/stores/usePipelineExtensionStore';

type OutputNodeProps = {
  node: NewPipelineOutputNode,
  value: any;
}

export function OutputNode({
  node,
  value,
}: OutputNodeProps) {
  const extension = usePipelineExtensionStore(state => state.getExtension(node.extension));
  return extension ? extension.renderOutputNode(node, value) : null;
}
