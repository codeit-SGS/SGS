'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProfileIcon from '@/components/input/ProfileImage';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import EditModal from '../wineDetail/EditModal';

// 스타일링된 슬라이더 컴포넌트
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

export default function ReviewCard() {
  const [isOpen, setIsOpen] = useState(true); // 본문 토글
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 전용
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);

  const handleEditClick = () => {
    setIsDropdownOpen(false);
    setIsEditModalOpen(true); // 👈 수정 모달 열기
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-343 tablet:max-w-704 pc:max-w-800 bg-white rounded-[16px] border border-gray-300 px-20 py-16 tablet:px-40 tablet:py-30 pc:py-16 duration-300 ease-in transition-all">
      {/* 상단 유저 정보 */}
      <div className="flex justify-between items-start gap-16 mb-16 tablet:mb-20 pc:mb-24">
        <div className="flex gap-16 pc:gap-20 items-center">
          <ProfileIcon className="size-42 tablet:size-64" />
          <div className="text-sm tablet:gap-4 flex flex-col">
            <p className="text-16 tablet:text-xl font-semibold text-gray-800">
              와인러버
            </p>
            <p className="text-gray-400 text-14 tablet:text-lg">10시간 전</p>
          </div>
        </div>

        <div className="flex items-center gap-18 tablet:gap-24">
          <div className="relative size-32 tablet:size-38 cursor-pointer">
            <Image
              src="/icon/like.svg"
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
            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute top-30 tablet:top-60 pc:top-50 right-0 px-4 py-3 bg-white border border-gray-300 rounded-[16px] z-10">
                <button
                  onClick={handleEditClick}
                  className="block w-full px-16 py-8 tablet:px-30 tablet:py-10 text-md tablet:text-lg rounded-[12px] text-gray-800 text-medium whitespace-nowrap cursor-pointer hover:bg-main-10 hover:text-main"
                >
                  수정하기
                </button>
                <button className="block w-full px-16 py-8 tablet:px-30 tablet:py-10 text-md tablet:text-lg rounded-[12px] text-gray-800 text-medium whitespace-nowrap cursor-pointer hover:bg-main-10 hover:text-main">
                  삭제하기
                </button>
              </div>
            )}
          </div>
          {/* 수정 모달 */}
          {isEditModalOpen && (
            <EditModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              // 원래는 => initialData={{review}}
              initialData={{
                rating: 5,
                content:
                  'Deep maroon color, tasting notes of blackberry, dark chocolate...',
                taste: {
                  body: 80,
                  tannin: 30,
                  sweetness: 50,
                  acidity: 60,
                },
                aroma: ['체리', '오크', '카라멜'],
                wineId: 1,
                wineName: 'Sentinel Carbernet Sauvignon 2016',
                reviewId: 123,
              }}
            />
          )}
        </div>
      </div>

      {/* 태그 + 별점 영역 */}
      <div className="relative flex items-start mb-16 tablet:mb-20 pc:mb-24">
        {/* 태그 스크롤 영역 */}
        <div className="flex overflow-x-auto gap-4 tablet:gap-10 scrollbar-hide">
          {['체리', '오크', '카라멜', '시트러스', '꽃'].map((tag) => (
            <span
              key={tag}
              className="whitespace-nowrap text-md tablet:text-lg font-medium border border-gray-300 rounded-[18px] tablet:rounded-[24px] px-10 py-5 tablet:px-15 tablet:py-8 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 별점 */}
        <div className="absolute right-0 top-0">
          <div className="bg-main-10 text-main text-md tablet:text-lg font-semibold px-10 py-6 tablet:px-15 tablet:py-8 rounded-[12px] flex items-center gap-2">
            <Image
              src="/icon/purple-star.svg"
              alt="별점"
              width={16}
              height={16}
            />
            <span>5.0</span>
          </div>
        </div>
      </div>

      {/* 토글 영역 */}
      {isOpen && (
        <>
          {/* 텍스트 후기 */}
          <p className="text-md tablet:text-lg text-gray-800 leading-24 tablet:leading-26 mb-16 tablet:mb-24 pc:mb-20">
            Deep maroon color, tasting notes of blackberry, dark chocolate,
            plum. Super jammy and bold with some smoky after notes. Big flavor.
            Amazing value (would pay three times the price for it), well
            balanced flavor. Could drink all day everyday with or without food.
            I need more immediately.
          </p>

          {/* 슬라이더 */}
          <div className="flex flex-col gap-12 tablet:gap-16 pc:gap-18 mb-16 tablet:mb-24 pc:mb-7">
            {[
              ['바디감', '가벼워요', '진해요', 80],
              ['타닌', '부드러워요', '떫어요', 30],
              ['당도', '드라이해요', '달아요', 50],
              ['산미', '안셔요', '많이셔요', 60],
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
                    value={Number(percent)}
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

      {/* 토글 버튼 */}
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
