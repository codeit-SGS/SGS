'use client';

import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex flex-col bg-gray-100 px-16 gap-48">

      {/* main Section */}
      <section className="relative flex flex-col justify-between h-403 pt-56 text-white text-center mt-24 rounded-[16px] bg-[#171A21] overflow-hidden">
        <div>
          <div className="flex items-center justify-center mb-24">
            <Image src="/logo/logo-purple.png" alt="로고" width={81} height={23} />
          </div>
          <p className="text-2xl font-bold leading-40">한 곳에서 관리하는<br />나만의 와인창고</p>
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/2 h-403">
          <Image src="/banner/main-banner1-pc.png" alt="메인배너1" fill priority className="object-cover" />
        </div>
      </section>

      {/* ✅ 추천 콘텐츠 */}
      <section className="rounded-[16px] bg-white p-8 shadow-md">
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
