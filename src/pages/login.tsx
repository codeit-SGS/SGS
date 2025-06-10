import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>로그인 - WINE</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-8">WINE</h1>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              placeholder="이메일 입력"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="text-right text-sm text-purple-500 mb-4">
            <a href="#">비밀번호를 잊으셨나요?</a>
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg mb-4">
            로그인
          </button>

          <button className="w-full border border-gray-300 py-2 rounded-lg mb-2 flex items-center justify-center">
            <img src="/img/icon/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
            Google로 시작하기
          </button>

          <button className="w-full border border-gray-300 py-2 rounded-lg mb-4 flex items-center justify-center">
            <img src="/img/icon/kakao-icon.svg" alt="Kakao" className="w-5 h-5 mr-2" />
            Kakao로 시작하기
          </button>

          <div className="text-center text-sm">
            계정이 없으신가요?{' '}
            <a href="#" className="text-blue-600 font-medium">
              회원가입하기
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
