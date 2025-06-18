'use client';

import { useRouter } from 'next/navigation';
import CommonButton from '@/components/button/CommonButton';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col bg-gray-100 px-16 gap-48">

      {/* 메인 배너 */}
      <section className="relative flex flex-col justify-between h-403 pt-56 text-white text-center mt-24 rounded-[16px] bg-[#171A21] overflow-hidden">
        <div>
          <div className="flex items-center justify-center mb-24">
            <Image src="/logo/logo-purple.png" alt="로고" width={81} height={23} />
          </div>
          <p className="text-2xl font-bold leading-40">한 곳에서 관리하는<br />나만의 와인창고</p>
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/2 h-403">
          <Image src="/banner/main-banner.svg" alt="메인배너1" fill priority className="object-cover" />
        </div>
      </section>

      {/* 서브 배너 1 */}
      <section className="flex justify-between h-424 flex-col pl-24 py-24 rounded-[16px] border border-gray-300 bg-[#EBEEF4] overflow-hidden shadow-sub-banner">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-8 text-gray-800">매달 새롭게 만나는<br />와인 추천 콘텐츠</h2>
          <p className="text-2xs text-gray-500">매달 다양한 인기 와인을 만나보세요.</p>
        </div>
        <div className="flex self-end flex-shrink-0 relative w-290 h-240">
          <Image
            src="/banner/sub-banner1-mobile.png"
            alt="와인 추천 콘텐츠 배너"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 서브 배너 2 */}
      <section className="flex justify-between h-424 flex-col pl-24 pt-24 rounded-[16px] border border-gray-300 bg-[#EBEEF4] overflow-hidden shadow-sub-banner">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-8 text-gray-800">다양한 필터로 찾는<br />내 맞춤 와인</h2>
          <p className="text-2xs text-gray-500">와인 타입, 가격, 평점으로<br />나에게 맞는 와인을 쉽게 검색해요.</p>
        </div>
        <div className="flex self-end flex-shrink-0 relative w-280 h-286">
          <Image
            src="/banner/sub-banner2-mobile.png"
            alt="와인 추천 콘텐츠 배너"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 서브 배너 3 */}
      <section className="flex justify-between h-424 flex-col pl-24 pt-24 rounded-[16px] border border-gray-300 bg-[#EBEEF4] overflow-hidden shadow-sub-banner">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-8 text-gray-800">직관적인<br />리뷰 시스템</h2>
          <p className="text-2xs text-gray-500">더 구체화된 리뷰 시스템으로<br />쉽고 빠르게 와인 리뷰를 살펴보세요.</p>
        </div>
        <div className="flex self-end flex-shrink-0 relative w-240 h-280">
          <Image
            src="/banner/sub-banner3-mobile.png"
            alt="와인 추천 콘텐츠 배너"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <div className="flex justify-center pt-14 pb-62">
        <CommonButton
          variant="landing-go-to-wine"
          onClick={() => router.push('/wines')}
          className="w-280 py-16"
        >
          와인 보러가기
        </CommonButton>
      </div>

    </main>
  );
}
