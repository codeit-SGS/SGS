// src/app/test/page.tsx
export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10 font-pretendard">
      <h1 className="text-3xl font-bold text-primary-purple mb-4">
        ✅ Tailwind + Pretendard 적용됨!
      </h1>
      <p className="text-md text-gray-800">
        이 페이지는 <code>/test</code> 경로에서 확인할 수 있습니다.
      </p>
      <p className="mt-spacing text-sm text-gray-500">
        spacing 커스텀 변수(0.0625rem = 1px)도 적용되었습니다.
      </p>
    </div>
  );
}
