'use client';

import DetailCard from '@/components/card/detailCard';
import Image from 'next/image';
import StarReview from '@/components/wineDetail/StarReview';

export default function WinePage({ params }: { params: { wineId: string } }) {
  const wineId = Number(params.wineId);

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
    <main className="min-h-screen px-4 py-10 flex flex-col items-center bg-white">
      {/* ⭐ 와인 카드 */}
      <div className="relative w-full max-w-1140 h-200 md:h-260 lg:h-302 mb-30 lg:mb-16">
        <DetailCard />
      </div>

      {/* 💻 PC: 리뷰 카드 + 별점 요약 나란히 */}
      <div className="hidden lg:flex justify-between gap-30 w-full max-w-1140">
        {/* 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-10 w-[800px]">
          <h3 className="text-2xl font-bold leading-8 tracking-normal text-gray-800 mb-20">
            리뷰 목록
          </h3>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="relative w-full h-260 xl:h-481">
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
        <div className="sticky top-130 w-280 h-311 bg-none">
          <StarReview
            average={ratingData.average}
            count={ratingData.count}
            ratings={ratingData.ratings}
            wineId={Number(params.wineId)} // ✅ string → number 변환
          />
        </div>
      </div>

      {/* 📱📱 모바일/태블릿 전용: 별점 먼저 → 리뷰 카드들 */}
      <div className="flex flex-col gap-10 w-full max-w-1140 lg:hidden">
        {/* 별점 요약 */}
        <StarReview
          average={ratingData.average}
          count={ratingData.count}
          ratings={ratingData.ratings}
          wineId={wineId} // ✅ string → number 변환
        />

        {/* 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-6 md:space-y-8">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="relative w-full h-200 md:h-260">
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
