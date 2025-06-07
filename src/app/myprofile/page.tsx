import { CommonButton } from "@/components/button";
import Image from "next/image";

export default function MyProfile() {
  return (
    <div className="flex flex-col items-center bg-gray-200 container mx-auto p-4 gap-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 py-20">
        내 프로필
      </h1>
      <CommonButton
        variant="social-google"
        icon={
          <Image
            src="/icon/google.svg"
            alt="구글 아이콘"
            width={20}
            height={20}
          />
        }
      >
        Google로 시작하기
      </CommonButton>

      <CommonButton
        variant="social-kakao"
        icon={
          <Image
            src="/icon/kakao.svg"
            alt="카카오 아이콘"
            width={20}
            height={20}
          />
        }
      >
        Kakao로 시작하기
      </CommonButton>
      <CommonButton variant="modal-cancel">취소</CommonButton>
      <CommonButton variant="modal-submit">링크 보내기</CommonButton>
      <CommonButton variant="signup">가입하기</CommonButton>
      <CommonButton variant="review">리뷰 남기기</CommonButton>
    </div>
  );
}
