import { LucideIcon, TextCursorIcon } from 'lucide-react';

export function getRenderIcon(Icon: LucideIcon, color: string) {
  const iconClasses = getIconClasses(color);

  return function RenderIcon() {
    return (
      <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm ${iconClasses.container}`}>
        <Icon size={10} className={iconClasses.icon} />
      </div>
    )
  }
}

function getIconClasses(color: string) {
  switch (color) {
    case 'blue':
      return {
        container: 'bg-blue-200 dark:bg-blue-950',
        icon: "text-blue-900 dark:text-blue-300",
      }
    case 'purple':
      return {
        container: 'bg-purple-200 dark:bg-purple-950',
        icon: "text-purple-900 dark:text-purple-300",
      }
    case 'red':
      return {
        container: 'bg-red-200 dark:bg-red-950',
        icon: "text-red-900 dark:text-red-300",
      }
    case 'green':
      return {
        container: 'bg-green-200 dark:bg-green-950',
        icon: "text-green-900 dark:text-green-300",
      }
    default:
      return {
        container: 'bg-gray-300 dark:bg-gray-900',
        icon: "text-gray-700 dark:text-gray-300",
      }
  }
}
