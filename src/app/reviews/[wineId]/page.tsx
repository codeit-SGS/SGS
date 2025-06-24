'use client';

import { use, useCallback, useEffect, useState } from 'react';
import DetailCard from '@/components/card/DetailCard';
import StarReview from '@/components/wineDetail/StarReview';
import { TasteData } from '@/types/tasteType';
import TasteSummary from '@/components/wineDetail/TasteSummary';
import FlavorTop3 from '@/components/wineDetail/FlavorTop3';
import ReviewCard from '@/components/card/ReviewCard';
import {
  getWineData,
  WineDetail,
  ReviewResponse,
  getReview,
} from '@/lib/api/review';
import ReviewPagination from '@/components/ui/ReviewPagination';

export default function WinePage({
  params,
}: {
  params: Promise<{ wineId: string; name: string }>;
}) {
  const resolvedParams = use(params);
  const wineId = Number(resolvedParams.wineId);

  const [wine, setWine] = useState<WineDetail | null>(null);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [ratingData, setRatingData] = useState<{
    average: number;
    count: number;
    ratings: Record<number, number>;
  }>({
    average: 0,
    count: 0,
    ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [tasteSummary, setTasteSummary] = useState<TasteData>({
    body: 0,
    tannin: 0,
    sweetness: 0,
    acidity: 0,
  });
  const [flavorTop3, setFlavorTop3] = useState<string[]>([]);
  const REVIEWS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const paginatedReviews = reviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE
  );
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 1. useCallback으로 fetchReviews를 먼저 선언
  const fetchReviews = useCallback(() => {
    getReview(wineId).then((fetchedReviews) => {
      if (!Array.isArray(fetchedReviews)) {
        console.error('❌ fetchedReviews가 배열이 아님!', fetchedReviews);
        return;
      }

      setReviews(fetchedReviews);

      const count = fetchedReviews.length;
      const average =
        count === 0
          ? 0
          : fetchedReviews.reduce((sum, r) => sum + r.rating, 0) / count;

      const ratings: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      fetchedReviews.forEach((r) => {
        ratings[r.rating] += 1;
      });

      setRatingData({
        average: Number(average.toFixed(1)),
        count,
        ratings,
      });

      if (count > 0) {
        setTasteSummary({
          body: Math.round(
            fetchedReviews.reduce((sum, r) => sum + (r.lightBold ?? 0), 0) /
              count
          ),
          tannin: Math.round(
            fetchedReviews.reduce((sum, r) => sum + (r.smoothTannic ?? 0), 0) /
              count
          ),
          sweetness: Math.round(
            fetchedReviews.reduce((sum, r) => sum + (r.drySweet ?? 0), 0) /
              count
          ),
          acidity: Math.round(
            fetchedReviews.reduce((sum, r) => sum + (r.softAcidic ?? 0), 0) /
              count
          ),
        });
      }

      const aromaCounts: Record<string, number> = {};
      fetchedReviews.forEach((r) => {
        (r.aroma ?? []).forEach((aroma: string) => {
          aromaCounts[aroma] = (aromaCounts[aroma] || 0) + 1;
        });
      });

      const top3 = Object.entries(aromaCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([aroma]) => aroma);

      setFlavorTop3(top3);
    });
  }, [wineId]);

  // 2. useEffect에서 fetchReviews 사용
  useEffect(() => {
    getWineData(wineId).then((data) => {
      setWine(data);
    });
    fetchReviews();
  }, [wineId, fetchReviews]);

  if (!wine)
    return (
      <div className="w-full max-w-1140 mx-auto px-4 py-10">
        <div className="w-full h-302 bg-gray-200 animate-pulse rounded-xl" />
        <div className="mt-10 space-y-6">
          <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-24 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );

  return (
    <main className="min-h-screen px-4 py-10 flex flex-col items-center bg-white">
      {/* 🍷 와인 정보 카드 */}
      <div className="relative w-full max-w-1140 h-200 md:h-260 lg:h-302 mt-50 mb-30 lg:mb-16">
        <DetailCard
          name={wine.name}
          region={wine.region}
          price={wine.price}
          image={wine.image}
        />
      </div>

      {/* 💻 PC: 리뷰 카드 + 별점 요약 나란히 */}
      <div className="hidden lg:block w-full max-w-1140">
        {/* 🎚️ 맛/🌸 향 요약 섹션 */}
        {reviews.length > 0 && tasteSummary && (
          <section className="w-full mt-15 mb-20 px-4 md:px-0">
            <div className="flex justify-between gap-12">
              <div className="w-1/2">
                <h3 className="text-xl font-semibold text-gray-800 mb-10">
                  어떤 맛이 나나요?
                  <span className="text-sm text-gray-500 ml-2">
                    ({ratingData.count}명 참여)
                  </span>
                </h3>
                <TasteSummary values={tasteSummary} readOnly />
              </div>
              <div className="w-1/2">
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

        <div className="flex justify-between gap-30">
          <div className="flex flex-col space-y-10 w-800">
            <h3 className="text-2xl font-bold leading-8 tracking-normal text-gray-800 mt-20 mb-20">
              리뷰 목록
            </h3>
            {paginatedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                setReviews={setReviews}
              />
            ))}
          </div>

          <div className="sticky top-130 w-280 h-311 bg-none">
            <StarReview
              name={wine.name}
              average={ratingData.average}
              count={ratingData.count}
              ratings={ratingData.ratings}
              wineId={wineId}
              onSubmitSuccess={fetchReviews}
            />
          </div>
        </div>
        {/* 📄 페이지네이션: PC 버전 페이지 하단 중앙 */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center w-full">
            <ReviewPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* ✅ 태블릿 전용 */}
      <div className="hidden md:flex lg:hidden flex-col w-full max-w-[744px] gap-10">
        {/* 🎚️ 맛/🌸 향 요약 섹션 */}
        {reviews.length > 0 && tasteSummary && (
          <section className="w-full mt-15 mb-20">
            <div className="flex flex-col gap-12">
              {/* 🎚️ 어떤 맛이 나나요? */}
              <div className="w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-10">
                  어떤 맛이 나나요?
                  <span className="text-sm text-gray-500 ml-2">
                    ({ratingData.count}명 참여)
                  </span>
                </h3>
                <div className="flex flex-col justify-center p-10">
                  <TasteSummary values={tasteSummary} readOnly />
                </div>
              </div>

              {/* 🌸 어떤 향이 있나요? */}
              <div className="w-full">
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

        {/* ⭐ 별점 요약 */}
        <div className="w-full">
          <StarReview
            name={wine.name}
            average={ratingData.average}
            count={ratingData.count}
            ratings={ratingData.ratings}
            wineId={wineId}
            onSubmitSuccess={fetchReviews}
          />
        </div>

        {/* 📝 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-8 w-full">
          <h3 className="text-2xl font-bold text-gray-800 mb-20">리뷰 목록</h3>
          {paginatedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              setReviews={setReviews}
            />
          ))}
        </div>
        {/* 📄 페이지네이션: PC 버전 페이지 하단 중앙 */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center w-full">
            <ReviewPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* ✅ 모바일 전용 */}
      <div className="flex md:hidden flex-col w-full px-4 gap-10">
        {/* 🎚️ 맛/🌸 향 요약 섹션 */}
        {reviews.length > 0 && tasteSummary && (
          <section className="w-full mt-50 mb-20">
            <div className="flex flex-col gap-12">
              {/* 🎚️ 어떤 맛이 나나요? */}
              <div className="w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-10">
                  어떤 맛이 나나요?
                  <span className="text-sm text-gray-500 ml-2">
                    ({ratingData.count}명 참여)
                  </span>
                </h3>
                <div className="flex flex-col justify-center p-10">
                  <TasteSummary values={tasteSummary} readOnly />
                </div>
              </div>

              {/* 🌸 어떤 향이 있나요? */}
              <div className="w-full p-10">
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

        {/* ⭐ 별점 요약 */}
        <StarReview
          name={wine.name}
          average={ratingData.average}
          count={ratingData.count}
          ratings={ratingData.ratings}
          wineId={wineId}
          onSubmitSuccess={fetchReviews}
        />

        {/* 📝 리뷰 카드 리스트 */}
        <div className="flex flex-col space-y-6 w-full">
          <h3 className="text-2xl font-bold text-gray-800 mb-20">리뷰 목록</h3>
          {paginatedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              setReviews={setReviews}
            />
          ))}
        </div>
        {/* 📄 Pagination (모바일 하단에도 있음) */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center w-full">
            <ReviewPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}
