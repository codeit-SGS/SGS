import React, { useState } from "react";

interface ProfileCardProps {
  profileImageUrl: string;
  name: string;
  nickname: string;
  onChangeNickname: (newNickname: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileImageUrl,
  name,
  nickname,
  onChangeNickname,
}) => {
  const [inputValue, setInputValue] = useState(nickname);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangeClick = () => {
    if (inputValue.trim() && inputValue !== nickname) {
      onChangeNickname(inputValue.trim());
    }
  };

  return (
    <div className="border border-white rounded-8 p-24 max-w-320 flex flex-col items-center">
      <img
        src={profileImageUrl}
        alt="프로필 이미지"
        className="
          w-80 h-80 rounded-full objectFit-cover mb-16"
      />
      <div
        className="font-bold mb-8 text- "
        style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}
      >
        {name}
      </div>
      <div style={{ color: "#888", marginBottom: 16 }}>닉네임: {nickname}</div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="새 닉네임 입력"
        style={{
          padding: 8,
          borderRadius: 4,
          border: "1px solid #ccc",
          marginBottom: 8,
          width: "100%",
        }}
      />
      <button
        onClick={handleChangeClick}
        style={{
          padding: "8px 16px",
          borderRadius: 4,
          border: "none",
          background: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        변경하기
      </button>
    </div>
  );
};

export default ProfileCard;
