
import {CommonButton} from '@/components/button';
import GoogleIcon from "/icon/google.svg";
import KakaoIcon from "/icon/kakao.svg";

export default function MyProfile() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800">내 프로필</h1>
      <p className="text-center text-gray-600 mt-4">여기는 내 프로필 페이지입니다.</p>
       <CommonButton variant="social-google" icon={<GoogleIcon />}>
        Google로 시작하기
      </CommonButton>
      <CommonButton variant="social-kakao" icon={<KakaoIcon />}>
        Kakao로 시작하기
      </CommonButton>
      <CommonButton variant="modal-cancel">취소</CommonButton>
      <CommonButton variant="modal-submit">링크 보내기</CommonButton>
      <CommonButton variant="signup">가입하기</CommonButton>
      <CommonButton variant="review">리뷰 남기기</CommonButton>
    </div>
  );
}
