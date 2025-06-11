"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "landing-page-go-to-wine"
  | "auth-page"
  | "auth-page-social-google"
  | "auth-page-social-kakao"
  | "list-page-add-wine"
  | "list-page-modal-reset"
  | "list-page-modal-filter"
  | "list-page-modal-cancel"
  | "product-page-add-review"
  | "product-page-modal-add-review2"
  | "list-page-modal-add-wine"
  | "product-page-modal-add-review"
  | "profile-page-modal-update"
  | "profile-page-modal-cancel2"
  | "profile-page-change"
  | "product-page-modal-delete";

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
    //랜딩페이지
    "landing-page-go-to-wine":
      "bg-main text-white font-bold text-lg leading-16 rounded-fullborder-none",
    //인증 페이지
    "auth-page":
      "bg-main text-white text-lg leading-16 font-bold mobile:text-lg mobile:leading-14 rounded-[16px] mobile:rounded-[12px] border-none",
    "auth-page-social-google":
      "bg-white border border-gray-300 text-gray-800 font-medium text-lg leading-16 mobile:text-md rounded-[16px] mobile:rounded-[12px]",
    "auth-page-social-kakao":
      "bg-white border border-gray-300 text-gray-800 font-medium text-lg leading-16 mobile:text-md rounded-[16px] mobile:rounded-[12px]",
    //와인 리스트 페이지
    "list-page-add-wine":
      "bg-main text-white font-bold leading-16 text-lg mobile:text-md rounded-[16px] mobile:leading-14 mobile:rounded-[12px] border-none",
    // 모달 버튼
    "list-page-modal-reset":
      "bg-main-10 text-lg leading-16 font-bold text-main rounded-[12px] border-none",
    "list-page-modal-filter":
      "bg-main text-white font-bold  text-lg leading-16  rounded-[12px]  border-none",
    "list-page-modal-cancel":
      "bg-main-10 text-main border-none font-bold leading-16  text-lg rounded-[12px]",
    "product-page-modal-add-review2":
      "bg-main text-white font-semibold text-lg rounded-[12px] border-none",
    "list-page-modal-add-wine":
      "bg-main text-white font-bold text-lg rounded-[12px] border-none leading-16 mobile:leading-14",
    "product-page-modal-add-review":
      "bg-main text-white font-bold text-lg rounded-[12px] border-none leading-16",
    "profile-page-modal-update":
      "bg-main text-white font-bold text-lg rounded-[12px] border-none leading-16",
    "profile-page-modal-cancel2":
      "bg-white text-gray-500 border border-gray-300 font-bold leading-16  text-lg rounded-[12px]",
    // 상품 페이지
    "product-page-add-review":
      "bg-main text-white font-bold text-lg rounded-[12px] border-none leading-16 mobile:leading-14 ",
    // 프로필 페이지
    "profile-page-change":
      "bg-main text-white font-bold border-none text-lg leading-16 mobile:leading-14  rounded-[12px] ",
    "product-page-modal-delete":
      "bg-main text-white border-none font-bold text-lg leading-16 rounded-[12px]",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {hasIcon && (
        <span className="mr-12 size-24 mobile:size-20">{icon}</span> // ← 왼쪽 아이콘 + 12px 간격
      )}
      <span>{children}</span>
    </button>
  );
};

export default CommonButton;
