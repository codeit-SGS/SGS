"use client";

import { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "social-google"
  | "social-kakao"
  | "modal-cancel"
  | "modal-submit"
  | "signup"
  | "review";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  className?: string;
  icon?: React.ReactNode; // 아이콘을 위한 prop 추가
}

export default function CommonButton({
  children,
  variant,
  className = "",
  icon,
  ...props
}: CommonButtonProps) {
  const hasIcon = variant === "social-google" || variant === "social-kakao";
  const baseStyle =
    "flex items-center justify-center text-center cursor-pointer ";

  const variantStyles: Record<ButtonVariant, string> = {
    // 소셜 로그인 버튼들
    "social-google":
      "w-303 h-48 gap-[10px] py-14 rounded-[12px] text-md text-gray-800 border border-gray-300 bg-white font-medium tablet:w-400 tablet:h-52 tablet:gap-12 tablet:text-lg",
    "social-kakao":
      "w-303 h-48 gap-[10px] py-14 rounded-[12px] text-md text-gray-800 border border-gray-300 bg-white font-medium tablet:w-400 tablet:h-52 tablet:gap-12 tablet:text-lg",

    // 모달 버튼들
    "modal-cancel":
      "w-61 h-40 px-18 py-16 rounded-[12px] text-md text-gray-500 border border-gray-300 bg-white font-medium tablet:w-68 tablet:h-42 tablet:px-20 tablet:text-lg",
    "modal-submit":
      "w-100 h-40 px-18 py-16 rounded-[12px] text-md text-white bg-primary-purple font-bold border-none tablet:w-113 tablet:h-42 tablet:px-20 tablet:text-lg",

    // 가입하기 버튼
    signup:
      "w-343 h-48 px-172 py-16 rounded-[12px] text-md text-white bg-primary-purple font-bold tablet:w-400 tablet:h-50 tablet:rounded-[16px] tablet:text-lg",

    // 리뷰 남기기 버튼
    review:
      "w-169 h-48 px-48 py-16 rounded-[12px] text-white bg-primary-purple font-semibold text-lg",
  };

  return (
    <button
      className={`${baseStyle}${variantStyles[variant]} ${className}`}
      {...props}
    >
      {hasIcon && <span className="size-20 tablet:size-24">{icon}</span>}
      {children}
    </button>
  );
}
