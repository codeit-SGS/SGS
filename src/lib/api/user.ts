import api from "./axios";

// 내 프로필 조회
export const fetchMyProfile = async () => {
  const res = await api.get("users/me");
  return res.data;
};

// 내 프로필 수정
export const patchMyProfile = async ({
  nickname,
  image,
  prevNickname,
  prevImage,
}: {
  nickname?: string;
  image?: string;
  prevNickname: string;
  prevImage: string;
}) => {
  // nickname이나 image가 빈 문자열이면 기존 값 사용
  const payload: { nickname: string; image: string } = {
    nickname: nickname && nickname.trim() !== "" ? nickname : prevNickname,
    image: image && image.trim() !== "" ? image : prevImage,
  };
  const res = await api.patch("users/me", payload);
  return res.data;
};

// 내가 쓴 리뷰 목록
export const fetchMyReviews = async (limit = 20) => {
  const res = await api.get("users/me/reviews", { params: { limit } });
  return res.data.list; // 반드시 .list로 반환!
};

// 내가 등록한 와인 목록
export const fetchMyWines = async (limit = 20) => {
  const res = await api.get("users/me/wines", { params: { limit } });
  return res.data.list;
};
