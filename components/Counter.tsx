export default function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  return <span><span data-counter={value}>{value}</span>{suffix && <em>{suffix}</em>}</span>;
}
