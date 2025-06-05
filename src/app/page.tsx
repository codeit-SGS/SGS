import MyProfile from "@/app/myprofile/page";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-main">홈 페이지입니다 🎉</h1>
      <MyProfile />
    </main>
  );
}
