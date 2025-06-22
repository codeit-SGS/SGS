'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function GNB() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 로그인 상태 및 초기 프로필 이미지 설정
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);

    if (token) {
      const userData = localStorage.getItem('userInfo');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setProfileImage(parsed.image || '');
        } catch {
          setProfileImage('');
        }
      }
    }

    // 프로필 이미지 실시간 업데이트 감지
    const handleProfileUpdate = () => {
      const updated = JSON.parse(localStorage.getItem('userInfo') || '{}');
      setProfileImage(updated.image || '');
    };

    window.addEventListener('userInfoUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('userInfoUpdated', handleProfileUpdate);
    };
  }, []);

  // localStorage 'userInfo' 변경 시 프로필 이미지 갱신
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userInfo') {
        try {
          const newUser = JSON.parse(e.newValue || '{}');
          setProfileImage(newUser.image || '');
        } catch {
          setProfileImage('');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setProfileImage('');
    router.push('/');
  };

  const pathname = usePathname();

  return (
    <div
      className={`sticky pt-40 -top-40 z-50 w-full ${
        pathname === '/' ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center bg-black w-full max-w-[1140px] h-[70px] px-60 py-4 rounded-[16px] mx-auto">
        <Image
          src="/logo/logo-wh.svg"
          alt="logo"
          width={52}
          height={15}
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <Image
              src={profileImage || '/img/profile-default.svg'}
              alt="프로필 이미지"
              width={38}
              height={38}
              className="rounded-full object-cover cursor-pointer"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            />

            {dropdownVisible && (
              <div className="absolute top-30 tablet:top-60 pc:top-50 right-0 px-4 py-3 bg-white border border-gray-300 rounded-[16px] z-10">
                <button
                  className="block w-full px-16 py-8 tablet:px-30 tablet:py-10 text-md tablet:text-lg rounded-[12px] text-gray-800 text-medium whitespace-nowrap cursor-pointer hover:bg-main-10 hover:text-main"
                  onClick={() => {
                    router.push('/myprofile');
                    setDropdownVisible(false);
                  }}
                >
                  마이페이지
                </button>
                <button
                  className="block w-full px-16 py-8 tablet:px-30 tablet:py-10 text-md tablet:text-lg rounded-[12px] text-gray-800 text-medium whitespace-nowrap cursor-pointer hover:bg-main-10 hover:text-main"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-16">
            <button
              onClick={() => router.push('/login')}
              className="text-white text-[14px] tablet:text-[16px] font-medium"
            >
              로그인
            </button>
            <button
              onClick={() => router.push('/signin')}
              className="text-white text-[14px] tablet:text-[16px] font-medium"
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
