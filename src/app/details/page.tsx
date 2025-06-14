'use client';

import DetailCard from '@/components/card/detailCard';
import Image from 'next/image';
import StarReview from '@/components/wineDetail/StarReview';

export default function WinePage() {
  const ratingData = {
    average: 4.8,
    count: 5446,
    ratings: {
      5: 3000,
      4: 1800,
      3: 400,
      2: 200,
      1: 46,
    },
  };

  return (
    <main className="min-h-screen px-4 py-10 flex flex-col items-center bg-gray-50">
      {/* ⭐ 와인 카드 */}
      <div className="relative w-full max-w-[1140px] h-[200px] md:h-[260px] lg:h-[302px] mb-10 lg:mb-16">
        <DetailCard />
      </div>

      {/* 💻 PC: 리뷰 카드 + 별점 요약 나란히 */}
      <div className="hidden lg:flex justify-between gap-[30px] w-full max-w-[1140px]">
        {/* 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-10 w-[800px]">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="relative w-full h-[260px] xl:h-[481px]">
              <Image
                src="/page/review.png"
                alt={`Review ${idx + 1}`}
                fill
                className="rounded-xl shadow-md object-cover"
              />
            </div>
          ))}
        </div>

        {/* 별점 요약 */}
        <div className="sticky top-[130px] w-[280px] h-[311px]">
          <StarReview {...ratingData} />
        </div>
      </div>

      {/* 📱📱 모바일/태블릿 전용: 별점 먼저 → 리뷰 카드들 */}
      <div className="flex flex-col gap-10 w-full max-w-[1140px] lg:hidden">
        {/* 별점 요약 */}
        <StarReview {...ratingData} />

        {/* 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-6 md:space-y-8">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="relative w-full h-[200px] md:h-[260px]">
              <Image
                src="/page/review.png"
                alt={`Review ${idx + 1}`}
                fill
                className="rounded-xl shadow-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
