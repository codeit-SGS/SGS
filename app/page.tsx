import MyProfile from "./myprofile/page";

// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-primary-purple">홈 페이지입니다 🎉</h1>
      <MyProfile />
    </main>
  );
}
