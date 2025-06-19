'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import MonthlyCard from "@/components/card/monthlyCard";
import Search from "@/components/input/Search";
import Filter from "@/components/modal/Filter";
import WineCard from "@/components/card/wineCard";
import CommonButton from "@/components/button/CommonButton";
import WineRegister from "@/components/modal/WineRegister";

export default function WineListPage() {
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const wineList = [
    { id: 1, name: '샤또 마고', region: 'France', imageUrl: '/images/wine1.jpg', rating: 5.0 },
    { id: 2, name: '오퍼스 원', region: 'USA', imageUrl: '/images/wine2.jpg', rating: 4.5 },
    { id: 3, name: '빈티지 포트', region: 'Portugal', imageUrl: '/images/wine3.jpg', rating: 4.0 },
  ];

  const sortedWineList = [...wineList].sort((a, b) => b.rating - a.rating);

  return (
    <main className="max-w-1140 min-h-screen bg-white px-4 py-6 pt-10 mx-auto">

      {/* 이번 달 추천 와인 */}
      <section className="w-1140 h-299 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">이번 달 추천 와인</h2>
        <div className="flex gap-4 overflow-x-auto">
          {sortedWineList.map((wine) => (
            <MonthlyCard key={wine.id} />
          ))}
        </div>
      </section>

      {/* 검색 */}
      <div className="mt-30 mb-50">
        <Search />
      </div>

      {/* 필터와 와인 카드 리스트 */}
      <section className="mt-6 flex flex-col lg:flex-row gap-60">
        {/* 필터 */}
        <div className="lg:w-1/4 w-full">
          <Filter />
          <CommonButton variant="modal-add-wine" onClick={() => setIsRegisterOpen(true)} className="w-284 h-50 rounded-16">와인 등록하기</CommonButton>
        </div>

        {/* 와인 카드 리스트 */}
        <div className="lg:w-3/4 w-full flex flex-col gap-4">
          {wineList.map((wine) => (
            <WineCard key={wine.id} {...wine} />
          ))}
        </div>
      </section>

      {/* WineRegister 모달 */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsRegisterOpen(false)}>
          <div className="bg-white rounded-xl p-6 relative" onClick={(e) => e.stopPropagation()}>
            <WineRegister teamId="your-team-id" onClose={() => setIsRegisterOpen(false)} onSuccess={(id) => router.push(`/wine/${id}`)} />
          </div>
        </div>
      )}
    </main>
  );
}