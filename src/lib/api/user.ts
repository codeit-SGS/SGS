import api from "./axios";

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
  nickname,
  image,
}: {
  nickname: string;
  image: string;
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

export const fetchMyReviews = async () => {
  const res = await api.get("users/me/reviews");
  return res.data;
};
/*
users/me/reviews 엔드포인트로 GET 요청을 보냅니다.
서버에서 내 리뷰 목록을 받아옵니다.
응답 객체(res)에서 실제 데이터(res.data)만 반환합니다.
*/