"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/profileCard";
import { fetchMyProfile, patchMyProfile } from "@/lib/api/user";

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("닉네임을 변경해주세요");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchMyProfile();
        setProfileImageUrl(data.image || "");
        setName(data.name || "");
        setNickname(data.nickname || "닉네임을 변경해주세요");
      } catch {
        setProfileImageUrl("");
        setName("");
        setNickname("닉네임을 변경해주세요");
      }
    };

    fetchProfile();
  }, []);

  const handleChangeNickname = async (newNickname: string) => {
    try {
      await patchMyProfile({ nickname: newNickname, image: profileImageUrl });
      setNickname(newNickname);
    } catch {
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  return (
    <main>
      <ProfileCard
        profileImageUrl={profileImageUrl}
        name={name}
        nickname={nickname}
        onChangeNickname={handleChangeNickname}
      />
      {children}
    </main>
  );
}
