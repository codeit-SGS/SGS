'use client';

import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="bg-gray-50 text-black px-16">

      {/* main Section */}
      <section className="flex flex-col justify-between min-h-403 text-white text-center mt-24 rounded-[16px] bg-[#171A21]">
        <div>
          <div className="flex items-center justify-center mb-24">
            <Image src="/logo/logo-purple.png" alt="로고" width={81} height={23} />
          </div>
          <p className="mt-2 text-2xl font-bold">한 곳에서 관리하는<br />나만의 와인창고</p>
        </div>
        <div className="mt-6 flex overflow-x-auto gap-4 px-4">
          {/* 와인 카드 캐러셀 더미 */} 
        </div>
      </section>

      {/* ✅ 추천 콘텐츠 */}
      <section className="py-16 px-4">
        <h3 className="text-lg font-semibold">매달 새롭게 만나는 와인 추천 콘텐츠</h3>
        {/* 더미 와인 카드 2개 */}
        <div className="mt-4 flex gap-4 flex-wrap">
          <div className="bg-white p-4 rounded-xl shadow-md w-full sm:w-[48%]">와인 카드1</div>
          <div className="bg-white p-4 rounded-xl shadow-md w-full sm:w-[48%]">와인 카드2</div>
        </div>
      </section>

      {/* ✅ 맞춤 와인 */}
      <section className="py-16 px-4">
        <h3 className="text-lg font-semibold">다양한 필터로 찾는 내 맞춤 와인</h3>
        <div className="mt-4 bg-white p-4 rounded-xl shadow-md">와인 추천 카드</div>
      </section>

      {/* ✅ 리뷰 미리보기 */}
      <section className="py-16 px-4">
        <h3 className="text-lg font-semibold">직관적인 리뷰 시스템</h3>
        <div className="mt-4 bg-white p-4 rounded-xl shadow-md">리뷰 카드</div>
      </section>

      {/* ✅ CTA 버튼 */}
      <section className="flex justify-center py-12">
        <button className="bg-primary-purple text-white px-6 py-3 rounded-full font-semibold hover:opacity-90">
          와인 보러가기
        </button>
      </section>

    </main>
  );
}
