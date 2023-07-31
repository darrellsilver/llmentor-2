import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const SPEAKERS_EXPECTED_OPTIONS = [
  { value: '0', name: 'Unknown' },
].concat(
  Array.from(new Array(10)).map((v, i) => ({
    value: (i + 1).toString(),
    name: (i + 1).toString(),
  }))
);

interface ExpectedSpeakersSelectProps {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function ExpectedSpeakersSelect({
  disabled,
  value,
  onChange,
}: ExpectedSpeakersSelectProps) {
  return (
    <Label className="mt-6 flex w-full flex-col">
      <p className="mb-3">
        Speakers Expected
      </p>
      <Select
        disabled={disabled}
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Analyzer" />
        </SelectTrigger>
        <SelectContent>
          {SPEAKERS_EXPECTED_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  )
}
