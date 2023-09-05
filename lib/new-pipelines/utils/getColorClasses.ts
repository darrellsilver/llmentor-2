export function getColorClasses(color: string) {
  switch (color) {
    case 'blue':
      return {
        bg: 'bg-blue-200 dark:bg-blue-900',
        text: "text-blue-900 dark:text-blue-300",
      }
    case 'purple':
      return {
        bg: 'bg-purple-200 dark:bg-purple-900',
        text: "text-purple-900 dark:text-purple-300",
      }
    case 'red':
      return {
        bg: 'bg-red-200 dark:bg-red-900',
        text: "text-red-900 dark:text-red-300",
      }
    case 'green':
      return {
        bg: 'bg-green-200 dark:bg-green-900',
        text: "text-green-900 dark:text-green-300",
      }
    default:
      return {
        bg: 'bg-gray-300 dark:bg-gray-900',
        text: "text-gray-700 dark:text-gray-300",
      }
  }
}
