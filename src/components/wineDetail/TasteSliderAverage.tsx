interface SliderProps {
  label: string;
  value: number;
  readOnly?: boolean;
}

export default function TasteSliderAverage({
  label,
  value,
  readOnly = false,
}: SliderProps) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        readOnly={readOnly}
        disabled={readOnly}
        className="w-full"
      />
    </div>
  );
}
