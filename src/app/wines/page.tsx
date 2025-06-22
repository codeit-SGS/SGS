'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import MonthlyCard from "@/components/card/MonthlyCard";
import Search from "@/components/input/Search";
import Filter from "@/components/modal/Filter";
import WineCard from "@/components/card/WineCard";
import CommonButton from "@/components/button/CommonButton";
import WineRegister from "@/components/modal/WineRegister";
import api from '@/lib/api/axios';

interface Review {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount?: number;
  recentReview?: string | Review;
}

interface FilterOptions {
  wineType: string;
  priceRange: number[];
  rating: string;
}

export default function WineListPage() {
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wineList, setWineList] = useState<Wine[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    wineType: "전체",
    priceRange: [0, 100000],
    rating: "전체"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const limit = 20;
        const res = await api.get('/wines', {
          params: { limit: 20 }
        });

        console.log('와인 데이터:', res.data);
        setWineList(res.data.list ?? []);
      } catch (err: any) {
        console.error('와인 목록 에러:', err.response?.data || err.message);
        setError('와인 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  const handleApplyFilter = (filter: FilterOptions) => {
    setFilterOptions(filter);
  };

  const sortedWineList = Array.isArray(wineList)
    ? [...wineList].sort((a, b) => b.avgRating - a.avgRating)
    : [];

  const filteredWineList = sortedWineList.filter((wine) => {
    const matchName = wine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterOptions.wineType === "전체" || wine.name.toLowerCase().includes(filterOptions.wineType.toLowerCase());
    const matchPrice = wine.price >= filterOptions.priceRange[0] && wine.price <= filterOptions.priceRange[1];

    let matchRating = true;
    if (filterOptions.rating !== "전체") {
      const [min, max] = filterOptions.rating.split(" - ").map(parseFloat);
      matchRating = wine.avgRating >= min && wine.avgRating <= max;
    }

    return matchName && matchPrice && matchRating;
  });

  if (loading) {
    return <p className="text-center mt-20">와인 목록을 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-600">{error}</p>;
  }

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
        <Search onSearch={setSearchQuery} />
      </div>

      {/* 필터와 와인 카드 리스트 */}
      <section className="mt-6 flex flex-col lg:flex-row gap-60">
        {/* 필터 */}
        <div className="lg:w-1/4 w-full">
          <Filter onApplyFilter={handleApplyFilter} />
          <CommonButton variant="modal-add-wine" onClick={() => setIsRegisterOpen(true)} className="w-284 h-50 rounded-16">와인 등록하기</CommonButton>
        </div>

        {/* 와인 카드 리스트 */}
        <div className="lg:w-3/4 w-full flex flex-col gap-4">
          {filteredWineList.length > 0 ? (
            filteredWineList.map((wine) => (
              <WineCard
                key={wine.id}
                id={wine.id}
                name={wine.name}
                region={wine.region}
                image={wine.image}
                price={wine.price}
                avgRating={wine.avgRating}
                reviewCount={wine.reviewCount ?? 0}
                recentReview={
                  typeof wine.recentReview === 'object'
                    ? wine.recentReview?.content
                    : wine.recentReview ?? '등록된 후기가 없습니다.'} />
            ))
          ) : (<p className="text-center text-gray-500 mt-10">검색하는 와인이 없습니다.</p>)}
        </div>
      </section>

      {/* WineRegister 모달 */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setIsRegisterOpen(false)}>
          <div className="bg-white rounded-xl p-6 relative" onClick={(e) => e.stopPropagation()}>
            <WineRegister teamId="15-3" onClose={() => setIsRegisterOpen(false)} onSuccess={(id) => router.push(`/reviews/${id}`)} />
          </div>
        </div>
      )}
    </main>
  );
}