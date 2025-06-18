'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSignup = async () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }
    try {
      const res = await fetch('https://winereview-api.vercel.app/15-3/auth/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation: passwordConfirm}),
    });

      if (res.ok) {
        router.push('/');
      } else {
        alert('회원가입 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className="bg-white rounded-xl shadow-md w-[400px]"
        style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/logo/logo-bk.svg" alt="Logo" className="h-20" />
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
            placeholder="whyne@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-[20px] py-[14px] border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 닉네임 */}
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
          <label className="text-sm font-medium text-gray-700">닉네임</label>
          <input
            type="text"
            placeholder="whyne"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-[20px] py-[14px] border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-[20px] py-[14px] border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 비밀번호 확인 */}
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
          <label className="text-sm font-medium text-gray-700">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full px-[20px] py-[14px] border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 가입하기 버튼 */}
        <button
          onClick={handleSignup}
          className="w-full text-white font-semibold transition hover:brightness-110"
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
          가입하기
        </button>

        {/* 로그인 링크 */}
        <div className="text-center text-sm text-gray-500">
          계정이 이미 있으신가요?{' '}
          <Link href="/login" className="text-purple-600 font-semibold hover:underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
