interface MyProfileTabsProps {
  activeTab: "review" | "wine";
  onTabChange: (tab: "review" | "wine") => void;
  totalCount: number;
}

export default function MyProfileTabs({
  activeTab,
  onTabChange,
  totalCount,
}: MyProfileTabsProps) {
  return (
    <div className="flex items-center justify-between w-343 tablet:w-704 pc:w-800 mb-16 tablet:mb-22 ">
      <div className="flex gap-16 tablet:gap-32">
        <button
          className={`text-2lg tablet:text-xl leading-18 tablet:leading-20 font-bold cursor-pointer ${
            activeTab === "review" ? "text-gray-800" : "text-gray-500"
          }`}
          onClick={() => onTabChange("review")}
        >
          내가 쓴 후기
        </button>
        <button
          className={`text-2lg tablet:text-xl leading-18 tablet:leading-20 font-bold cursor-pointer ${
            activeTab === "wine" ? "text-gray-800" : "text-gray-500"
          }`}
          onClick={() => onTabChange("wine")}
        >
          내가 등록한 와인
        </button>
      </div>
      <span className="text-xs tablet:text-md leading-12 tablet:leading-14 font-regular text-main select-none">
        총 {totalCount}개
      </span>
    </div>
  );
}
