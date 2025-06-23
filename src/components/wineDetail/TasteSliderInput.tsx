'use client';

interface SliderField {
  id: 'body' | 'tannin' | 'sweetness' | 'acidity';
  label: string;
  left: string;
  right: string;
}

const sliders: SliderField[] = [
  { id: 'body', label: '바디감', left: '가벼워요', right: '진해요' },
  { id: 'tannin', label: '타닌', left: '부드러워요', right: '떫어요' },
  { id: 'sweetness', label: '당도', left: '드라이해요', right: '달아요' },
  { id: 'acidity', label: '산미', left: '안셔요', right: '많이셔요' },
];

interface SliderInputProps {
  values: {
    body: number;
    tannin: number;
    sweetness: number;
    acidity: number;
  };
  onChange: (key: keyof SliderInputProps['values'], value: number) => void;
}

export default function TasteSliderInput({
  values,
  onChange,
}: SliderInputProps) {
  return (
    <div className="space-y-6 pt-20">
      <p className="text-xl mb-10 pt-10 font-bold text-gray-800">
        와인의 맛은 어땠나요?
      </p>

      {sliders.map(({ id, label, left, right }) => (
        <div
          key={id}
          className="w-full h-[26] py-10 flex justify-between items-center gap-20"
        >
          {/* 라벨 */}
          <div className="w-54 h-25 rounded-[6px] text-center text-sm px-2 py-1 gap-10 bg-gray-100 text-[var(--color-gray-400)] font-semibold whitespace-nowrap">
            {label}
          </div>

          {/* 왼쪽 텍스트 */}
          <span className="text-lg font-semibold text-gray-800 whitespace-nowrap w-[60px] text-left">
            {left}
          </span>

          {/* 슬라이더 */}
          <input
            type="range"
            min={1}
            max={10}
            value={typeof values[id] === 'number' ? values[id] : 5}
            onChange={(e) => onChange(id, Number(e.target.value))}
            className="w-260 h-16 border border-gray-300 accent-[var(--color-main)]"
          />

          {/* 오른쪽 텍스트 */}
          <span className="text-lg font-semibold text-gray-800 whitespace-nowrap w-[60px] text-right">
            {right}
          </span>
        </div>
      ))}
    </div>
  );
}
