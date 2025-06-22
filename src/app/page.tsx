'use client';

import { useRouter } from 'next/navigation';
import CommonButton from '@/components/button/CommonButton';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="pt-90 tablet:pt-118 pc:pt-147 flex flex-col items-center bg-gray-100 px-16 tablet:px-20 gap-48 tablet:gap-80 pc:gap-96 shadow-subtle">

      {/* 메인 배너 */}
      <section className="relative flex flex-col justify-between h-403 w-full max-w-1140 tablet:h-394 pc:h-535 pt-56 tablet:pt-73 pc:pt-110 text-gray-100 text-center mt-24 rounded-[16px] bg-[#171A21] overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-24 tablet:mb-30 w-81 h-23 tablet:w-102 tablet:h-29">
            <Image src="/logo/logo-purple.png" alt="로고" fill className="object-cover" />
          </div>
          <p className="text-2xl tablet:text-[28px] font-bold leading-40 tablet:leading-46">한 곳에서 관리하는<br />나만의 와인창고</p>
        </div>
        <div className="absolute -bottom-10 tablet:bottom-0 left-1/2 -translate-x-1/2  w-3/2 h-403 tablet:w-full tablet:max-w-700 pc:max-w-944 tablet:h-394 pc:h-535">
          <Image src="/banner/main-banner.svg" alt="메인배너1" fill priority className="object-cover" />
        </div>
      </section>

      {/* 서브 배너 1 */}
      <section className="flex justify-between w-full h-424 tablet:h-320 flex-col tablet:flex-row pc:max-w-700 pl-24 pt-24 pb-24 tablet:pb-0 tablet:pt-42 tablet:pl-32 pc:mt-64 rounded-[16px] border border-gray-300 bg-[#EBEEF4] overflow-hidden shadow-sub-banner">
        <div className="flex-1 tablet:flex-none">
          <h2 className="text-xl tablet:text-2xl font-bold mb-8 text-gray-800">매달 새롭게 만나는<br />와인 추천 콘텐츠</h2>
          <p className="text-2xs text-gray-500">매달 다양한 인기 와인을 만나보세요.</p>
        </div>
        <div className="flex self-end tablet:self-auto flex-shrink-0 relative w-290 tablet:w-356 h-240 tablet:h-277">
          <Image
            src="/banner/sub-banner1-mobile.png"
            alt="와인 추천 콘텐츠 배너"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 서브 배너 2 */}
      <section className="flex justify-between w-full h-424 tablet:h-320 flex-col tablet:flex-row pc:max-w-700 pl-24 pt-24 tablet:pb-0 tablet:pt-42 tablet:pl-32 rounded-[16px] border border-gray-300 bg-[#EBEEF4] overflow-hidden shadow-sub-banner">
        <div className="flex flex-col flex-1">
          <h2 className="text-xl tablet:text-2xl font-bold mb-8 tablet:mt-10 text-gray-800">다양한 필터로 찾는<br />내 맞춤 와인</h2>
          <p className="text-2xs text-gray-500">와인 타입, 가격, 평점으로<br />나에게 맞는 와인을 쉽게 검색해요.</p>
          <div className="relative w-162 h-113 hidden tablet:block mt-45">
            <Image
              src="/banner/sub-banner2-tablet.png"
              alt="와인 추천 콘텐츠 배너"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative w-280 h-286 flex-shrink-0 block tablet:hidden self-end">
          <Image
            src="/banner/sub-banner2-mobile.png"
            alt="와인 추천 콘텐츠 배너"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-340 h-280 hidden tablet:block">
          <Image
            src="/banner/sub-banner2-pc.png"
            alt="와인 추천 콘텐츠 배너"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 서브 배너 3 */}
      <section className="flex justify-between  w-full h-424 tablet:h-320 flex-col tablet:flex-row pc:max-w-700 pl-24 pt-24 tablet:pb-0 tablet:pt-0 tablet:pl-32 tablet:pr-42 rounded-[16px] border border-gray-300 bg-[#EBEEF4] overflow-hidden shadow-sub-banner">
        <div className="flex-1">
          <h2 className="text-xl tablet:text-2xl font-bold mb-8 tablet:mt-60 text-gray-800">직관적인<br />리뷰 시스템</h2>
          <p className="text-2xs text-gray-500">더 구체화된 리뷰 시스템으로<br />쉽고 빠르게 와인 리뷰를 살펴보세요.</p>
        </div>
        <div className="self-end flex-shrink-0 relative w-240 h-280 block tablet:hidden ">
          <Image
            src="/banner/sub-banner3-mobile.png"
            alt="와인 추천 콘텐츠 배너"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-241 h-318 hidden tablet:block">
          <Image
            src="/banner/sub-banner3-pc.png"
            alt="와인 추천 콘텐츠 배너"
            fill
            className="object-cover" 
          />
        </div>
      </section>

      <div className="flex justify-center pt-14 pb-62 tablet:pb-72 pc:pb-112">
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
