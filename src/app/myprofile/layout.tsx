// src/app/myprofile/layout.tsx
// import Gnb from '@/components/Gnb';
// import ProfileCard from '@/components/ProfileCard';

export default function MyProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Gnb /> */}
      <main className="p-4 max-w-xl mx-auto">
        {/* <ProfileCard /> */}
        {children}
      </main>
    </div>
  );
}
