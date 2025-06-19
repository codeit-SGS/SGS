'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signup } from '@/lib/api/auth';
import CommonInput from '@/components/input/CommonInput';
import CommonButton from '@/components/button/CommonButton';

const SigninPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await signup(email, nickname, password, passwordConfirm);

      if (res.status === 200 || res.status === 201) {
        alert('회원가입 성공!');
        router.push('/login');
      } else {
        alert('회원가입 실패. 다시 시도해주세요.');
      }
    } catch (err: any) {
      console.error('Signup failed:', err.response?.data || err.message);
      alert(`오류 발생: ${err.response?.data?.message || '알 수 없는 오류'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
      <div className="bg-white rounded-[12px] tablet:rounded-[16px]  shadow-subtle w-343 tablet:w-496 px-48 py-64 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-56 tablet:mb-64">
          <Image src="/logo/logo-bk.svg" alt="Logo" width={104} height={30} />
        </div>
<div className="flex flex-col gap-16 tablet:gap-36 mb-40 tablet:mb-48">
        {/* 이메일 */}
        <CommonInput
          label="이메일"
          type="email"
          placeholder="whyne@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        {/* 닉네임 */}
        <CommonInput
          label="닉네임"
          type="text"
          placeholder="whyne"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={loading}
        />

        {/* 비밀번호 */}
        <CommonInput
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {/* 비밀번호 확인 */}
        <CommonInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          disabled={loading}
        />
</div>
        {/* 가입하기 버튼 */}
        <CommonButton
          variant="auth-submit"
          className={`w-full h-48 mt-2 ${loading ? 'bg-purple-400 cursor-not-allowed opacity-60' : ''}`}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? '가입 중...' : '가입하기'}
        </CommonButton>

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
};

export default SigninPage;
