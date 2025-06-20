import Image from 'next/image';

// flavorToIcon 매핑
const flavorToIcon: Record<string, string> = {
  CHERRY: '/taste/cherry.svg',
  BERRY: '/taste/barry.svg',
  OAK: '/taste/oak.svg',
  VANILLA: '/taste/vanilla.svg',
  PEPPER: '/taste/pepper.svg',
  BREAD: '/taste/bread.svg',
  GRASS: '/taste/grass.svg',
  APPLE: '/taste/apple.svg',
  PEACH: '/taste/peach.svg',
  CITRUS: '/taste/citrus.svg',
  TROPICAL: '/taste/tropical.svg',
  MINERAL: '/taste/mineral.svg',
  FLORAL: '/taste/floral.svg',
  TOBACCO: '/taste/tobacco.svg',
  EARTHY: '/taste/earthy.svg',
  CHOCOLATE: '/taste/chocolate.svg',
  SPICE: '/taste/spice.svg',
  CARAMEL: '/taste/caramel.svg',
  LEATHER: '/taste/leather.svg',
};

const flavorLabel: Record<string, string> = {
  CHERRY: '체리',
  BERRY: '베리',
  OAK: '오크',
  VANILLA: '바닐라',
  PEPPER: '후추',
  BREAD: '제빵',
  GRASS: '풀',
  APPLE: '사과',
  PEACH: '복숭아',
  CITRUS: '시트러스',
  TROPICAL: '트로피컬',
  MINERAL: '미네랄',
  FLORAL: '꽃',
  TOBACCO: '담뱃잎',
  EARTHY: '흙',
  CHOCOLATE: '초콜릿',
  SPICE: '스파이스',
  CARAMEL: '카라멜',
  LEATHER: '가죽',
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
          <span className="text-lg">{flavorLabel[tag] ?? tag}</span>
        </div>
      ))}
    </div>
  );
}
