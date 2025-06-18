import api from './axios';

interface ReviewPayload {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}

export interface ReviewResponse {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  isLiked: any;
  wineId: number;
  teamId: string;
}

// 리뷰 남기기
export async function postReview(payload: ReviewPayload) {
  const res = await api.post('/reviews', payload);
  return res.data;
}

// 리뷰 수정하기
export async function editReview(id: number, payload: ReviewPayload) {
  const res = await api.patch(`/reviews/${id}`, payload);
  return res.data;
}

// 특정 와인의 리뷰 목록 가져오기
export async function ReviewsByWineId(wineId: number) {
  const res = await api.get(`/reviews?wineId=${wineId}`);
  return res.data as ReviewResponse[];
}
