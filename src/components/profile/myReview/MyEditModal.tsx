'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import StarInput from '@/components/wineDetail/StarInput';
import TasteSliderInput from '@/components/wineDetail/TasteSliderInput';
import FlavorTagSelector from '@/components/wineDetail/FlavorTagSelector';
import { TasteData } from '@/types/tasteType';
import { editReview } from '@/lib/api/review';

const aromaMap: Record<string, string> = {
  '체리': 'CHERRY',
  '베리': 'BERRY',
  '오크': 'OAK',
  '바닐라': 'VANILLA',
  '후추': 'PEPPER',
  '제빵': 'BAKING',
  '풀': 'GRASS',
  '사과': 'APPLE',
  '복숭아': 'PEACH',
  '시트러스': 'CITRUS',
  '트로피컬': 'TROPICAL',
  '미네랄': 'MINERAL',
  '꽃': 'FLOWER',
  '담뱃잎': 'TOBACCO',
  '흙': 'EARTH',
  '초콜릿': 'CHOCOLATE',
  '스파이스': 'SPICE',
  '카라멜': 'CARAMEL',
  '가죽': 'LEATHER',
};

// ✨ props 타입 정의
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditSuccess?: () => void; // 추가
  initialData: {
    rating: number;
    content: string;
    taste: TasteData;
    aroma: string[];
    wineId: number;
    wineName: string;
    reviewId: number;
  };
}

export default function EditModal({ onClose, onEditSuccess, initialData }: EditModalProps) {
  // ⭐ 각 필드 상태
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [sliderValues, setSliderValues] = useState<TasteData>({
    body: 50,
    tannin: 50,
    sweetness: 50,
    acidity: 50,
  });
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // 🔒 중복 제출 방지

  // ✅ 초기값 세팅
  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating);
      setReviewText(initialData.content);
      setSliderValues(initialData.taste);
      setSelectedFlavors(initialData.aroma);
    }
  }, [initialData]);

  // 💾 슬라이더 핸들러
  const handleSliderChange = (key: keyof TasteData, value: number) => {
    setSliderValues((prev) => ({ ...prev, [key]: value }));
  };

  // 📤 제출 핸들러
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        content: reviewText,
        rating,
        lightBold: sliderValues.body,
        smoothTannic: sliderValues.tannin,
        drySweet: sliderValues.sweetness,
        softAcidic: sliderValues.acidity,
        aroma: selectedFlavors.map((kor) => aromaMap[kor]).filter(Boolean),
      };
      console.log('PATCH payload:', payload);
      await editReview(initialData.reviewId, payload);
      onClose();
      onEditSuccess?.(); // ✅ 수정 성공 시 콜백 호출
    } catch (e) {
      alert('수정 실패: ' + (e as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-528 h-1006 rounded-2xl p-10 space-y-6 relative">
        {/* ❌ 모달 헤더 */}
        <div className="flex items-center justify-between w-480 h-34 mt-20 mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">리뷰 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={34} />
          </button>
        </div>

        {/* 🍷 와인 정보 + 별점 */}
        <div className="mt-30 p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-5">
              <Image
                src="/icon/wine.svg"
                alt="Wine Icon"
                width={54}
                height={54}
                className="p-4 bg-purple-100 rounded-md"
              />
            </div>
            <div>
              <div className="text-lg font-semibold">
                {initialData.wineName}
              </div>
              <StarInput value={rating} onChange={setRating} />
            </div>
          </div>

          {/* 📝 후기 텍스트 입력 */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={600}
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
              value={selectedFlavors}
              onChange={setSelectedFlavors}
            />
          </div>

          {/* ✅ 제출 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full h-54 mt-30 mb-10 py-5 rounded-xl font-semibold transition ${
              isSubmitting
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-main text-white hover:bg-purple-600'
            }`}
          >
            {isSubmitting ? '수정 중...' : '수정하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
