'use client';

import DetailCard from '@/components/card/detailCard';
import StarReview from '@/components/wineDetail/StarReview';
import { useEffect, useState } from 'react';
import { TasteData } from '@/types/tasteType';
import TasteSummary from '@/components/wineDetail/TasteSummary';
import FlavorTop3 from '@/components/wineDetail/FlavorTop3';
import ReviewCard from '@/components/card/ReviewCard';
import { ReviewResponse, ReviewsByWineId } from '@/lib/api/review';

// ✅ 테스트용 더미 리뷰 데이터
const dummyReviews: ReviewResponse[] = [
  {
    id: 1,
    rating: 5,
    lightBold: 9,
    smoothTannic: 7,
    drySweet: 3,
    softAcidic: 2,
    aroma: ['CHERRY', 'OAK'],
    content: '풍부한 향과 부드러운 타닌이 인상 깊었어요.',
    createdAt: '2025-06-18T12:00:00.000Z',
    updatedAt: '2025-06-18T12:00:00.000Z',
    user: {
      id: 1,
      nickname: '와인초보',
      image: '/user1.png',
    },
    isLiked: false,
    wineId: 1,
    teamId: 'team-a',
  },
  {
    id: 2,
    rating: 4,
    lightBold: 6,
    smoothTannic: 5,
    drySweet: 4,
    softAcidic: 3,
    aroma: ['CITRUS', 'CHERRY'],
    content: '가볍고 산뜻한 맛이에요.',
    createdAt: '2025-06-17T15:20:00.000Z',
    updatedAt: '2025-06-17T15:20:00.000Z',
    user: {
      id: 2,
      nickname: '레드마스터',
      image: '/user2.png',
    },
    isLiked: true,
    wineId: 1,
    teamId: 'team-a',
  },
];

export default function WinePage({ params }: { params: { wineId: string } }) {
  const wineId = Number(params.wineId);

  // 리뷰 리스트 상태 (서버에서 불러온 리뷰들 저장)
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

  // ⭐ 별점 통계 상태 (평균, 참여 수, 점수별 분포 저장)
  const [ratingData, setRatingData] = useState<{
    average: number;
    count: number;
    ratings: Record<number, number>;
  }>({
    average: 0,
    count: 0,
    ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  // 와인 맛 평균 데이터
  const [tasteSummary, setTasteSummary] = useState<TasteData>({
    body: 0,
    tannin: 0,
    sweetness: 0,
    acidity: 0,
  });

  // 와인 향 TOP3 데이터
  const [flavorTop3, setFlavorTop3] = useState<string[]>([]);

  // ⭐ 리뷰 데이터 기반 계산 수행
  useEffect(() => {
    // ✅ 더미 데이터 테스트용
    const fetchedReviews = dummyReviews;

    // ✅ 실제 API 사용 시 아래 코드 주석 해제
    // ReviewsByWineId(wineId).then((fetchedReviews) => {

    setReviews(fetchedReviews);

    const count = fetchedReviews.length;
    const average =
      count === 0
        ? 0
        : fetchedReviews.reduce((sum, r) => sum + r.rating, 0) / count; // 평균 별점 계산

    const ratings: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    fetchedReviews.forEach((r) => {
      ratings[r.rating] += 1; // 점수별 분포 계산
    });

    setRatingData({
      average: Number(average.toFixed(1)),
      count,
      ratings,
    });

    // 맛 요약 계산
    if (count > 0) {
      setTasteSummary({
        body: Math.round(
          fetchedReviews.reduce((sum, r) => sum + r.lightBold, 0) / count
        ),
        tannin: Math.round(
          fetchedReviews.reduce((sum, r) => sum + r.smoothTannic, 0) / count
        ),
        sweetness: Math.round(
          fetchedReviews.reduce((sum, r) => sum + r.drySweet, 0) / count
        ),
        acidity: Math.round(
          fetchedReviews.reduce((sum, r) => sum + r.softAcidic, 0) / count
        ),
      });
    }

    // 향 Top 3 계산
    const aromaCounts: Record<string, number> = {};
    fetchedReviews.forEach((r) => {
      r.aroma.forEach((aroma) => {
        aromaCounts[aroma] = (aromaCounts[aroma] || 0) + 1;
      });
    });

    const top3 = Object.entries(aromaCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([aroma]) => aroma);

    setFlavorTop3(top3);
    // ✅ 실제 API 사용 시 닫힌 괄호 주석 해제
    // });
  }, [wineId]);

  return (
    <main className="min-h-screen px-4 py-10 flex flex-col items-center bg-white">
      {/* ⭐ 와인 카드 */}
      <div className="relative w-full max-w-1140 h-200 md:h-260 lg:h-302 mb-30 lg:mb-16">
        <DetailCard />
      </div>

      {/* ⭐ 맛/향 요약 섹션 */}
      {tasteSummary && (
        <section className="w-full max-w-1140 mt-15 mb-20 px-4 md:px-0">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* 어떤 맛이 나나요? */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                어떤 맛이 나나요?
                <span className="text-sm text-gray-500 ml-2">
                  ({ratingData.count}명 참여)
                </span>
              </h3>
              <TasteSummary values={tasteSummary} readOnly />
            </div>

            {/* 어떤 향이 있나요? */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                어떤 향이 있나요?
                <span className="text-sm text-gray-500 ml-2">
                  ({ratingData.count}명 참여)
                </span>
              </h3>
              <FlavorTop3 flavors={flavorTop3} />
            </div>
          </div>
        </section>
      )}

      {/* 💻 PC: 리뷰 카드 + 별점 요약 나란히 */}
      <div className="mt-30 hidden lg:flex justify-between gap-30 w-full max-w-1140">
        {/* 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-10 w-800">
          <h3 className="text-2xl font-bold leading-8 tracking-normal text-gray-800 mb-20">
            리뷰 목록
          </h3>
          {/* {reviews.map((review) => (
            // 리뷰 데이터 전달
            <ReviewCard key={review.id} review={review} />
          ))} */}
          {[...Array(3)].map((_, idx) => (
            <ReviewCard key={idx} />
          ))}
        </div>

        {/* 별점 요약 */}
        <div className="sticky top-130 w-280 h-311 bg-none">
          <StarReview
            average={ratingData.average}
            count={ratingData.count}
            ratings={ratingData.ratings}
            wineId={wineId} // ✅ string → number 변환
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
          wineId={wineId}
        />

        {/* 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-6 md:space-y-8">
          <h3 className="text-2xl font-bold leading-8 tracking-normal text-gray-800 mb-20">
            리뷰 목록
          </h3>
          {/* {reviews.map((review) => (
            // 리뷰 데이터 전달
            <ReviewCard key={idx} review={review} />
          ))} */}
          {[...Array(3)].map((_, idx) => (
            <ReviewCard key={idx} />
          ))}
        </div>
      </div>
    </main>
  );
}
