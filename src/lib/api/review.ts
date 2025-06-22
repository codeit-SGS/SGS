import api from './axios';

export interface WineDetail {
  id: number;
  name: string;
  region: string;
  price: number;
  image: string;
}

export interface ReviewPayload {
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

// 와인 데이터 받아오기
export async function getWineData(id: number): Promise<WineDetail> {
  try {
    const response = await api.get(`/wines/${id}`);
    return response.data;
  } catch (error) {
    console.error('와인 데이터를 받아오지 못했습니다:', error);
    throw error;
  }
}

// 리뷰 남기기
export async function postReview(payload: ReviewPayload) {
  try {
    const res = await api.post(`/reviews`, payload);
    return res.data;
  } catch (error) {
    console.error('리뷰를 남기는데 실패했습니다:', error);
    throw error;
  }
}

// 리뷰 수정하기
export async function editReview(id: number, payload: ReviewPayload) {
  try {
    const res = await api.patch(`/reviews/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error('리뷰를 수정하지 못했습니다:', error);
    throw error;
  }
}

// 특정 와인의 리뷰 목록 가져오기
export async function getReview(wineId: number) {
  try {
    const res = await api.get(`/wines/${wineId}`);
    console.log('📥 리뷰 응답:', res.data);
    return res.data.reviews;
  } catch (error) {
    console.error('와인의 리뷰 목록을 가져오지 못했습니다:', error);
    throw error;
  }
}

// 리뷰 카드 좋아요 추가
export const likeReview = async (reviewId: number) => {
  return await api.post(`/reviews/${reviewId}/like`);
};

// 리뷰 카드 좋아요 취소 (만약 DELETE 방식이라면, 이건 백엔드 명세에 따라 다름)
export const unlikeReview = async (reviewId: number) => {
  return await api.delete(`/reviews/${reviewId}/like`);
};

// 리뷰 삭제
export const deleteReview = async (reviewId: number) => {
  const res = await api.delete(`/wines/${reviewId}`);
  return res.data;
};
