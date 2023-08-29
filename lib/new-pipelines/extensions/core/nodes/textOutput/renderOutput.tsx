import ReactMarkdown from 'react-markdown';

import { CenteredMessage } from '@/views/analysis-session/centered-message';
import { Card } from '@/components/ui/card';

import { CoreTextOutputNode } from './types';

export function renderOutput(
  node: CoreTextOutputNode,
  value: string,
) {
  return (
    <div key={node.id}>
      <h4 className="mb-1 text-sm font-bold">{node.data.name}</h4>
      {value
        ? (
          <RenderOutput
            value={value}
            format={node.data.format}
          />
        ) : (
          <div className="mb-2 h-10 overflow-hidden rounded-md bg-accent">
            <CenteredMessage>
              No output
            </CenteredMessage>
          </div>
        )}
    </div>
  )
}

type RenderOutputProps = {
  value: string,
  format: 'text' | 'markdown' | 'code',
}

function RenderOutput({
  value,
  format,
}: RenderOutputProps) {
  switch(format) {
    case 'text':
      return (
        <Card className="mb-2 px-2.5 py-1.5">
          {value}
        </Card>
      );
    case 'markdown':
      return (
        <Card className="mb-2 px-2.5 py-1.5">
          <ReactMarkdown>
            {value}
          </ReactMarkdown>
        </Card>
      )
    case 'code':
      return (
        <Card className="mb-2 bg-accent px-2.5 py-1.5 font-mono text-sm">
          {value}
        </Card>
      )
  }

}
