'use client';

const WineCard = () => {
  return (
    <div className="flex flex-col w-full max-w-800 rounded-[16px] bg-white border border-gray-300 cursor-pointer">
      <div className="flex pt-36.5 pr-50">
        <div className="relative w-full max-w-200 pt-40 mr-20">
          {/* 와인 이미지 */}
          <img
            src="/wine/wine-type1.svg"
            alt="와인 이미지"
            className="absolute bottom-0 w-full h-full max-w-60 left-1/2 -translate-x-1/2 object-cover"
          />
        </div>
        {/* 텍스트 영역 */}
        <div className="relative flex flex-col justify-between flex-1">
          {/* 상단 정보 */}
          <div className="flex justify-between items-start">
            <div className="max-w-300">
              <h3 className="text-3xl font-bold text-gray-800 leading-42 pb-20">
                Sentinel Carbernet Sauvignon 2016
              </h3>
              <p className="text-16 text-gray-500 leading-26 pb-16">
                Western Cape, South Africa
              </p>
              <div className="inline-block text-18 font-bold py-8 px-15 rounded-[12px] bg-main-10 text-main mb-23.5">
                ₩ 64,990
              </div>
            </div>

            {/* 평점 */}
            <div className="text-left">
              <p className="text-[48px] text-gray-800 gap-10 font-bold">4.8</p>
              <div className="flex flex-col gap-10 items-start">
                {/* 별점 아이콘 */}
                <div className="flex">
                  <img src="/icon/purple-star.svg" alt="별1" width={24} height={24} />
                  <img src="/icon/purple-star.svg" alt="별2" width={24} height={24} />
                  <img src="/icon/purple-star.svg" alt="별3" width={24} height={24} />
                  <img src="/icon/purple-star.svg" alt="별4" width={24} height={24} />
                  <img src="/icon/star.svg" alt="빈 별" width={24} height={24} />
                </div>
                <span className="text-gray-500 text-14 leading-24">47개의 후기</span>
              </div>
            </div>
            {/* right 아이콘 */}
            <div className="absolute bottom-23.5 right-0">
              <img
                src="/img/icon/right.svg"
                alt="오른쪽 화살표 아이콘"
                className="w-36 h-36"
              />
            </div>
          </div>
        </div>
      </div>
      {/* 최신 후기 */}
      <div className="h-full text-16 gap-10 py-20 px-60 border-t border-gray-300">
        <p className="font-semibold text-gray-800 mb-10">최신 후기</p>
        <p className="text-gray-500 leading-26">
          Cherry, cocoa, vanilla and clove - beautiful red fruit driven
          Amarone. Low acidity and medium tannins. Nice long velvety finish.
        </p>
      </div>
    </div>
  );
};

export default WineCard;
