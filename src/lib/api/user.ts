import api from "./axios";

export const fetchMyProfile = async () => {
  const res = await api.get("users/me");
  return res.data;
};

export const patchMyProfile = async ({
  nickname,
  image,
}: {
  nickname: string;
  image: string;
}) => {
  const res = await api.patch("users/me", { nickname, image });
  return res.data;
};
