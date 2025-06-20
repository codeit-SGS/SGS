'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarInputProps {
  value?: number; // ⭐ 현재 선택된 별점 값 (0.5 단위)
  onChange?: (value: number) => void; // ⭐ 별점이 바뀔 때 실행할 콜백
}

export default function StarInput({ value = 0, onChange }: StarInputProps) {
  const [hovered, setHovered] = useState<number | null>(null); // ⭐ 마우스 오버 상태(별점 미리보기)

  // ⭐ 마우스를 별 위에 올릴 때 실행: 반쪽 or 전체 별로 hover 반영
  const handleMouseMove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    star: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect(); // 별의 위치 정보
    const x = e.clientX - left; // 마우스가 별의 왼쪽에서 얼마나 떨어졌는지
    const percent = x / width; // 별의 너비 중 얼마나 차지했는지 (0~1)

    const newHover = percent < 0.5 ? star - 0.5 : star; // 마우스가 왼쪽이면 반개, 오른쪽이면 한 개
    setHovered(newHover); // 미리보기 값 업데이트
  };

  // ⭐ 별 클릭 시 실행: 실제 별점 값을 반영
  const handleClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    star: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const percent = x / width;
    const selectedValue = percent < 0.5 ? star - 0.5 : star; // 클릭 위치에 따라 0.5 단위 선택
    if (value === selectedValue) {
      onChange?.(0);
    } else {
      onChange?.(selectedValue);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const displayValue = hovered ?? value; // hover 중이면 hover 값을, 아니면 실제 선택값 사용
        const isFull = star <= displayValue; // 해당 별이 완전히 채워졌는가
        const isHalf = star - 0.5 === displayValue; // 해당 별이 절반만 채워졌는가

        return (
          <Star
            key={star}
            size={32}
            className={`cursor-pointer transition-colors ${
              isFull || isHalf
                ? 'text-main fill-main' // 채운 별
                : 'text-gray-300' // 빈 별
            }`}
            onMouseEnter={(e) => handleMouseMove(e, star)} // hover 시작
            onMouseMove={(e) => handleMouseMove(e, star)} // hover 유지
            onMouseLeave={() => setHovered(null)} // hover 끝
            onClick={(e) => handleClick(e, star)} // 클릭 시 선택 반영
          />
        );
      })}
    </div>
  );
}
