import api from './axios';

// 와인 등록
export const registerWine = async (payload: {
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}) => {
  const res = await api.post('/wines', payload);
  return res.data;
};

// 와인 수정
export const editWine = async (
  wineId: number,
  payload: { name: string; region: string; image: string; price: number; type: string }
) => {
  const res = await api.patch(`/wines/${wineId}`, payload);
  return res.data;
};

// 와인 삭제
export const deleteWine = async (wineId: number) => {
  const res = await api.delete(`/wines/${wineId}`);
  return res.data;
};

// 와인 단일 조회
export const fetchWineById = async (wineId: number) => {
  const res = await api.get(`/wines/${wineId}`);
  return res.data;
};

// 내가 만든 와인 목록 조회 (명세서 기준)
export const fetchMyWines = async (limit = 20) => {
  const res = await api.get(`/users/me/wines?limit=${limit}`);
  if (Array.isArray(res.data.list)) return res.data.list;
  return [];
};

// 이미지 업로드
export const uploadWineImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  const res = await api.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.url;
};
