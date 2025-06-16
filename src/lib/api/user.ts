import api from "./axios";

<<<<<<< HEAD
// 내 프로필 정보 GET
export async function fetchMyProfile() {
  const res = await api.get("users/me");
  return res.data;
}

// 내 프로필 정보 PATCH(닉네임, 이미지 변경)
export async function patchMyProfile({
=======
export const fetchMyProfile = async () => {
  const res = await api.get("users/me");
  return res.data;
};
/*
users/me 엔드포인트로 GET 요청을 보냅니다.
서버에서 내 프로필 정보를 받아옵니다.
응답 객체(res)에서 실제 데이터(res.data)만 반환합니다.
*/

export const patchMyProfile = async ({
>>>>>>> 84eab7c12535cc0a1867fc0bbe61240b0479e1f7
  nickname,
  image,
}: {
  nickname: string;
  image: string;
<<<<<<< HEAD
}) {
  const res = await api.patch("users/me", { nickname, image });
  return res.data;
}
=======
}) => {
  const res = await api.patch("users/me", { nickname, image });
  return res.data;
};
/*
users/me 엔드포인트로 PATCH 요청을 보냅니다.
요청 본문에 { nickname, image }를 담아 보냅니다.
서버에서 내 프로필(닉네임, 이미지)을 수정합니다.
응답 객체(res)에서 실제 데이터(res.data)만 반환합니다.
 */
>>>>>>> 84eab7c12535cc0a1867fc0bbe61240b0479e1f7
