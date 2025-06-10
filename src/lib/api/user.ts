import api from "./axios";

// 내 프로필 정보 GET
export async function fetchMyProfile() {
  const res = await api.get("users/me");
  return res.data;
}

// 내 프로필 정보 PATCH(닉네임, 이미지 변경)
export async function patchMyProfile({
  nickname,
  image,
}: {
  nickname: string;
  image: string;
}) {
  const res = await api.patch("users/me", { nickname, image });
  return res.data;
}
