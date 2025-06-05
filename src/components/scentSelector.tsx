"use client";

import { useState } from "react";

const SCENTS = [
  "체리",
  "베리",
  "오크",
  "바닐라",
  "후추",
  "제빵",
  "풀",
  "사과",
  "복숭아",
  "시트러스",
  "트로피컬",
  "미네랄",
  "꽃",
  "담뱃잎",
  "흙",
  "초콜릿",
  "스파이스",
  "카라멜",
  "가죽",
];

const ScentSelector = () => {
  const [selectedScents, setSelectedScents] = useState<string[]>([]);

  // 선택/해제 토글 함수
  const toggleScent = (scent: string): void => {
    setSelectedScents((prev) =>
      prev.includes(scent)
        ? prev.filter((item) => item !== scent)
        : [...prev, scent]
    );
  };

  return (
    <div className="flex flex-wrap gap-10">
      {SCENTS.map((scent) => {
        const isSelected = selectedScents.includes(scent);
        return (
          <button
            key={scent}
            onClick={() => toggleScent(scent)}
            className={`px-18 py-10 rounded-100 text-lg-16px font-medium border border-gray-300 
                ${isSelected ? "bg-main text-white" : "bg-white text-gray300"}`}
          >
            {scent}
          </button>
        );
      })}
    </div>
  );
};

export default ScentSelector;
