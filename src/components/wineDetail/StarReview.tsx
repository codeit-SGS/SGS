'use client';

import { useState } from 'react';
import StarDisplay from './StarDisplay';
import ReviewModal from './ReviewModal';
import RatingBar from './RatingBar';

export default function StarRatingSummary({
  average,
  count,
  ratings,
}: {
  average: number;
  count: number;
  ratings: Record<number, number>;
}) {
  const total = Object.values(ratings).reduce((a, b) => a + b, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* ✅ PC용: 너가 만든 코드 100% 유지 */}
      <div className="hidden lg:block p-4 rounded-xl shadow-subtle bg-white w-[280px]">
        <div className="text-4xl font-bold text-gray-800 mb-2">
          {average.toFixed(1)}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <StarDisplay rating={average} />
          <span className="text-xs text-gray-500">
            {count.toLocaleString()}개의 후기
          </span>
        </div>
        <div className="space-y-2 my-4">
          {[5, 4, 3, 2, 1].map((score) => (
            <RatingBar
              key={score}
              score={score}
              count={ratings[score] || 0}
              total={total}
            />
          ))}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-[113px] h-[42px] px-5 py-2 rounded-[12px] bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 transition"
        >
          리뷰 남기기
        </button>
      </div>

      {/* ✅ 모바일 & 태블릿 */}
      <div className="block lg:hidden p-4 md:p-6 rounded-xl shadow-subtle bg-white w-full">
        <div className="md:flex md:justify-between md:items-start md:gap-8">
          {/* 왼쪽 (모바일은 전체, 태블릿은 왼쪽 열) */}
          <div className="flex flex-col items-start gap-1">
            <div className="flex justify-between items-start w-full md:block">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {average.toFixed(1)}
                </div>
                <StarDisplay rating={average} />
              </div>

              {/* ✅ 모바일: 평균 옆 / ✅ 태블릿: 후기 수 아래 */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="md:hidden w-[113px] h-[42px] px-5 py-2 rounded-[12px] bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 transition"
              >
                리뷰 남기기
              </button>
            </div>

            <span className="text-xs text-gray-500 mt-1">
              {count.toLocaleString()}개의 후기
            </span>

            {/* ✅ 태블릿: 버튼은 후기 수 아래 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:block mt-2 w-[113px] h-[42px] px-5 py-2 rounded-[12px] bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 transition"
            >
              리뷰 남기기
            </button>
          </div>

          {/* RatingBar: 모바일은 아래, 태블릿은 오른쪽 */}
          <div className="mt-4 md:mt-0 flex flex-col gap-2 flex-1">
            {[5, 4, 3, 2, 1].map((score) => (
              <RatingBar
                key={score}
                score={score}
                count={ratings[score] || 0}
                total={total}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 리뷰 작성 모달 */}
      {isModalOpen && <ReviewModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
