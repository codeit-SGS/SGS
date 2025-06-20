'use client';

import React from 'react';

interface MyCardProps {
  rating: number;
  createdAt: string;
  name: string;
  content: string;
}

const MyCard = ({ rating, createdAt, name, content }: MyCardProps) => {
  return (
    <div className="flex flex-col w-full max-w-[800px] px-40 pt-24 pb-18 bg-white rounded-[16px] border border-gray-300">
      {/* 상단: 별점 + 시간 + 옵션 */}
      <div className="flex justify-between pb-20">
        <div className="flex items-center gap-15">
          <div className="flex items-center bg-main-10 text-main text-18 rounded-[12px] font-semibold px-15 py-8 gap-2">
            <img
              src="/icon/purple-star.svg"
              alt="별 아이콘"
              width={20}
              height={20}
            />
            <span>{rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 text-16 leading-26">{createdAt}</span>
        </div>
        <button>
          <img
            src="/icon/menu.svg"
            alt="더보기"
            width={26}
            height={26}
          />
        </button>
      </div>

      {/* 와인명 */}
      <p className="text-16 text-gray-500 leading-26 pb-10">{name}</p>

      {/* 리뷰 내용 */}
      <p className="text-16 text-gray-800 leading-26 text-overflow-line3">
        {content}
      </p>
    </div>
  );
};

export default MyCard;
