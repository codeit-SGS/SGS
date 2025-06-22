"use client";

import { useState } from "react";
import MyProfileTabs from "@/components/profile/MyProfileTabs";
import ReviewList from "@/components/profile/myReview/ReviewList";
import WineList from "@/components/profile/WineList";

const MyProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"review" | "wine">("review");
  const [reviewCount, setReviewCount] = useState(0);
  const [wineCount, setWineCount] = useState(0);

  return (
    <div className="w-full">
      <MyProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalCount={activeTab === "review" ? reviewCount : wineCount}
      />
      {activeTab === "review" ? (
        <ReviewList setReviewCount={setReviewCount} />
      ) : (
        <WineList setWineCount={setWineCount} />
      )}
    </div>
  );
};

export default MyProfilePage;
