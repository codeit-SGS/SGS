import Image from 'next/image';

// flavorToIcon 매핑
const flavorToIcon: Record<string, string> = {
  체리: '/taste/cherry.svg',
  베리: '/taste/barry.svg',
  오크: '/taste/oak.svg',
  바닐라: '/taste/vanilla.svg',
  후추: '/taste/pepper.svg',
  제빵: '/taste/bread.svg',
  풀: '/taste/grass.svg',
  사과: '/taste/apple.svg',
  복숭아: '/taste/peach.svg',
  시트러스: '/taste/citrus.svg',
  트로피컬: '/taste/tropical.svg',
  미네랄: '/taste/mineral.svg',
  꽃: '/taste/flower.svg',
  담뱃잎: '/taste/tobacco.svg',
  흙: '/taste/earthy.svg',
  초콜릿: '/taste/chocolate.svg',
  스파이스: '/taste/spice.svg',
  카라멜: '/taste/caramel.svg',
  가죽: '/taste/leather',
};

export default function FlavorTop3({ flavors }: { flavors: string[] }) {
  return (
    <div className="flex gap-4 flex-wrap">
      {flavors.map((tag) => (
        <div
          key={tag}
          className="flex flex-col items-center justify-center mt-30 w-170 h-154 border border-gray-300 rounded-lg bg-white text-gray-500 font-medium"
        >
          <div className="mb-2">
            <Image
              src={flavorToIcon[tag] ?? '/icons/default.svg'}
              alt={tag}
              width={40}
              height={40}
            />
          </div>
          <span className="text-lg">{tag}</span>
        </div>
      ))}
    </div>
  );
}
