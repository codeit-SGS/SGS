'use client';

import React, { useState } from 'react';
import { uploadWineImage, editWine } from '@/lib/api/wine';

type WineEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  initialData: {
    id: number;
    name: string;
    region: string;
    image: string;
    price: number;
    type: string;
  };
};

const MyEditWineModal = ({ isOpen, onClose, onEditSuccess, initialData }: WineEditModalProps) => {
  // 1. 먼저 useState 등 모든 Hook을 선언
  const [wineName, setWineName] = useState(initialData.name);
  const [price, setPrice] = useState(initialData.price.toString());
  const [origin, setOrigin] = useState(initialData.region);
  const [type, setType] = useState(initialData.type);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. 그 다음에 조건문으로 렌더링 제어
  if (!isOpen) return null;

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
      onEditSuccess();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setWineName(initialData.name);
    setPrice(initialData.price.toString());
    setOrigin(initialData.region);
    setType(initialData.type);
    setImage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center overflow-y-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="fixed inset-0 z-50 tablet:static tablet:min-w-460 w-full tablet:max-w-[460px]  top-[50px] tablet:top-auto bottom-0 left-0 right-0  flex flex-col gap-24 p-24 bg-white rounded-[16px] shadow-xl tablet:h-[95vh] tablet:max-h-[840px]">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">
          <span className="block tablet:hidden">필터</span>
          <span className="hidden tablet:block">내가 등록한 와인</span>
        </h2>

        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-800 mb-10">와인 이름</label>
          <input
            type="text"
            placeholder="와인 이름 입력"
            value={wineName}
            onChange={e => setWineName(e.target.value)}
            className="text-lg text-gray-500 w-full border border-gray-300 rounded-xl px-20 py-14 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-800 mb-10">가격</label>
          <input
            type="number"
            placeholder="가격 입력"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="text-lg text-gray-500 w-full border border-gray-300 rounded-xl px-20 py-14 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-800 mb-10">원산지</label>
          <input
            type="text"
            placeholder="원산지 입력"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            className="text-lg text-gray-500 w-full border border-gray-300 rounded-xl px-20 py-14 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-800 mb-10">타입</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="text-lg text-gray-500 w-full border border-gray-300 rounded-xl px-20 py-14 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Sparkling">Sparkling</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-700 mb-10">와인 사진</label>
          <div className="size-140 border border-gray-300 rounded-2xl bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="와인 사진"
                className="object-contain w-full h-full"
              />
            ) : (
              <label htmlFor="imageUpload" className="cursor-pointer w-full h-full">
                <img
                  src={initialData.image}
                  alt="와인 사진"
                  className="object-contain w-full h-full"
                />
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex justify-between space-x-4 pt-15 gap-8">
          <button
            type="button"
            className="text-lg w-1/4 py-16 rounded-xl bg-main-10 text-main font-semibold"
            onClick={resetForm}
          >
            취소
          </button>
          <button
            type="submit"
            className="text-lg w-3/4 py-16 rounded-xl bg-main text-white font-semibold"
            disabled={loading}
          >
            {loading ? '수정 중...' : '수정하기'}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm pt-2">{error}</div>}
      </form>
    </div>
  );
};

export default MyEditWineModal;
