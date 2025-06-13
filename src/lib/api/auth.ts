// src/lib/api/auth.ts
import api from './axios';

const TEAM_ID = '15-3';

// POST /{teamId}/auth/signUp
export const signup = (
  email: string,
  password: string,
  passwordConfirmation: string,
  nickname: string
) => {
  return api.post(`/${TEAM_ID}/auth/signUp`, {
    email,
    password,
    passwordConfirmation,
    nickname,
  });
};

// POST /{teamId}/auth/signIn
export const login = (email: string, password: string) => {
  return api.post(`/${TEAM_ID}/auth/signIn`, {
    email,
    password,
  });
};

// PATCH /{teamId}/users/me
export const updateUserProfile = (nickname: string) => {
  const token = localStorage.getItem('token');

  return api.patch(
    `/${TEAM_ID}/users/me`,
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
