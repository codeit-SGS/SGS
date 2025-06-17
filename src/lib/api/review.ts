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

export async function postReview(payload: ReviewPayload) {
  const res = await api.post('/reviews', payload);
  return res.data;
}

export async function editReview(id: number, payload: ReviewPayload) {
  const res = await api.patch(`/reviews/${id}`, payload);
  return res.data;
}
