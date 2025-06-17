'use client';

import { X } from 'lucide-react'; // ❌ 닫기 아이콘
import StarInput from './StarInput'; // 별점 선택 컴포넌트
import SliderInput from './SliderInput'; // 바디/타닌/당도/산미 슬라이더
import FlavorTagSelector from './FlavorTagSelector'; // 향 선택 태그 버튼
import { useState } from 'react';
import Image from 'next/image';
import { postReview } from '@/lib/api/review';
import { useRouter } from 'next/navigation';

export default function ReviewModal({
  onClose,
  wineId,
}: {
  onClose: () => void;
  wineId: number;
}) {
  // 별점 초기값
  const [rating, setRating] = useState<number>(0);

  // 후기 작성 텍스트 상태(초기값은 빈 문자열)
  const [reviewText, setReviewText] = useState('');

  // 슬라이더 값 상태
  const [sliderValues, setSliderValues] = useState({
    body: 5,
    tannin: 5,
    sweetness: 5,
    acidity: 5,
  });

  // 향 태그 선택 상태
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  // 슬라이더 값 초기값
  const router = useRouter();

  const handleSliderChange = (
    key: keyof typeof sliderValues,
    value: number
  ) => {
    setSliderValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      rating,
      lightBold: sliderValues.body,
      smoothTannic: sliderValues.tannin,
      drySweet: sliderValues.sweetness,
      softAcidic: sliderValues.acidity,
      aroma: selectedFlavors.map((f) => f.toUpperCase()), // 선택된 향을 대문자로 변환
      content: reviewText,
      wineId,
    };

    try {
      const res = await postReview(payload);
      console.log('리뷰 등록 성공:', res);
      onClose(); //-> 성공하면 모달 닫기
      router.refresh(); //-> 페이지 새로고침
    } catch (err) {
      console.error('리뷰 등록 실패:', err);
    }
  };

  return (
    <div className="p-6 fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-528 h-1006 rounded-2xl p-10 space-y-6 relative">
        {/* ❌ 닫기 버튼 */}{' '}
        {/* 클릭 시 부모에서 넘긴 onClose 실행 → 모달 닫힘 */}
        <div className="flex items-center justify-between w-480 h-34 mt-20 mx-auto">
          {/* 제목 */}
          <h2 className="text-2xl font-bold text-gray-800">리뷰 등록</h2>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={34} />
          </button>
        </div>
        {/* 와인 정보 + 별점 */}
        <div className="mt-30 p-10 space-y-6">
          <div className="flex items-center gap-3">
            {/* 임시 아이콘 */}
            <div className="p-5">
              <Image
                src="/icon/wine.svg"
                alt="Wine Icon"
                width={54}
                height={54}
                className="p-4 bg-purple-100 rounded-md flex items-center justify-center"
              />
            </div>

            <div>
              {/* 와인 이름 */}
              <div className="w-fill h-hug text-lg font-semibold">
                Sentinel Carbernet Sauvignon 2016
              </div>

              {/* 별점 선택 */}
              <StarInput value={rating} onChange={setRating} />
            </div>
          </div>
          {/* 후기 작성 입력 */}{' '}
          {/* 6개까지 제한, 선택된 항목은 보라색으로 표시 */}
          <textarea
            value={reviewText} // 후기 작성 텍스트 상태
            onChange={(e) => setReviewText(e.target.value)} // 후기 작성 텍스트 상태 업데이트
            maxLength={600} // 최대 600자
            placeholder="후기를 작성해 주세요"
            className="mt-10 mb-5 w-full h-120 border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {/* 맛 슬라이더 */}
          <div className="mt-10 flex flex-col space-y-6">
            <SliderInput values={sliderValues} onChange={handleSliderChange} />
          </div>
          {/* 향 선택 */}
          <div className="mt-5 mb-10 w-476 h-270 space-y-6">
            <FlavorTagSelector
              value={selectedFlavors} // 현재 선택된 향 목록
              onChange={setSelectedFlavors} // 태그 클릭 시 업데이트
            />
          </div>
          {/* 리뷰 등록 버튼 */}
          <button
            onClick={handleSubmit} // 클릭 시 리뷰 제출 함수 실행
            className="w-full h-54 bg-main text-white mt-30 mb-10 py-5 rounded-xl font-semibold hover:bg-purple-600"
          >
            리뷰 남기기
          </button>
        </div>
      </div>
    </div>
  );
}
