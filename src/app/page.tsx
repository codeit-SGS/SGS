import MyProfile from "@/app/myprofile/page";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold text-black pb-50">
        홈 페이지입니다 🎉
      </h1>
      <MyProfile />
    </main>
  );
}
