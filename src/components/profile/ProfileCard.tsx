"use client";

import CommonButton from "@/components/button/CommonButton";
import ProfileImage from "./ProfileImage";

interface ProfileCardProps {
  nickname: string;
}

export default function ProfileCard({
  // profileImageUrl,
  nickname,
}: ProfileCardProps) {
  return (
    <div className="min-w-343 tablet:max-w-704 w-full h-241 tablet:h-247 pc:w-280 pc:h-530 p-20 table:px-40 table:py-23 pc:px-20 pc:py-28 rounded-[16px] border border-gray-300 shadow-subtle bg-white">
      <div className="flex flex-col pc:items-center items-start gap-20 tablet:gap-30 pc:gap-48">
        {/* 프로필 사진 + 닉네임 */}
        <div className="flex items-center pc:flex-col gap-16 tablet:gap-32">
          <ProfileImage className="size-60 tablet:size-80 pc:size-164" />
          <div className="flex flex-col items-start p-0 tablet:pb-34 pc:pb-42">
            <p className="text-xl font-bold text-gray-800">{nickname}</p>
          </div>
        </div>

        {/* 닉네임 입력 및 버튼 */}
        <div className="flex-col tablet:flex tablet:flex-row w-full pc:flex-col">
          <div className="flex flex-col tablet:w-full">
            <label
              htmlFor="nickname"
              className="text-md tablet:text-lg tablet:leading-16 leading-14 font-medium text-gray-800 "
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              placeholder={nickname}
              className="bg-white w-full mt-8 tablet:mt-10 pl-20 py-9 tablet:py-11 pc:py-14  border border-gray-300 rounded-[12px] tablet:rounded-16 text-md tablet:text-lg leading-14 tablet:leading-16 text-gray-500 font-regular  "
            />
          </div>
          <div className="flex justify-end mt-6 tablet:mt-0 tablet:ml-24 tablet:items-end pc:items-center pc:mt-8 pc:ml-0">
            <CommonButton
              variant="profile-change"
              className="w-89 h-42 tablet:w-116 tablet:h-48 pc:w-96 pc:h-42"
            >
              변경하기
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
