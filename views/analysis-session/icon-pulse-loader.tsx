import { Badge } from '@/components/ui/badge';

interface IconPulseLoaderProps {
  Icon: JSX.Element;
  text: string;
}

export function IconPulseLoader({
  Icon,
  text
}: IconPulseLoaderProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Badge variant="secondary" className="mb-4 animate-pulse p-3">
        {Icon}
      </Badge>
      <p className="mb-10 text-lg font-bold text-accent-foreground">{text}</p>
    </div>
  );
}
