"use client";

// 리액트와 필요한 컴포넌트, API 함수 import
import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import { fetchMyProfile } from "@/lib/api/user";
import { uploadImageToServer } from "@/lib/api/image";
import { patchMyProfile } from "@/lib/api/user";

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
      const data = await patchMyProfile({
        nickname: newNickname,
        image: profileImageUrl,
        prevNickname: nickname,
        prevImage: profileImageUrl,
      });
      setNickname(data.nickname || newNickname); // 변경된 닉네임 반영
    } catch {
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  // 이미지 변경 함수 (ProfileCard에서 호출)
  const handleChangeImage = async (fileOrUrl: File | string) => {
    try {
      let imageUrl = "";
      if (typeof fileOrUrl === "string") {
        // 이미 URL이면 그대로 사용
        imageUrl = fileOrUrl;
      } else {
        // 파일이면 업로드 후 URL 획득
        imageUrl = await uploadImageToServer(fileOrUrl);
      }
      // PATCH로 이미지 URL만 전달
      const data = await patchMyProfile({
        nickname,
        image: imageUrl,
        prevNickname: nickname,
        prevImage: profileImageUrl,
      });
      setProfileImageUrl(data.image || imageUrl);
    } catch {
      alert("이미지 변경에 실패했습니다.");
    }
  };

  // 실제 화면 렌더링
  return (
    <div className="max-w-1140 mt-20 p-20 pc:p-0 mx-auto">   
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
