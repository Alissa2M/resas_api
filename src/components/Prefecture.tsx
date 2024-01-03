export interface PrefectureProps {
  label: string;
  value: string; // numberかも
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
}

export default function Prefecture({ label, value, checked, onChange }: PrefectureProps) {
  return (
    <label htmlFor={value}>
      <input
        type="checkbox"
        aria-label="checkbox"
        id={value}
        checked={checked}
        onChange={() => onChange(value, !checked)}
      />
      {label}
    </label>
  );
}
