'use client';

import DetailCard from '@/components/card/detailCard';
import Image from 'next/image';
import StarReview from '@/components/wineDetail/StarReview';
import { useEffect, useState } from 'react';
import { TasteData } from '@/types/tasteType';
import TasteSummary from '@/components/wineDetail/TasteSummary';
import FlavorTop3 from '@/components/wineDetail/FlavorTop3';

export default function WinePage({ params }: { params: { wineId: string } }) {
  const wineId = Number(params.wineId);

  // 와인 맛 평균 데이터 (예시로 사용)
  const [tasteSummary, setTasteSummary] = useState<TasteData | null>(null);

  // 화인 향 TOP3 데이터 (예시로 사용)
  const [flavorTop3, setFlavorTop3] = useState<string[]>([]);

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

  // 평균 맛 & 향 top3 데이터 불러오기
  useEffect(() => {
    fetch(`/api/wine/${wineId}/taste-summary`)
      .then((res) => res.json())
      .then(setTasteSummary);
    fetch(`/api/wine/${wineId}/flavor-top3`)
      .then((res) => res.json())
      .then(setFlavorTop3);
  }, [wineId]);

  return (
    <main className="min-h-screen px-4 py-10 flex flex-col items-center bg-white">
      {/* ⭐ 와인 카드 */}
      <div className="relative w-full max-w-1140 h-200 md:h-260 lg:h-302 mb-30 lg:mb-16">
        <DetailCard />
      </div>

      {/* ⭐ 맛/향 요약 섹션 */}
      {tasteSummary && (
        <section className="w-full max-w-1140 mt-20 mb-20 px-4 md:px-0">
          {/* 맛 */}
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            어떤 맛이 나나요?
            <span className="text-sm text-gray-500 ml-2">(47명 참여)</span>
          </h3>
          <TasteSummary values={tasteSummary} readOnly />

          {/* 향 */}
          <div className="mt-12">
            <FlavorTop3 flavors={flavorTop3} />
          </div>
        </section>
      )}

      {/* 💻 PC: 리뷰 카드 + 별점 요약 나란히 */}
      <div className="hidden lg:flex justify-between gap-30 w-full max-w-1140">
        {/* 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-10 w-800">
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
