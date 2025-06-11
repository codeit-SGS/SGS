 'use client';

const MyCard = () => {
  return (
     <div className="flex flex-col w-full max-w-[800px] px-40 pt-24 pb-18 bg-white rounded-[16px] border border-gray-300">
      {/* 상단: 별점 + 시간 + 옵션 */}
      <div className="flex justify-between pb-20">
        <div className="flex items-center gap-15">
          <div className="flex items-center bg-main-10 text-main text-18 rounded-[12px] font-semibold px-15 py-8 gap-2">
            <img
              src="/icon/purple-star.svg"
              alt="별 아이콘"
              width={20}
              height={20}
            />
            <span>5.0</span>
          </div>
          <span className="text-gray-500 text-16 leading-26">10시간 전</span>
        </div>
        <button>
          <img
            src="/icon/menu.svg" // 점 세개 아이콘
            alt="더보기"
            width={26}
            height={26}
          />
        </button>
      </div>

      {/* 와인명 */}
      <p className="text-16 text-gray-500 leading-26 pb-10">
        Sentinal Carbernet Sauvignon 2016
      </p>

      {/* 리뷰 내용 */}
      <p className="text-16 text-gray-800 leading-26 text-overflow-line3">
        Deep maroon color, tasting notes of blackberry, dark chocolate, plum. Super jammy and bold with
        some smoky after notes. Big flavor. Amazing value (would pay three times the price for it), well
        balanced flavor. Could drink all day everyday with or without food. I need more immediately.
        hout food. I need more immediately
      </p>
    </div>
  );
};

export default MyCard;
