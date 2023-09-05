import { ReactNode } from 'react';

interface CenteredMutedMessageProps {
  className?: string;
  children: ReactNode;
}

export function CenteredMessage({
  className,
  children,
}: CenteredMutedMessageProps) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center text-muted-foreground ${className}`}>
      {children}
    </div>
  )
}
