'use client';

import { X } from 'lucide-react'; // ❌ 닫기 아이콘
import StarInput from './StarInput'; // 별점 선택 컴포넌트
import TasteSliderInput from './TasteSliderInput'; // 바디/타닌/당도/산미 슬라이더
import FlavorTagSelector, { flavorToEng } from './FlavorTagSelector'; // 향 선택 태그 버튼
import { useState } from 'react';
import Image from 'next/image';
import { postReview } from '@/lib/api/review';
import { useRouter } from 'next/navigation';

export default function ReviewModal({
  onClose, // 모달 닫기 함수
  wineId, // 리뷰 대상 와인 ID
}: {
  onClose: () => void;
  wineId: number;
}) {
  // ✔️ 와인 아이디 확인
  console.log('💡 ReviewModal wineId:', wineId);

  // ⭐ 별점 상태
  const [rating, setRating] = useState<number>(0);

  // 📝 후기 작성 텍스트 상태(초기값은 빈 문자열)
  const [reviewText, setReviewText] = useState('');

  // 🎚️ 슬라이더 값 상태
  const [sliderValues, setSliderValues] = useState({
    body: 5,
    tannin: 5,
    sweetness: 5,
    acidity: 5,
  });

  // 🌸 사용자가 선택한 향 목록 상태
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  // 🔄 페이지 새로고침용 Router 객체
  const router = useRouter();

  // 슬라이더 변경 시 호출되는 핸들러 (TasteSliderInput에서 사용)
  const handleSliderChange = (
    key: keyof typeof sliderValues,
    value: number
  ) => {
    setSliderValues((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ 리뷰 등록 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    // 🌐 향 태그 한글 → 영어 변환 + undefined 제거
    const englishAromas = selectedFlavors
      .map((tag) => flavorToEng[tag])
      .filter((v): v is string => Boolean(v)); // ❗ undefined 방지

    // ❗ 앞뒤 공백 제거
    const content = reviewText.trim();

    // ⚠️ 사전 유효성 검사 (400 방지용)
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (!content) {
      alert('리뷰 내용을 작성해주세요.');
      return;
    }
    if (englishAromas.length === 0) {
      alert('향을 하나 이상 선택해주세요.');
      return;
    }

    // 📦 API 요청 payload 구성
    const payload = {
      rating,
      lightBold: sliderValues.body,
      smoothTannic: sliderValues.tannin,
      drySweet: sliderValues.sweetness,
      softAcidic: sliderValues.acidity,
      aroma: englishAromas, // 선택된 향을 영어로 변환
      content,
      wineId,
    };

    // ✔️ 리뷰 데이터가 잘 가는지 확인
    console.log('📦 리뷰 전송 payload:', JSON.stringify(payload, null, 2));

    // 🔁 API 호출 → 성공 시 모달 닫고 새로고침
    try {
      const teamId = localStorage.getItem('teamId');
      if (!teamId) throw new Error('teamId가 없습니다!');

      const res = await postReview(payload);
      // ✔️ 등록 되는지 확인
      console.log('리뷰 등록 성공:', res);
      onClose(); //-> 성공하면 모달 닫기
      router.refresh(); //-> 페이지 새로고침
    } catch (err) {
      // ✔️ 등록 실패 인지 확인
      console.error('리뷰 등록 실패:', err);
    }
  };

  return (
    // 바깥 영역 클릭 시 닫기
    <div
      className="p-6 fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      {/*  모달 내부 클릭 시 이벤트 전파 막기 */}
      <div
        className="bg-white w-528 h-1006 rounded-2xl p-10 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
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
        {/*  🍷와인 정보 + ⭐별점 */}
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
              {/* 🍷 와인 이름 */}
              <div className="w-fill h-hug text-lg font-semibold">
                Sentinel Carbernet Sauvignon 2016
              </div>

              {/* ⭐ 별점 선택 */}
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
          {/* 🎚️ 맛 슬라이더 */}
          <div className="mt-10 flex flex-col space-y-6">
            <TasteSliderInput
              values={sliderValues}
              onChange={handleSliderChange}
            />
          </div>
          {/* 🌸 향 선택 */}
          <div className="mt-5 mb-10 w-476 h-270 space-y-6">
            <FlavorTagSelector
              value={selectedFlavors} // 현재 선택된 향 목록
              onChange={setSelectedFlavors} // 태그 클릭 시 업데이트
            />
          </div>
          {/* ✅ 리뷰 등록 버튼 */}
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
