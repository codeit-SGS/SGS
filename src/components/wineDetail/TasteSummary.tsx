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
    <div className="flex flex-col justify-center space-y-6">
      <TasteSliderAverage
        label="바디감"
        value={values.body}
        leftLabel="가벼워요"
        rightLabel="진해요"
        readOnly={readOnly}
      />
      <TasteSliderAverage
        label="타닌"
        value={values.tannin}
        leftLabel="부드러워요"
        rightLabel="떫어요"
        readOnly={readOnly}
      />
      <TasteSliderAverage
        label="당도"
        value={values.sweetness}
        leftLabel="드라이해요"
        rightLabel="달아요"
        readOnly={readOnly}
      />
      <TasteSliderAverage
        label="산미"
        value={values.acidity}
        leftLabel="안 셔요"
        rightLabel="많이 셔요"
        readOnly={readOnly}
      />
    </div>
  );
}
