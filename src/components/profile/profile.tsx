"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProfileIcon() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="w-45 h-45 cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={isHovering ? "/img/profile-hover.svg" : "/img/profile-default.svg"}
        alt="Profile Icon"
        width={174}
        height={174}
      />
    </div>
  );
}
