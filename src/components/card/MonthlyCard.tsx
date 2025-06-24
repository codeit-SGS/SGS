'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MonthlyCardProps {
  id?: number;
  name?: string;
  image?: string;
  avgRating?: number;
}

const MonthlyCard = ({ id, name, image, avgRating }: MonthlyCardProps) => {
  const router = useRouter();

  // 안전한 디폴트 처리
  const displayName = name ?? '이름 없음';
  const displayImage = image ?? '/wine/wine-type1.svg';
  const safeRating =
    typeof avgRating === 'number' && !isNaN(avgRating) ? avgRating : 0;
  const fullStars = Math.max(0, Math.min(5, Math.round(safeRating)));

  // 카드 클릭시 상세페이지 이동
  const handleClick = () => {
    if (id) {
      router.push(`/reviews/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col w-full max-w-232 min-h-185 rounded-[12px] bg-white cursor-pointer ml-15 shadow-subtle transition"
    >
      <div className="flex pt-24 pr-30">
        <div className="relative w-full px-30 overflow-hidden">
          {/* 와인 이미지 */}
          <Image
            src={displayImage}
            alt="와인 이미지"
            className="absolute -bottom-10 w-full h-full max-w-44 left-1/2 -translate-x-1/2 object-cover"
            width={44}
            height={161}
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="relative flex flex-col justify-between pb-18 gap-5 min-w-100">
          <div className="text-left gap-5">
            <p className="text-[36px] text-gray-800 font-bold">
              {safeRating.toFixed(1)}
            </p>
            <div className="flex flex-col">
              <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                  <Image
                    key={i}
                    src="/icon/purple-star.svg"
                    alt="별점"
                    width={18}
                    height={18}
                  />
                ))}
                {[...Array(5 - fullStars)].map((_, i) => (
                  <Image
                    key={i}
                    src="/icon/star.svg"
                    alt="빈 별"
                    width={18}
                    height={18}
                  />
                ))}
              </div>
            </div>
          </div>
          <h3 className="text-12 text-gray-500 leading-25 text-overflow-line3">{displayName}</h3>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCard;
