'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/auth';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);

      if (res.status === 200) {
        alert('로그인 성공!');
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
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
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md border border-gray-300 px-12 py-20 flex flex-col items-center gap-10 space-x-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo/logo-bk.svg" alt="Logo" width={64} height={64} priority />
        </div>

        {/* 이메일 */}
        <div className="flex flex-col items-start gap-2.5 h-20 w-full">
          <label className="text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col items-start gap-2.5 h-20 w-full">
          <label className="text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 비밀번호 찾기 */}
        <div className="text-right text-sm text-purple-600 w-full mb-4">
          <Link href="#">비밀번호를 잊으셨나요?</Link>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full text-white font-semibold transition hover:brightness-110 mb-4 flex justify-center items-center rounded-xl h-12 bg-purple-700"
        >
          로그인
        </button>

        {/* 소셜 로그인 */}
        <button
          className="w-full h-12 mb-3 flex items-center justify-center"
          onClick={() =>
            (window.location.href = 'https://myaccount.google.com/')
          }
        >
          <Image src="/img/social-login-google.png" alt="Google로 시작하기" width={200} height={48} />
        </button>

        <button
          className="w-full h-12 mb-6 flex items-center justify-center"
          onClick={() =>
            (window.location.href = 'https://accounts.kakao.com/')
          }
        >
          <Image src="/img/social-login-kakao.png" alt="Kakao로 시작하기" width={200} height={48} />
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
