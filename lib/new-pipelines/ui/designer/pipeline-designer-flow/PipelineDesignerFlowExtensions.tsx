import { Background, BackgroundVariant, Controls, MiniMap } from 'reactflow';

export function PipelineDesignerFlowExtensions() {
  return (
    <>
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="gray"/>
    </>
  )
}
