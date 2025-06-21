'use client';

import { useState } from 'react';
import StarDisplay from './StarDisplay';
import ReviewModal from './ReviewModal';
import RatingBar from './RatingBar';

export default function StarRatingSummary({
  average,
  count,
  ratings,
  wineId,
}: {
  average: number;
  count: number;
  ratings: Record<number, number>;
  wineId: number;
}) {
  const total = Object.values(ratings).reduce((a, b) => a + b, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 💻 PC용: 1028px 이상 */}
      <div className="hidden lg:block p-4 rounded-xl bg-none w-[280px]">
        <div className="text-4xl font-bold text-gray-800 mb-2">
          {average.toFixed(1)}
        </div>
        {/* ⭐ 평균 별점 */}
        <div className="flex items-center gap-2 mb-1">
          <StarDisplay rating={average} />
          <span className="text-xs text-gray-500">
            {count.toLocaleString()}개의 후기
          </span>
        </div>
        {/* 📊 RatingBar */}
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
          className="w-113 h-42 cursor-pointer mt-15 px-5 py-2 rounded-xl bg-main text-white text-sm font-semibold hover:bg-purple-600 transition"
        >
          리뷰 남기기
        </button>
      </div>

      {/* 📲 태블릿용: 744px 이상, 1028px 미만 */}
      <div className="hidden md:flex lg:hidden p-6 rounded-xl bg-none w-full justify-between items-start gap-12">
        {/* ✅ 왼쪽: 별점 수치 + 별 아이콘(가로) + 후기 수(아래) + 버튼 */}
        <div className="flex flex-col gap-4 w-1/3">
          {/* ⭐ 평균 별점 수치 + ⭐ 아이콘 → 가로 정렬 */} {/* 🔧 구조 변경 */}
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-gray-800">
              {' '}
              {/* 🔧 숫자 별점 */}
              {average.toFixed(1)}
            </div>
            <div className="flex flex-col">
              {' '}
              {/* ⭐ 아이콘 + 후기 수 (세로로) */}
              <StarDisplay rating={average} /> {/* 🔧 별점 아이콘 */}
              <span className="text-sm text-gray-500">
                {' '}
                {/* 🔧 후기 수 */}
                {count.toLocaleString()}개의 후기
              </span>
            </div>
          </div>
          {/* ✍️ 리뷰 남기기 버튼 */} {/* 🔧 아래 위치로 이동 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-113 h-42 cursor-pointer px-5 py-2 rounded-xl bg-main text-white text-sm font-semibold hover:bg-purple-600 transition"
          >
            리뷰 남기기
          </button>
        </div>

        {/* 📊 오른쪽: 별점 분포 슬라이더 */}
        <div className="flex flex-col gap-2 w-2/3">
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

      {/* 📱 모바일용: 744px 미만 */}
      <div className="block md:hidden p-4 rounded-xl bg-none w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="text-3xl font-bold text-gray-800">
            {average.toFixed(1)}
          </div>
          {/* ⭐ 평균 별점 */}
          <StarDisplay rating={average} />
          <span className="text-sm text-gray-500">
            {count.toLocaleString()}개의 후기
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-113 h-42 cursor-pointer mt-15 px-5 py-2 rounded-xl bg-main text-white text-sm font-semibold hover:bg-purple-600 transition"
          >
            리뷰 남기기
          </button>
          {/* 📊 RatingBar */}
          <div className="mt-4 flex flex-col gap-2 w-full">
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

      {/* ✏️ 리뷰 작성 모달 */}
      {isModalOpen && (
        <ReviewModal onClose={() => setIsModalOpen(false)} wineId={wineId} />
      )}
    </>
  );
}
