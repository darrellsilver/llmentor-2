import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalyzerSelectProps {
  disabled: boolean;
  options: { value: string, name: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function AnalyzerSelect({
  options,
  disabled,
  value,
  onChange,
}: AnalyzerSelectProps) {
  return (
    <Select
      disabled={disabled}
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Analyzer" />
      </SelectTrigger>
      <SelectContent>
        {options.map(analyzer => (
          <SelectItem key={analyzer.value} value={analyzer.value}>{analyzer.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
