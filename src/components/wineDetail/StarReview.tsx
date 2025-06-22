'use client';

import { useState } from 'react';
import StarDisplay from './StarDisplay';
import ReviewModal from './ReviewModal';
import RatingBar from './RatingBar';

export default function StarRatingSummary({
  name,
  average,
  count,
  ratings,
  wineId,
  onSubmitSuccess,
}: {
  name: string;
  average: number;
  count: number;
  ratings: Record<number, number>;
  wineId: number;
  onSubmitSuccess?: () => void;
}) {
  const total = Object.values(ratings).reduce((a, b) => a + b, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 💻 PC용: 1028px 이상 */}
      <div className="hidden lg:block p-4 rounded-xl bg-none w-[280px]">
        {/* ⭐ 평균 숫자 + 별점 가로 정렬 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="text-5xl font-bold text-gray-800">
            {average.toFixed(1)}
          </div>
          {/* ⭐ 평균 별점 */}
          <div className="flex flex-col gap-2 ml-10 mb-1">
            <StarDisplay rating={average} />
            {/* 후기 수 */}
            <span className="text-xs text-gray-500">
              {count.toLocaleString()}개의 후기
            </span>
          </div>
        </div>

        {/* 📊 RatingBar */}
        <div className="space-y-2 my-10">
          {[5, 4, 3, 2, 1].map((score) => (
            <RatingBar
              key={score}
              score={score}
              count={ratings[score] || 0}
              total={total}
            />
          ))}
        </div>

        {/* 리뷰 남기기 버튼 */}
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
          {/* ⭐ 평균 별점 수치 + ⭐ 아이콘 → 가로 정렬 */}
          <div className="flex items-center mt-35 gap-4">
            <div className="text-5xl mr-10 font-bold text-gray-800">
              {' '}
              {/* 숫자 별점 */}
              {average.toFixed(1)}
            </div>
            <div className="flex flex-col">
              {' '}
              {/* ⭐ 아이콘 + 후기 수 (세로로) */}
              <StarDisplay rating={average} />
              <span className="text-sm text-gray-500">
                {' '}
                {/* 후기 수 */}
                {count.toLocaleString()}개의 후기
              </span>
            </div>
          </div>
          {/* ✍️ 리뷰 남기기 버튼 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-113 h-42 mt-30 cursor-pointer px-5 py-2 rounded-xl bg-main text-white text-sm font-semibold hover:bg-purple-600 transition"
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
      <div className="block md:hidden m-10 p-10 rounded-xl bg-none w-full">
        {/* ⭐ 상단: 왼쪽 별점/후기 수 + 오른쪽 리뷰 버튼 */}
        <div className="flex gap-250 items-start w-full ml-30 my-20">
          {/* ⬅️ 별점 정보 */}
          <div className="flex gap-2">
            {/* 평균 평점 */}
            <div className="text-5xl font-bold text-gray-800">
              {average.toFixed(1)}
            </div>

            {/* 별 아이콘 */}
            <div className="flex flex-col ml-10 gap-2">
              {/* 별 아이콘 */}
              <StarDisplay rating={average} />
              {/* 후기 수 */}
              <span className="text-sm text-gray-500">
                {count.toLocaleString()}개의 후기
              </span>
            </div>
          </div>

          {/* ➡️ 리뷰 남기기 버튼 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-113 h-42 px-5 py-2 rounded-xl bg-main text-white text-sm font-semibold hover:bg-purple-600 transition whitespace-nowrap"
          >
            리뷰 남기기
          </button>
        </div>

        {/* 📊 하단: 별점 분포 차트 */}
        <div className="flex flex-col gap-2 w-full">
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

      {/* ✏️ 리뷰 작성 모달 */}
      {isModalOpen && (
        <ReviewModal
          onClose={() => setIsModalOpen(false)}
          wineId={wineId}
          name={name}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </>
  );
}
