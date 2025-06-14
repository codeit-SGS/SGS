// FlavorTagSelector.tsx
interface FlavorTagSelectorProps {
  value: string[]; // 외부 상태로부터 받은 선택된 향
  onChange: (value: string[]) => void; // 외부 상태를 업데이트할 함수
}

const FLAVORS = [
  '체리',
  '베리',
  '오크',
  '바닐라',
  '후추',
  '제빵',
  '풀',
  '사과',
  '복숭아',
  '시트러스',
  '트로피컬',
  '미네랄',
  '꽃',
  '담뱃잎',
  '흙',
  '초콜릿',
  '스파이스',
  '카라멜',
  '가죽',
];

export default function FlavorTagSelector({
  value,
  onChange,
}: FlavorTagSelectorProps) {
  const toggleTag = (tag: string) => {
    const isSelected = value.includes(tag);

    let updated: string[];
    if (isSelected) {
      updated = value.filter((t) => t !== tag);
    } else {
      if (value.length >= 6) return;
      updated = [...value, tag];
    }

    onChange(updated);
  };

  return (
    <div className="space-y-2 pt-40">
      <p className="py-[10] font-pretendard font-bold text-xl leading-8 tracking-normal">
        기억에 남는 향이 있나요?
      </p>

      <div className="w-[476px] h-[214px] py-20 space-y-2.5">
        {FLAVORS.map((tag) => {
          const isActive = value.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`w-hug h-hug px-18 py-10 m-3 text-lg leading-26 rounded-full border transition
                ${
                  isActive
                    ? 'bg-main text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {value.length >= 6 && (
        <p className="text-md text-red-500 absolute right-30 bottom-100">
          최대 6개까지만 선택할 수 있어요.
        </p>
      )}
    </div>
  );
}
