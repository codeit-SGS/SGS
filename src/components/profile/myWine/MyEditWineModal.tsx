'use client';

import React, { useState } from 'react';
import CommonButton from '@/components/button/CommonButton';
import { uploadWineImage, editWine } from '@/lib/api/wine';

type WineEditModalProps = {
  onClose: () => void;
  onSuccess: (wineId: number) => void;
  initialData: {
    id: number;
    name: string;
    region: string;
    image: string;
    price: number;
    type: string;
  };
};

const MyEditWineModal = ({ onClose, onSuccess, initialData }: WineEditModalProps) => {
  const [wineName, setWineName] = useState(initialData.name);
  const [price, setPrice] = useState(initialData.price.toString());
  const [origin, setOrigin] = useState(initialData.region);
  const [type, setType] = useState(initialData.type);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wineName || !price || !origin || !type) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      let imageUrl = initialData.image;
      if (image) {
        imageUrl = await uploadWineImage(image);
      }

      await editWine(initialData.id, {
        name: wineName,
        region: origin,
        image: imageUrl,
        price: Number(price),
        type: type.toUpperCase(),
      });
      onSuccess(initialData.id);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 space-y-25 w-327 h-620 md:w-412 md:h-657"
    >
      <h2 className="text-2xl font-bold text-gray-800">와인 정보 수정</h2>
      {/* 입력 필드들 */}
      <div className="space-y-1">
        <label className="block text-lg font-medium text-gray-700 mb-10">
          와인 사진
        </label>
        <div className="size-140 border border-gray-300 rounded-2xl bg-gray-50 flex items-center justify-center cursor-pointer">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="와인 사진"
              className="object-cover size-full"
            />
          ) : initialData.image ? (
            <img
              src={initialData.image}
              alt="와인 사진"
              className="object-cover size-full"
            />
          ) : (
            <label htmlFor="imageUpload" className="cursor-pointer">
              <img
                src="/icon/photo.svg"
                alt="사진 추가 아이콘"
                className="size-32 opacity-50"
              />
            </label>
          )}
          <label htmlFor="imageUpload" className="cursor-pointer absolute inset-0 opacity-0">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
      {/* 나머지 입력 필드 (이름, 가격, 지역, 타입 등) */}
      <div className="space-y-1">
        <label className="block text-lg font-medium text-gray-700">이름</label>
        <input
          type="text"
          value={wineName}
          onChange={e => setWineName(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-lg font-medium text-gray-700">가격</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-lg font-medium text-gray-700">지역</label>
        <input
          type="text"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-lg font-medium text-gray-700">타입</label>
        <input
          type="text"
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      {/* 버튼 영역 */}
      <div className="flex justify-between space-x-4 pt-4">
        <CommonButton
          type="button"
          variant="profile-modal-cancel"
          className="w-1/4 py-7"
          onClick={onClose}
        >
          취소
        </CommonButton>
        <CommonButton
          type="submit"
          variant="profile-modal-update"
          className="w-3/4 py-7"
          disabled={loading}
        >
          {loading ? '수정 중...' : '수정하기'}
        </CommonButton>
      </div>
      {error && <div className="text-red-500 text-sm pt-2">{error}</div>}
    </form>
  );
};

export default MyEditWineModal;
