'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

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
  type?: string;
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
  const [recommendedWines, setRecommendedWines] = useState<Wine[]>([]);
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
        const res = await api.get('/wines', {
          params: { limit: 20 }
        });

        console.log('와인 데이터:', res.data);
        setWineList(res.data.list ?? []);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error('와인 목록 에러:', err.response?.data || err.message);
        } else if (err instanceof Error) {
          console.error('와인 목록 에러:', err.message);
        } else {
          console.error('와인 목록 에러:', err);
        }
        setError('와인 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedWines = async () => {
      try {
        const res = await api.get('/wines/recommended', {
          params: {
            teamId: '15-3',
            limit: 20
          }
        });
        setRecommendedWines(res.data ?? []);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error('추천 와인 에러 상태코드:', err.response?.status);
          console.error('추천 와인 에러 응답 내용:', err.response?.data);
          console.error('추천 와인 요청 경로:', err.config?.url);
        } else if (err instanceof Error) {
          console.error('추천 와인 에러:', err.message);
        } else {
          console.error('추천 와인 알 수 없는 에러:', err);
        }
      }
    };

    fetchWines();
    fetchRecommendedWines();
  }, []);

  const handleApplyFilter = (filter: FilterOptions) => {
    setFilterOptions(filter);
  };

  const sortedWineList = Array.isArray(wineList)
    ? [...wineList].sort((a, b) => b.avgRating - a.avgRating)
    : [];

  const filteredWineList = sortedWineList.filter((wine) => {
    const matchName = wine.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType =
      filterOptions.wineType === '전체' ||
      wine.type?.toLowerCase() === filterOptions.wineType.toLowerCase();

    const matchPrice =
      wine.price >= filterOptions.priceRange[0] &&
      wine.price <= filterOptions.priceRange[1];

    let matchRating = true;
    if (filterOptions.rating !== '전체') {
      const [min, max] = filterOptions.rating.split(' - ').map(parseFloat);
      matchRating = wine.avgRating >= min && wine.avgRating <= max;
    }

    return matchName && matchType && matchPrice && matchRating;
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
      <section className="w-1140 h-299 bg-gray-100 rounded-2xl mt-10 relative">
        <h2 className="text-xl text-gray-800 font-semibold mt-30 ml-30 absolute">이번 달 추천 와인</h2>
        <div className="flex mt-84 absolute">
          {recommendedWines.map((wine) => (
            <MonthlyCard
              key={wine.id}
              id={wine.id}
              name={wine.name}
              image={wine.image}
              avgRating={wine.avgRating}
            />
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
          <CommonButton
            variant="modal-add-wine"
            onClick={() => setIsRegisterOpen(true)}
            className="w-284 h-50 rounded-16"
          >
            와인 등록하기
          </CommonButton>
        </div>

        {/* 와인 카드 리스트 */}
        <div className="lg:w-3/4 w-full flex flex-col gap-64">
          {filteredWineList.length > 0 ? (
            filteredWineList.map((wine) => (
              <WineCard
                key={wine.id}
                id={wine.id}
                name={wine.name}
                region={wine.region}
                image={wine.image}
                price={wine.price}
                type={wine.type}
                avgRating={wine.avgRating}
                reviewCount={wine.reviewCount ?? 0}
                recentReview={
                  typeof wine.recentReview === 'object'
                    ? wine.recentReview?.content
                    : wine.recentReview ?? '등록된 후기가 없습니다.'
                }
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">검색하는 와인이 없습니다.</p>
          )}
        </div>
      </section>

      {/* WineRegister 모달 */}
      {isRegisterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsRegisterOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <WineRegister
              teamId="15-3"
              onClose={() => setIsRegisterOpen(false)}
              onSuccess={(id) => router.push(`/reviews/${id}`)}
            />
          </div>
        </div>
      )}
    </main>
  );
}