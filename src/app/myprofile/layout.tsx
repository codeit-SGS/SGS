// import Gnb from '@/components/Gnb';
// import ProfileCard from '@/components/ProfileCard';

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Gnb /> */}
      <main>
        {/* <ProfileCard /> */}
        {children}
      </main>
    </div>
  );
}
