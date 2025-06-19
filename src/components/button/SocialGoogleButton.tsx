import Image from "next/image";

interface SocialGoogleButtonProps {
  href: string;
  className?: string;
}

const SocialGoogleButton = ({ href, className = "" }: SocialGoogleButtonProps) => {
  return (
    <a
      href={href}
      className={`w-303 tablet:400 h-48 tablet:h-52 rounded-[12px] tablet:rounded-[16px] tablet:text-lg tablet:leading-16  bg-white border border-gray-300 text-gray-800 font-medium leading-14 text-md flex items-center justify-center gap-10 tablet:gap-12 ${className}`}
    >
      {/* 모바일: 20px, 테블릿 이상: 24px */}
      <span className="block tablet:hidden">
        <Image
          src="/icon/google.svg"
          alt="구글 아이콘"
          width={20}
          height={20}
          priority
        />
      </span>
      <span className="hidden tablet:block">
        <Image
          src="/icon/google.svg"
          alt="구글 아이콘"
          width={24}
          height={24}
          priority
        />
      </span>
      Google로 시작하기
    </a>
  );
};

export default SocialGoogleButton;
