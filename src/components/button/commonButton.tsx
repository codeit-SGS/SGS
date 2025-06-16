"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  // 랜딩
  | "landing-go-to-wine"

  // 인증
  | "auth-submit"
  | "auth-social-google"
  | "auth-social-kakao"

  // 리스트
  | "list-add-wine"
  | "list-modal-reset"
  | "list-modal-filter"
  | "list-modal-cancel"
  | "list-modal-add-wine"

  // 상품
  | "product-add-review"
  | "product-modal-add-review"
  | "product-modal-add-review2"
  | "product-modal-delete"

  // 프로필
  | "profile-change"
  | "profile-modal-update"
  | "profile-modal-cancel"

  // 공통 모달
  | "modal-add-wine"
  | "modal-add-review";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  icon?: ReactNode; // 왼쪽 아이콘
  className?: string;
}

const CommonButton = ({
  children,
  variant,
  icon,
  className = "",
  ...props
}: CommonButtonProps) => {
  const hasIcon = !!icon;

  const baseStyle =
    "flex items-center justify-center text-center whitespace-nowrap cursor-pointer";

  const variantStyles: Record<ButtonVariant, string> = {
    // 랜딩
    "landing-go-to-wine":
      "bg-main text-white font-bold text-lg leading-16 rounded-full border-none",

    // 인증
    "auth-submit":
      "bg-main text-white font-bold text-lg leading-16 mobile:text-md mobile:leading-14 rounded-[16px] mobile:rounded-[12px] border-none",
    "auth-social-google":
      "bg-white border border-gray-300 text-gray-800 font-medium text-lg leading-16 mobile:text-md rounded-[16px] mobile:rounded-[12px]",
    "auth-social-kakao":
      "bg-white border border-gray-300 text-gray-800 font-medium text-lg leading-16 mobile:text-md rounded-[16px] mobile:rounded-[12px]",

    // 리스트 페이지
    "list-add-wine":
      "bg-main text-white font-bold text-lg leading-16 mobile:text-md mobile:leading-14 rounded-[16px] mobile:rounded-[12px] border-none",
    "list-modal-reset":
      "bg-main-10 text-main font-bold text-lg leading-16 rounded-[12px] border-none",
    "list-modal-filter":
      "bg-main text-white font-bold text-lg leading-16 rounded-[12px] border-none",
    "list-modal-cancel":
      "bg-main-10 text-main font-bold text-lg leading-16 rounded-[12px] border-none",
    "list-modal-add-wine":
      "bg-main text-white font-bold text-lg leading-16 mobile:leading-14 rounded-[12px] border-none",

    // 상품 페이지
    "product-add-review":
      "bg-main text-white font-bold text-lg leading-16 mobile:leading-14 rounded-[12px] border-none",
    "product-modal-add-review":
      "bg-main text-white font-bold text-lg leading-16 rounded-[12px] border-none",
    "product-modal-add-review2":
      "bg-main text-white font-semibold text-lg rounded-[12px] border-none",
    "product-modal-delete":
      "bg-main text-white font-bold text-lg leading-16 rounded-[12px] border-none",

    // 프로필 페이지
    "profile-change":
      "bg-main text-white font-bold text-lg leading-16 mobile:leading-14 rounded-[12px] border-none",
    "profile-modal-update":
      "bg-main text-white font-bold text-lg leading-16 rounded-[12px] border-none",
    "profile-modal-cancel":
      "bg-white text-gray-500 font-bold text-lg leading-16 border border-gray-300 rounded-[12px]",

    // 공통 모달
    "modal-add-wine":
      "bg-main text-white font-bold text-lg leading-16 mobile:leading-14 rounded-[12px] border-none",
    "modal-add-review":
      "bg-main text-white font-bold text-lg leading-16 rounded-[12px] border-none",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {hasIcon && <span className="mr-12 size-24 mobile:size-20">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default CommonButton;
