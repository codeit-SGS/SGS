'use client';

const DetailCard = () => {
  return (
    <div className="flex flex-col w-full max-w-1140 rounded-[12px] bg-white cursor-pointer border border-gray-300">
      <div className="flex pt-51 pr-45">
        <div className="relative w-full px-100 max-w-250">
          {/* 와인 이미지 */}
          <img
            src="/wine/wine-type2.svg"
            alt="와인 이미지"
            className="absolute bottom-0 w-full h-full max-w-58 left-1/2 -translate-x-1/2 object-cover"
          />
        </div>
        {/* 텍스트 영역 */}
        <div className="flex flex-col justify-between gap-5">
          <div className="max-w-300">
            <h3 className="text-3xl font-bold text-gray-800 pb-20">
              Sentinel Carbernet Sauvignon 2016
            </h3>
            <p className="text-16 text-gray-500 leading-26 pb-13">
              Western Cape, South Africa
            </p>
            <div className="inline-block text-18 font-bold py-5 px-15 rounded-[12px] bg-main-10 text-main mb-40">
              ₩ 64,990
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
