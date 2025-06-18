import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const PurpleSlider = styled(Slider)({
  color: '#F2F4F8',
  height: 5,
  padding: 0,
  '& .MuiSlider-thumb': {
    width: 12,
    height: 12,
    backgroundColor: '#6A42DB',
    border: 'none',
    '@media (min-width: 744px)': {
      width: 16,
      height: 16,
    },
  },
  '& .MuiSlider-track': {
    backgroundColor: '#F2F4F8',
    opacity: 1,
    border: '1px solid #CFDBEA',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#F2F4F8',
    opacity: 1,
    border: '1px solid #CFDBEA',
  },
});

interface SliderProps {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  readOnly?: boolean;
}

export default function TasteSliderAverage({
  label,
  value,
  leftLabel,
  rightLabel,
  readOnly = false,
}: SliderProps) {
  return (
    <div className="flex items-center gap-6 p-10">
      {/* 왼쪽: 라벨 (예: 바디감) */}
      <div className="w-53 h-25 mr-10 rounded bg-gray-100 text-center text-gray-500 font-semibold">
        {label}
      </div>

      {/* 가운데: 왼쪽 설명 + 슬라이더 + 오른쪽 설명 */}
      <div className="flex-1 flex items-center gap-2">
        {/* 왼쪽 설명 */}
        <span className="text-lg mr-20 text-black text-left w-56 whitespace-nowrap">
          {leftLabel}
        </span>

        {/* 슬라이더 */}
        <PurpleSlider
          value={value}
          min={1}
          max={10}
          disabled={readOnly}
          sx={{ width: 311 }}
        />

        {/* 오른쪽 설명 */}
        <span className="text-lg ml-10 text-black w-56 text-right whitespace-nowrap">
          {rightLabel}
        </span>
      </div>
    </div>
  );
}
