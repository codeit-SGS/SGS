'use client';

import React, { useState } from 'react';

type WineRegisterProps = {
  onClose: () => void;
  onSuccess: (wineId: number) => void;
  teamId: string;
};

const WineRegister = ({ onClose, onSuccess, teamId }: WineRegisterProps) => {
  const [wineName, setWineName] = useState('');
  const [price, setPrice] = useState('');
  const [origin, setOrigin] = useState('');
  const [type, setType] = useState('Red');
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

    if (!wineName || !price || !origin || !type || !image) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log("🔐 accessToken:", accessToken);

      if (!accessToken) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://winereview-api.vercel.app/${teamId}/wines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: wineName,
          type,
          country: origin,
          price: Number(price),
          rating: 4.0,
        }),
      });

      console.log("📡 status:", response.status);
      const text = await response.text();
      console.log("📨 response body:", text);

      if (!response.ok) {
        throw new Error('와인 등록 실패');
      }

      const data = JSON.parse(text);
      onSuccess(data.id); //
    } catch (err) {
      console.error('등록 에러:', err);
      setError('와인 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setWineName('');
    setPrice('');
    setOrigin('');
    setType('Red');
    setImage(null);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 space-y-25 w-327 h-620 md:w-412 md:h-657"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        <span className='block md:hidden'>필터</span>
        <span className='hidden md:block'>와인 등록</span>
      </h2>

      <div className='space-y-1'>
        <label className='block text-lg font-medium text-gray-800 mb-10'>와인 이름</label>
        <input
          type="text"
          placeholder="와인 이름 입력"
          value={wineName}
          onChange={(e) => setWineName(e.target.value)}
          className="text-lg text-gray-500 w-full border border-gray-300 rounded-xl px-15 py-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className='space-y-1'>
        <label className='block text-lg font-medium text-gray-800 mb-10'>가격</label>
        <input
          type="number"
          placeholder="가격 입력"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-lg text-gray-500 w-full border border-gray-300 rounded-xl px-15 py-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className='space-y-1'>
        <label className='block text-lg font-medium text-gray-800 mb-10'>원산지</label>
        <input
          type="text"
          placeholder="원산지 입력"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="text-lg text-gray-500 w-full border border-gray-300 rounded-xl px-15 py-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className='space-y-1'>
        <label className='block text-lg font-medium text-gray-800 mb-10'>타입</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-lg text-gray-500 w-full border border-gray-300 rounded-xl px-15 py-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Rose">Sparkling</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-lg font-medium text-gray-700 mb-10">와인 사진</label>
        <div className="size-140 border border-gray-300 rounded-2xl bg-gray-50 flex items-center justify-center cursor-pointer">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
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

      {/* 버튼(취소/와인 등록하기) 영역 */}
      <div className="flex justify-between space-x-4 pt-4">
        <button
          type="button"
          className="text-lg w-1/4 py-7 rounded-xl bg-main-10 text-main font-semibold"
          onClick={resetForm}
        >
          취소
        </button>
        <button
          type="submit"
          className="text-lg w-3/4 py-7 rounded-xl bg-main text-white font-semibold"
          disabled={loading}
        >
          {loading ? "등록 중..." : "와인 등록하기"}
        </button>
      </div>
    </form>
  );
};

export default WineRegister;
