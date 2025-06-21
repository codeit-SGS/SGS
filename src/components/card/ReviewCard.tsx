'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import EditModal from '../wineDetail/EditModal';
import CancelModal from '@/components/modal/Cancle';

const getRelativeTime = (dateString?: string) => {
  if (!dateString) return null;

  const now = new Date();
  const date = new Date(dateString);
  const diff = (now.getTime() - date.getTime()) / 1000;

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) return '방금 전';
  if (diff < hour) return `${Math.floor(diff / minute)}분 전`;
  if (diff < day) return `${Math.floor(diff / hour)}시간 전`;
  if (diff < month) return `${Math.floor(diff / day)}일 전`;
  if (diff < year) return `${Math.floor(diff / month)}개월 전`;
  return `${Math.floor(diff / year)}년 전`;
};

interface ReviewCardProps {
  review?: {
    id?: number;
    rating?: number;
    lightBold?: number;
    smoothTannic?: number;
    drySweet?: number;
    softAcidic?: number;
    aroma?: string[];
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    isLiked?: boolean;
    user?: {
      id?: number;
      nickname?: string;
      image?: string | null;
    };
  };
}

const PurpleSlider = styled(Slider)({
  color: '#F2F4F8',
  height: 5,
  padding: 0,
  '& .MuiSlider-thumb': {
    width: 12,
    height: 12,
    backgroundColor: '#6A42DB',
    border: 'none',
    '@media (min-width: 744px)': {
      width: 16,
      height: 16,
    },
  },
  '& .MuiSlider-track': {
    backgroundColor: '#F2F4F8',
    opacity: 1,
    border: '1px solid #CFDBEA',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#F2F4F8',
    opacity: 1,
    border: '1px solid #CFDBEA',
  },
});

export default function ReviewCard({ review = {} }: ReviewCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);
  const handleEditClick = () => {
    setIsDropdownOpen(false);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // "삭제하기" 클릭 시 모달 열기
  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  // 모달 취소 버튼
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 모달 확인(삭제) 버튼
  const handleConfirm = () => {
    setIsModalOpen(false);
    console.log('삭제 완료');
  };

  return (
    <div className="w-full max-w-343 tablet:max-w-704 pc:max-w-800 bg-white rounded-[16px] border border-gray-300 px-20 py-16 tablet:px-40 tablet:py-30 pc:py-16 duration-300 ease-in transition-all">
      <div className="flex justify-between items-start gap-16 mb-16 tablet:mb-20 pc:mb-24">
        <div className="flex gap-16 pc:gap-20 items-center">
          <Image
            src={review?.user?.image ?? '/img/profile-default.svg'}
            alt="프로필 이미지"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="text-sm tablet:gap-4 flex flex-col">
            <p className="text-16 tablet:text-xl font-semibold text-gray-800">
              {review?.user?.nickname || '익명 사용자'}
            </p>
            <p className="text-gray-400 text-14 tablet:text-lg">
              {review?.updatedAt && review?.updatedAt !== review?.createdAt
                ? `수정됨 · ${getRelativeTime(review.updatedAt)}`
                : review?.createdAt
                ? getRelativeTime(review.createdAt)
                : '날짜 없음'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-18 tablet:gap-24">
          <div className="relative size-32 tablet:size-38 cursor-pointer">
            <Image
              src={review?.isLiked ? '/icon/like-fill.svg' : '/icon/like.svg'}
              alt="좋아요"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative" ref={dropdownRef}>
            <div
              className="relative size-32 tablet:size-38 cursor-pointer"
              onClick={handleDropdownToggle}
            >
              <Image
                src="/icon/menu.svg"
                alt="더보기"
                fill
                className="object-contain"
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute top-30 tablet:top-60 pc:top-50 right-0 px-4 py-3 bg-white border border-gray-300 rounded-[16px] z-10">
                <button onClick={handleEditClick}
                  className="block w-full px-16 py-8 tablet:px-30 tablet:py-10 text-md tablet:text-lg rounded-[12px] text-gray-800 text-medium whitespace-nowrap cursor-pointer hover:bg-main-10 hover:text-main">
                  수정하기
                </button>
                <button
                  className="block w-full px-16 py-8 tablet:px-30 tablet:py-10 text-md tablet:text-lg rounded-[12px] text-gray-800 text-medium whitespace-nowrap cursor-pointer hover:bg-main-10 hover:text-main"
                  onClick={handleDeleteClick}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>

          {isEditModalOpen && (
            <EditModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              initialData={{
                rating: review?.rating || 0,
                content: review?.content || '',
                taste: {
                  body: review?.lightBold || 0,
                  tannin: review?.smoothTannic || 0,
                  sweetness: review?.drySweet || 0,
                  acidity: review?.softAcidic || 0,
                },
                aroma: review?.aroma || [],
                wineId: 1,
                wineName: '',
                reviewId: review?.id || 0,
              }}
            />
          )}
        </div>
      </div>

      <div className="relative flex items-start mb-16 tablet:mb-20 pc:mb-24">
        <div className="flex overflow-x-auto gap-4 tablet:gap-10 scrollbar-hide">
          {(review?.aroma || []).map((tag) => (
            <span
              key={tag}
              className="whitespace-nowrap text-md tablet:text-lg font-medium border border-gray-300 rounded-[18px] tablet:rounded-[24px] px-10 py-5 tablet:px-15 tablet:py-8 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute right-0 top-0">
          <div className="bg-main-10 text-main text-md tablet:text-lg font-semibold px-10 py-6 tablet:px-15 tablet:py-8 rounded-[12px] flex items-center gap-2">
            <Image
              src="/icon/purple-star.svg"
              alt="별점"
              width={16}
              height={16}
            />
            <span>{review?.rating?.toFixed(1) || '0.0'}</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <p className="text-md tablet:text-lg text-gray-800 leading-24 tablet:leading-26 mb-16 tablet:mb-24 pc:mb-20">
            {review?.content || '후기 내용이 없습니다.'}
          </p>
          <div className="flex flex-col gap-12 tablet:gap-16 pc:gap-18 mb-16 tablet:mb-24 pc:mb-7">
            {[
              ['바디감', '가벼워요', '진해요', review?.lightBold],
              ['타닌', '부드러워요', '떫어요', review?.smoothTannic],
              ['당도', '드라이해요', '달아요', review?.drySweet],
              ['산미', '안셔요', '많이셔요', review?.softAcidic],
            ].map(([label, left, right, percent], idx) => (
              <div
                key={idx}
                className="flex flex-row items-center gap-10 tablet:gap-16 pc:gap-26"
              >
                <div className="w-48 tablet:w-62 text-xs tablet:text-lg text-gray-500 font-semibold px-8 py-5 tablet:px-10 tablet:py-2 bg-gray-100 rounded-[6px] text-center">
                  {label}
                </div>
                <div className="flex flex-row flex-1 items-center justify-between tablet:gap-15">
                  <span className="inline-block w-62 tablet:w-70 text-md tablet:text-lg text-gray-800">
                    {left}
                  </span>
                  <PurpleSlider
                    className="max-w-110 tablet:max-w-380 pc:max-w-470"
                    value={Number(percent) || 0}
                    disabled
                  />
                  <span className="inline-block w-50 tablet:w-60 text-md tablet:text-lg text-gray-800">
                    {right}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-center pt-4">
        <button onClick={handleToggle}>
          <div className="relative size-25 tablet:size-30">
            <Image
              src={isOpen ? '/icon/more-reverse.svg' : '/icon/more.svg'}
              alt="열기/닫기"
              fill
              className="object-contain cursor-pointer"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
