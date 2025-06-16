import CommonButton from "./CommonButton";
import Image from "next/image";

const SocialKakaoButton = ({
  className = "",
  ...props
}: React.ComponentProps<"button"> & { className?: string }) => {
  return (
    <CommonButton
      variant="auth-social-kakao"
      icon={
        <Image
          src="/icon/kakao.svg"
          alt="카카오 아이콘"
          width={24}
          height={24}
          priority
        />
      }
      className={className}
      {...props}
    >
      kakao로 시작하기
    </CommonButton>
  );
};

export default SocialKakaoButton;
