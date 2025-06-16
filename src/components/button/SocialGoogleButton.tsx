import CommonButton from "./CommonButton";
import Image from "next/image";

const SocialGoogleButton = ({
  className = "",
  ...props
}: React.ComponentProps<"button"> & { className?: string }) => {
  return (
    <CommonButton
      variant="auth-social-google"
      icon={
        <Image
          src="/icon/google.svg"
          alt="구글 아이콘"
          width={24}
          height={24}
          priority
        />
      }
      className={className}
      {...props}
    >
      Google로 시작하기
    </CommonButton>
  );
};

export default SocialGoogleButton;
