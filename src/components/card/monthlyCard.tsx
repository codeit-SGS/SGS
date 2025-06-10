'use client';

const MonthlyCard = () => {
  return (
    <div className="flex flex-col w-full max-w-232 rounded-[12px] bg-white cursor-pointer ml-50 shadow-subtle">
      <div className="flex pt-24 pr-30">
        <div className="relative w-full px-30">
          {/* 와인 이미지 */}
          <img
            src="/wine/wine-type1.svg"
            alt="와인 이미지"
            className="absolute bottom-0 w-full h-full max-w-44 left-1/2 -translate-x-1/2 object-cover"
          />
        </div>
        {/* 텍스트 영역 */}
        <div className="relative flex flex-col justify-between pb-18 gap-5 min-w-100">
          {/* 평점 */}
          <div className="text-left gap-5">
            <p className="text-[36px] text-gray-800 font-bold">4.8</p>
            <div className="flex flex-col">
              {/* 별점 아이콘 */}
              <div className="flex">
                <img src="/icon/purple-star.svg" alt="별1" width={18} height={18} />
                <img src="/icon/purple-star.svg" alt="별2" width={18} height={18} />
                <img src="/icon/purple-star.svg" alt="별3" width={18} height={18} />
                <img src="/icon/purple-star.svg" alt="별4" width={18} height={18} />
                <img src="/icon/star.svg" alt="빈 별" width={18} height={18} />
              </div>
            </div>
          </div>
          {/* 와인 이름 */}
          <h3 className="text-12 text-gray-500 leading-25">
            Sentinel Carbernet Sauvignon 2016
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCard;
