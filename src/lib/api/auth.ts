// src/lib/api/auth.ts

import api from './axios';

// .env 파일에서 NEXT_PUBLIC_API_URL에 이미 /15-3/가 포함되어 있으므로
// axios 인스턴스(api)는 baseURL: https://...app/15-3/ 로 설정됨
// 따라서 아래 endpoint에는 teamId를 중복해서 넣지 않아야 함

// 회원가입
export const signup = (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string
) => {
  return api.post(`auth/signUp`, {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
};

// 로그인
export const login = (email: string, password: string) => {
  return api.post(`auth/signIn`, {
    email,
    password,
  });
};

// 내 프로필 수정
export const updateUserProfile = (nickname: string) => {
  const token = localStorage.getItem('token');
  return api.patch(
    `users/me`,
    {
      nickname,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
