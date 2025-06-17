"use client";

// 리액트와 필요한 컴포넌트, API 함수 import
import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import { fetchMyProfile, patchMyProfile } from "@/lib/api/user";

// 레이아웃 컴포넌트 props 타입 정의
interface MyProfileLayoutProps {
  children: React.ReactNode;
}

// 마이프로필 레이아웃 컴포넌트
const MyProfileLayout: React.FC<MyProfileLayoutProps> = ({ children }) => {
  // 프로필 이미지와 닉네임 상태 관리
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  // 컴포넌트가 처음 렌더링될 때 내 프로필 정보 불러오기
  useEffect(() => {
    const getProfile = async () => {
      try {
        // API로 내 프로필 정보 가져오기
        const data = await fetchMyProfile();
        setProfileImageUrl(data.image || ""); // 이미지가 없으면 빈 값
        setNickname(data.nickname || ""); // 닉네임이 없으면 빈 값
      } catch {
        // 에러 발생 시 빈 값으로 초기화
        setProfileImageUrl("");
        setNickname("");
      }
    };
    getProfile();
  }, []);

  // 닉네임 변경 함수 (ProfileCard에서 호출)
  const handleChangeNickname = async (newNickname: string) => {
    try {
      // API로 닉네임 변경 요청
      const data = await patchMyProfile({
        nickname: newNickname,
        image: profileImageUrl,
      });
      setNickname(data.nickname || newNickname); // 변경된 닉네임 반영
    } catch {
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  // 이미지 변경 함수 (ProfileCard에서 호출)
  const handleChangeImage = async (newImageUrl: string) => {
    try {
      // API로 이미지 변경 요청
      const data = await patchMyProfile({ nickname, image: newImageUrl });
      setProfileImageUrl(data.image || newImageUrl); // 변경된 이미지 반영
    } catch {
      alert("이미지 변경에 실패했습니다.");
    }
  };

  // 실제 화면 렌더링
  return (
    <div className="max-w-1140 mt-20 p-20 pc:p-0 mx-auto">
      <header className="p-20 mb-20 pc:pb-37 text-center text-2xl font-bold bg-black text-white rounded-[16px] h-70 w-full">
        gnb
      </header>

      <div className="flex flex-col pc:flex-row items-center pc:items-start justify-start pc:justify-between gap-y-30 tablet:gap-y-37 pc:gap-0">        
        <section className="flex flex-col items-center w-auto">
          {/* 프로필 카드에 상태와 함수 props로 전달 */}
          <ProfileCard
            profileImageUrl={profileImageUrl}
            nickname={nickname}
            onChangeNickname={handleChangeNickname}
            onChangeImage={handleChangeImage}
            nicknamePlaceholder="변경할 닉네임을 입력해주세요."
          />
        </section>
        
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MyProfileLayout;
