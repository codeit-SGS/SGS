'use client';

import { useState, useEffect, useRef } from 'react';
import CancelModal from '@/components/modal/Cancle';
import Image from 'next/image';

interface MylistCardProps {
  name: string;
  region: string;
  price: number;
  image?: string;
}

const MylistCard = ({ name, region, price, image = '/wine/wine-type2.svg' }: MylistCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 토글
  const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 삭제 클릭 시
  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCancel = () => setIsModalOpen(false);

  // 삭제 확정
  const handleConfirm = () => {
    setIsModalOpen(false);
    console.log('와인 삭제 완료');
  };

  return (
    <div className="flex flex-col w-full max-w-800 pt-42">
      <div className="relative flex pt-30 pr-40 max-h-228 rounded-[16px] bg-white border border-gray-300">
        <div className="relative w-full px-70 max-w-180">
          <img
            src={image}
            alt="와인 이미지"
            className="absolute bottom-0 w-full h-4/3 max-w-180 left-1/2 -translate-x-1/2 object-contain"
          />
        </div>

        <div className="flex flex-col justify-between gap-5">
          <div className="max-w-300">
            <h3 className="text-3xl font-bold text-gray-800 pb-20">{name}</h3>
            <p className="text-16 text-gray-500 leading-26 pb-13">{region}</p>
            <div className="inline-block text-18 font-bold py-5 px-15 rounded-[12px] bg-main-10 text-main mb-40">
              ₩ {price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 드롭다운 */}
        <div className="absolute top-30 right-40 cursor-pointer" ref={dropdownRef}>
          <img
            src="/icon/menu.svg"
            alt="드롭다운 버튼"
            width={26}
            height={26}
            onClick={handleDropdownToggle}
          />
          {isDropdownOpen && (
            <div className="absolute top-30 tablet:top-60 pc:top-50 right-0 px-4 py-3 bg-white border border-gray-300 rounded-[16px] z-10">
              <button
                className="block w-full px-16 py-8 tablet:px-30 tablet:py-10 text-md tablet:text-lg rounded-[12px] text-gray-800 text-medium whitespace-nowrap cursor-pointer hover:bg-main-10 hover:text-main"
                onClick={() => alert('수정 기능은 아직 미구현입니다.')}
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

      {/* 삭제 모달 */}
      <CancelModal open={isModalOpen} onCancel={handleCancel} onConfirm={handleConfirm} />
    </div>
  );
};

export default MylistCard;
