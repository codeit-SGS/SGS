'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface WineCardProps {
  id?: number;
  name?: string;
  region?: string;
  price?: number;
  image?: string;
  avgRating?: number;
  reviewCount?: number;
  recentReview?: string;
  type?: string; // ← 이 줄을 추가하세요!
}

const WineCard = ({
  id,
  name = '와인 이름 없음',
  region = '지역 정보 없음',
  price = 0,
  image = '/wine/wine-type1.svg',
  avgRating = 0,
  reviewCount = 0,
  recentReview = '등록된 후기가 없습니다.',
}: WineCardProps) => {
  const router = useRouter();
  const fullStars = Math.max(0, Math.min(5, Math.round(avgRating)));

  const handleClick = () => {
    if (id) {
      router.push(`/reviews/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col w-full max-w-800 rounded-[16px] bg-white border border-gray-300 cursor-pointer"
    >
      <div className="flex pt-36.5 pr-50">
        <div className="relative w-full max-w-200 pt-40 mr-20">
          <img
            src={image}
            alt="와인 이미지"
            className="absolute bottom-0 w-full h-full max-w-60 left-1/2 -translate-x-1/2 object-cover"
          />
        </div>
        <div className="relative flex flex-col justify-between flex-1">
          <div className="flex justify-between items-start">
            <div className="max-w-300">
              <h3 className="text-3xl font-bold text-gray-800 leading-42 pb-20">
                {name}
              </h3>
              <p className="text-16 text-gray-500 leading-26 pb-16">{region}</p>
              <div className="inline-block text-18 font-bold py-8 px-15 rounded-[12px] bg-main-10 text-main mb-23.5">
                ₩ {price.toLocaleString()}
              </div>
            </div>

            <div className="text-left">
              <p className="text-[48px] text-gray-800 gap-10 font-bold">
                {avgRating.toFixed(1)}
              </p>
              <div className="flex flex-col gap-10 items-start">
                <div className="flex">
                  {[...Array(fullStars)].map((_, i) => (
                    <Image
                      key={i}
                      src="/icon/purple-star.svg"
                      alt={`별${i}`}
                      width={24}
                      height={24}
                    />
                  ))}
                  {[...Array(5 - fullStars)].map((_, i) => (
                    <Image
                      key={i}
                      src="/icon/star.svg"
                      alt={`빈 별${i}`}
                      width={24}
                      height={24}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-14 leading-24">
                  {reviewCount}개의 후기
                </span>
              </div>
            </div>

            <div className="absolute bottom-23.5 right-0">
              <Image
                src="/icon/right.svg"
                alt="오른쪽 화살표 아이콘"
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-full text-16 gap-10 py-20 px-60 border-t border-gray-300">
        <p className="font-semibold text-gray-800 mb-10">최신 후기</p>
        <p className="text-gray-500 leading-26">{recentReview}</p>
      </div>
    </div>
  );
};

export default WineCard;
