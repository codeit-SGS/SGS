import Image from "next/image";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="flex justify-between items-center bg-black w-full max-w-[1140px] h-[70px] px-5 py-4 rounded-[16px] mx-auto">
      <Image src="/logo/logo-wh.svg" alt="logo" width={52} height={15} />
      <button
        onClick={() => window.location.href = '/login'}
        className="bg-transparent border-none text-white text-[14px] leading-[14px] tablet:text-[16px] tablet:leading-[16px] font-medium cursor-pointer"
      >
        로그인
      </button>
    </div>
  );
}

//ss changees

