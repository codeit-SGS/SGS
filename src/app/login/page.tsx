'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('https://your.api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        alert('이메일 혹은 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className="bg-white rounded-[16px] shadow-md w-[400px] border border-[#CFDBEA]"
        style={{
          padding: '80px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo/logo-bk.svg" alt="Logo" className="h-16" />
        </div>

        {/* 이메일 */}
        <div
          style={{
            display: 'flex',
            height: '84px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
            alignSelf: 'stretch',
          }}
        >
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
        <div
          style={{
            display: 'flex',
            height: '84px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
            alignSelf: 'stretch',
          }}
        >
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
          className="w-full text-white font-semibold transition hover:brightness-110 mb-4"
          style={{
            height: '50px',
            padding: '16px 0',
            borderRadius: '16px',
            backgroundColor: '#6A42DB',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          로그인
        </button>

        {/* 소셜 로그인 */}
        <button className="w-full h-[48px] mb-3">
          <img src="/img/social-login-google.png" alt="Google로 시작하기" />
        </button>

        <button className="w-full h-[48px] mb-6">
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
