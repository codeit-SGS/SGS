'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CancelModal from '@/components/modal/Cancle';

// 시간 차이를 "몇 분 전", "몇 시간 전" 등으로 변환하는 함수
const getRelativeTime = (dateString: string) => {
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

interface MyCardProps {
  id: number;
  rating: number;
  createdAt: string;
  wineName: string;
  content: string;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const MyCard = ({ id, rating, createdAt, wineName, content, onDelete, onEdit }: MyCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 열고 닫는 토글
  const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);

  // 외부 클릭 시 드롭다운 자동 닫기
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
  const handleConfirm = async () => {
    setIsModalOpen(false);
    if (onDelete) onDelete(id);
  };

  return (
    <>
      {/* 카드 본문 */}
      <div className="flex flex-col w-full max-w-[800px] px-40 pt-24 pb-18 bg-white rounded-[16px] border border-gray-300">
        <div className="flex justify-between pb-20">
          <div className="flex items-center gap-15">
            <div className="flex items-center bg-main-10 text-main text-18 rounded-[12px] font-semibold px-15 py-8 gap-2">
              <Image src="/icon/purple-star.svg" alt="별 아이콘" width={20} height={20} />
              <span>{rating.toFixed(1)}</span>
            </div>
            {/* 시간 표시 */}
            <span className="text-gray-500 text-16 leading-26">
              {getRelativeTime(createdAt)}
            </span>
          </div>

          {/* 옵션 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={handleDropdownToggle}>
              <Image src="/icon/menu.svg" alt="더보기" width={26} height={26} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-30 tablet:top-60 pc:top-50 right-0 px-4 py-3 bg-white border border-gray-300 rounded-[16px] z-10">
                <button
                  className="block w-full px-16 py-8 tablet:px-30 tablet:py-10 text-md tablet:text-lg rounded-[12px] text-gray-800 text-medium whitespace-nowrap cursor-pointer hover:bg-main-10 hover:text-main"
                  onClick={() => onEdit && onEdit(id)}
                >
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
        </div>

        {/* 와인명 및 내용 */}
        <p className="text-16 text-gray-500 leading-26 pb-10">{wineName}</p>
        <p className="text-16 text-gray-800 leading-26 text-overflow-line3">{content}</p>
      </div>

      {/* 삭제 확인 모달 */}
      <CancelModal open={isModalOpen} onCancel={handleCancel} onConfirm={handleConfirm} />
    </>
  );
};

export default MyCard;
