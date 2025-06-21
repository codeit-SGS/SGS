import axios from "axios";

// JWT의 payload를 파싱하는 함수
function parseJwt(token) {
  try {
    // JWT는 "header.payload.signature" 형태이므로, payload만 디코딩
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

// axios 인스턴스 생성 (API 기본 URL 설정)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 토큰 리프레시 중복 방지 및 대기 큐
let isRefreshing = false;
let refreshSubscribers = [];

// 토큰이 갱신되면 대기 중인 요청들에 새 토큰 전달
function onRefreshed(token) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

// 토큰 갱신 대기 큐에 콜백 추가
function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

// 요청 인터셉터: 매 요청마다 access token 만료 임박 시 자동 갱신
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("accessToken");
      if (token) {
        // access token의 만료 시간(exp) 확인
        const payload = parseJwt(token);
        const now = Math.floor(Date.now() / 1000);
        // 만료 5분 이내면 refresh 시도
        if (payload && payload.exp && payload.exp - now < 300) {
          // 이미 리프레시 중이 아니면 리프레시 시작
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const refreshToken = localStorage.getItem("refreshToken");
              // refresh token으로 access token 재발급 요청
              const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
                }
              );
              // 새 access token 저장
              const newAccessToken = res.data.accessToken;
              localStorage.setItem("accessToken", newAccessToken);
              token = newAccessToken;
              // 대기 중인 요청들에 새 토큰 전달
              onRefreshed(newAccessToken);
            } catch (e) {
              // 리프레시 실패 시 로그아웃 처리
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.href = "/login";
              return Promise.reject(e);
            } finally {
              isRefreshing = false;
            }
          }

          // 리프레시 중이면 대기
          await new Promise((resolve) => {
            addRefreshSubscriber(resolve);
          });
          token = localStorage.getItem("accessToken");
        }
        // Authorization 헤더에 access token 추가
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 토큰 재발급 및 재요청
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401 에러 & 재시도 안 했을 때만 동작
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // refresh token으로 access token 재발급 요청
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // 새 토큰으로 헤더 갱신 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 시 로그아웃 등 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
