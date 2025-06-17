import { TasteData } from '@/types/tasteType';
import TasteSliderAverage from './TasteSliderAverage';

interface TasteSliderInputProps {
  values: TasteData;
  readOnly?: boolean;
}

export default function TasteSummary({
  values,
  readOnly = false,
}: TasteSliderInputProps) {
  return (
    <div className="space-y-4">
      {/* 각 슬라이더 항목에 readOnly 전달 */}
      <TasteSliderAverage
        label="바디감"
        value={values.body}
        readOnly={readOnly}
      />
      <TasteSliderAverage
        label="타닌"
        value={values.tannin}
        readOnly={readOnly}
      />
      <TasteSliderAverage
        label="당도"
        value={values.sweetness}
        readOnly={readOnly}
      />
      <TasteSliderAverage
        label="산미"
        value={values.acidity}
        readOnly={readOnly}
      />
    </div>
  );
}
