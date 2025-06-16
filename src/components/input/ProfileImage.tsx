"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfileIconProps {
  className?: string;
}

export default function ProfileIcon({ className = "size-45", }: ProfileIconProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`${className} relative cursor-pointer`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={isHovering ? "/img/profile-hover.svg" : "/img/profile-default.svg"}
        alt="Profile Icon"
        fill
        sizes="100%"
        className="object-contain"
      />
    </div>
  );
}
