import React from "react";
import ProfileCard from "@/components/profile/ProfileCard";

interface MyProfileLayoutProps {
  children: React.ReactNode;
}

const MyProfileLayout: React.FC<MyProfileLayoutProps> = ({ children }) => {
  return (
    <div className="max-W-800 mt-0 p-20 mx-auto">
      <header>
        <h1></h1>
      </header>
      <section className="flex flex-col items-center">
        <ProfileCard nickname="술개생" />
      </section>
      <main>{children}</main>
    </div>
  );
};

export default MyProfileLayout;
