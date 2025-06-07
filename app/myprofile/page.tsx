
import {CommonButton} from '@/components/button';


export default function MyProfile() {
  return (
    <div >
      {/* <Gnb /> */}
      <div className="flex flex-coly items-center justify-center rounded-[16px] border border-gray-300 shadow-sm ">
<div>
        <h1 className="text-2xl font-bold text-primary-purple">내 프로필</h1>
        <p className="text-gray-600 mt-2">여기에 프로필 정보를 입력하세요.</p>
      </div>
      <div className="mt-4">
        <CommonButton label="프로필 수정" onClick={() => alert('프로필 수정 클릭!')} />
      </div>
      <div className="mt-4">
        <CommonButton label="로그아웃" onClick={() => alert('로그아웃 클릭!')} />
</div>
      </div>
    </div>
  );
}
