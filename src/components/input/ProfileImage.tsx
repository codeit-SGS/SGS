"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfileIconProps {
  className?: string;
  src?: string;
}

export default function ProfileIcon({ className = "size-45", src }: ProfileIconProps) {
  const [isHovering, setIsHovering] = useState(false);

  // 보여줄 이미지 결정: src가 있으면 그걸, 없으면 기본 이미지
  const displaySrc =
    src && src.trim() !== ""
      ? src
      : isHovering
      ? "/img/profile-hover.svg"
      : "/img/profile-default.svg";

  return (
    <div
      className={`${className} relative cursor-pointer`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={displaySrc}
        alt="Profile Icon"
        fill
        className="object-contain w-full h-full"
        style={{ borderRadius: "50%" }}
        sizes="(max-width: 45px) 100vw, 45px"
        priority
      />
    </div>
  );
}
