'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signup, login, updateUserProfile } from '@/lib/api/auth';

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // Step 1 → Sign Up
      const signupRes = await signup(email, password);

      if (signupRes.status === 201 || signupRes.status === 200) {
        // Step 2 → Login to get token
        const loginRes = await login(email, password);

        if (loginRes.status === 200) {
          // Step 3 → PATCH nickname
          await updateUserProfile(nickname);

          alert('회원가입 성공! 로그인 해주세요.');
          router.push('/login');
        } else {
          alert('로그인 실패했습니다.');
        }
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log('Error response:', error.response);
        alert(`오류 발생: ${error.response.status}`);
      } else {
        alert('네트워크 오류 또는 서버 연결 실패');
      }
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
        <div className="flex flex-col h-[84px] gap-[10px] w-full">
          <label className="text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[48px] px-[20px] py-[14px] border border-[#CFDBEA] rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col h-[84px] gap-[10px] w-full">
          <label className="text-sm font-medium text-gray-700">닉네임</label>
          <input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full h-[48px] px-[20px] py-[14px] border border-[#CFDBEA] rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col h-[84px] gap-[10px] w-full">
          <label className="text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            placeholder="영문, 숫자 포함 8자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[48px] px-[20px] py-[14px] border border-[#CFDBEA] rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col h-[84px] gap-[10px] w-full">
          <label className="text-sm font-medium text-gray-700">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-[48px] px-[20px] py-[14px] border border-[#CFDBEA] rounded-[16px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 가입하기 버튼 */}
        <button
          onClick={handleSignup}
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
          가입하기
        </button>

        {/* 로그인 링크 */}
        <div className="text-center text-sm text-gray-500 mt-2">
          계정이 이미 있으신가요?{' '}
          <Link href="/login" className="text-purple-600 font-semibold hover:underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
