import api from "./axios";

export const fetchMyProfile = async () => {
  const res = await api.get("users/me");
  return res.data;
};

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

export const fetchMyReviews = async () => {
  const res = await api.get("users/me/reviews");
  return res.data;
};

export const fetchMyWines = async () => {
  const res = await api.get("users/me/wines");
  return res.data;
};
