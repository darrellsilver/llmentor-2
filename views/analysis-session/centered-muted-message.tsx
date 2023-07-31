import { ReactNode } from 'react';

interface CenteredMutedMessageProps {
  children: ReactNode;
}

export function CenteredMutedMessage({
  children
}: CenteredMutedMessageProps) {
  return (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      {children}
    </div>
  )
}
