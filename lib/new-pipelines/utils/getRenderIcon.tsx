import { LucideIcon } from 'lucide-react';
import { getColorClasses } from '@/lib/new-pipelines/utils/getColorClasses';

export function getRenderIcon(Icon: LucideIcon, color: string) {
  const { bg, text } = getColorClasses(color);

  return function RenderIcon() {
    return (
      <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm ${bg}`}>
        <Icon size={10} className={text} />
      </div>
    )
  }
}
