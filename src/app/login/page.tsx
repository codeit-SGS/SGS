'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios'; 
import { login } from '@/lib/api/auth';


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);

      if (res.status === 200) {
        alert('로그인 성공!');

        // Example: save token
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        // Redirect after login
        router.push('/');
      } else {
        alert('로그인 실패. 다시 시도해주세요.');
      }
    } catch (err: any) {
      console.error('Login failed', err.response?.data || err.message);
      alert(`오류 발생: ${err.response?.data?.message || '알 수 없는 오류'}`);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-[16px] shadow-md w-[400px] border border-[#CFDBEA] px-[48px] py-[80px] flex flex-col items-center gap-[10px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo/logo-bk.svg" alt="Logo" className="h-16" />
        </div>

        {/* 이메일 */}
        <div className="flex flex-col items-start gap-[10px] h-[84px] w-full">
          <label className="text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[48px] px-[20px] py-[14px] border border-[#CFDBEA] rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col items-start gap-[10px] h-[84px] w-full">
          <label className="text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[48px] px-[20px] py-[14px] border border-[#CFDBEA] rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 비밀번호 찾기 */}
        <div className="text-right text-sm text-purple-600 w-full mb-4">
          <Link href="#">비밀번호를 잊으셨나요?</Link>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full text-white font-semibold transition hover:brightness-110 mb-4 flex justify-center items-center rounded-[16px]"
          style={{
            height: '50px',
            backgroundColor: '#6A42DB',
          }}
        >
          로그인
        </button>

        {/* 소셜 로그인 */}
        <button
          className="w-full h-[48px] mb-3"
          onClick={() =>
            (window.location.href = 'https://myaccount.google.com/')
          }
        >
          <img src="/img/social-login-google.png" alt="Google로 시작하기" />
        </button>

        <button
          className="w-full h-[48px] mb-6"
          onClick={() =>
            (window.location.href = 'https://accounts.kakao.com/')
          }
        >
          <img src="/img/social-login-kakao.png" alt="Kakao로 시작하기" />
        </button> 

        {/* 회원가입 링크 */}
        <div className="text-center text-sm text-gray-500">
          계정이 없으신가요?{' '}
          <Link href="/signin" className="text-purple-600 font-semibold hover:underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
