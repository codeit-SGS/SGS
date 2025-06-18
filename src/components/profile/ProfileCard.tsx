"use client";

// 필요한 라이브러리와 컴포넌트 import
import React, { useState, useRef, useEffect } from "react";
import CommonButton from "@/components/button/CommonButton";
import ProfileImage from "../input/ProfileImage";

// ProfileCard 컴포넌트가 받을 수 있는 props(속성) 타입 정의
interface ProfileCardProps {
profileImageUrl: string; // 프로필 이미지 주소
nickname: string; // 현재 닉네임
onChangeNickname: (nickname: string) => void; // 닉네임 변경 시 실행할 함수
onChangeImage: (imageUrl: string) => void; // 이미지 변경 시 실행할 함수
nicknamePlaceholder?: string; // 닉네임 입력창에 보여줄 안내문구(placeholder)
}

// ProfileCard 컴포넌트 정의
const ProfileCard: React.FC<ProfileCardProps> = ({
profileImageUrl,
nickname,
onChangeNickname,
onChangeImage,
nicknamePlaceholder,
}) => {
// 닉네임 입력값을 관리하는 state
const [inputNickname, setInputNickname] = useState(nickname);
// 인풋이 처음 포커스됐는지 여부를 관리하는 state
const [isFirstFocus, setIsFirstFocus] = useState(true);
// 파일 input을 직접 클릭하지 않고 코드로 클릭하기 위해 ref 사용
const fileInputRef = useRef<HTMLInputElement>(null);

// nickname prop이 바뀌면 inputNickname도 같이 바꿔줌(동기화)
useEffect(() => {
setInputNickname(nickname);
}, [nickname]);

// 프로필 이미지를 클릭하면 파일 선택창이 열리도록 하는 함수
const handleImageClick = () => {
fileInputRef.current?.click();
};

// 파일이 선택되면 이미지를 읽어서 부모에게 전달하는 함수
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0];
if (!file) return;
if (file.size > 1024 * 1024 * 5) {
// 5MB 제한
alert("5MB 이하 이미지만 업로드할 수 있습니다.");
return;
}
const reader = new FileReader();
reader.onloadend = () => {
if (typeof reader.result === "string") {
onChangeImage(reader.result); // base64로 변환된 이미지를 부모에게 전달
}
};
reader.readAsDataURL(file);
};

// 닉네임 입력값이 바뀔 때마다 state를 업데이트
const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setInputNickname(e.target.value);
};

// '변경하기' 버튼을 누르면 부모에게 닉네임 변경 요청
const handleNicknameSubmit = () => {
if (inputNickname.trim()) {
onChangeNickname(inputNickname.trim());
}
};

// 인풋이 처음 포커스될 때만 입력값을 빈칸으로 만듦
const handleInputFocus = () => {
if (isFirstFocus) {
setInputNickname("");
setIsFirstFocus(false);
}
};

return (
<div className=" pc:max-w-280 tablet:w-704 min-w-343 h-241 tablet:h-247 pc:h-530 p-20 tablet:px-40 tablet:py-23 pc:px-20 pc:py-28 rounded-[16px] border border-gray-300 shadow-subtle bg-white">
<div className="flex flex-col pc:items-center items-start gap-20 tablet:gap-30 pc:gap-48">
{/* 프로필 사진과 닉네임 표시 영역 */}
<div className="flex items-center pc:flex-col gap-16 tablet:gap-32">
    {/* 프로필 이미지 (클릭하면 파일 선택창이 열림) */}
    <div onClick={handleImageClick} className="cursor-pointer">
    <ProfileImage
        className="size-60 tablet:size-80 pc:size-164"
        src={profileImageUrl}
    />
    {/* 실제 파일 선택 input (화면에는 안 보임) */}
    <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
    />
    </div>
    {/* 현재 닉네임 표시 */}
    <div className="flex flex-col items-start p-0 tablet:pb-34 pc:pb-42">
    <p className="text-xl font-bold text-gray-800">{nickname}</p>
    </div>
</div>

{/* 닉네임 입력창과 변경 버튼 영역 */}
<div className="flex-col tablet:flex tablet:flex-row w-full pc:flex-col">
    <div className="flex flex-col tablet:w-full">
    <label
        htmlFor="nickname"
        className="text-md tablet:text-lg tablet:leading-16 leading-14 font-medium text-gray-800 "
    >
        닉네임
    </label>
    {/* 닉네임 입력 input */}
    <input
        type="text"
        id="nickname"
        value={inputNickname}
        onChange={handleNicknameChange}
        onFocus={handleInputFocus}
        placeholder={nicknamePlaceholder || "닉네임을 입력하세요"}
        className="bg-white w-full mt-8 tablet:mt-10 pl-20 py-9 tablet:py-11 pc:py-14 border border-gray-300 rounded-[12px] tablet:rounded-16 text-md tablet:text-lg leading-14 tablet:leading-16 font-regular text-gray-800 focus:outline-none focus:border-main"
    />
    </div>
    {/* 변경하기 버튼 */}
    <div className="flex justify-end mt-6 tablet:mt-0 tablet:ml-24 tablet:items-end pc:items-center pc:mt-8 pc:ml-0">
    <CommonButton
        variant="profile-change"
        className="w-89 h-42 tablet:w-116 tablet:h-48 pc:w-96 pc:h-42"
        onClick={handleNicknameSubmit}
    >
        변경하기
    </CommonButton>
    </div>
</div>
</div>
</div>
);
};

export default ProfileCard;