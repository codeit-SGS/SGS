import { useEffect, useState } from "react";
import { fetchMyWines } from "@/lib/api/user";
import MylistCard from "@/components/card/mylistCard";

interface Wine {
  id: number;
  name: string;
  imageUrl: string;
  region: string;
  price: number;
}

const WineList = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMyWines();
        setWines(data); // API 응답 구조에 따라 수정 필요
      } catch (e) {
        setError("등록한 와인을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchWines();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (wines.length === 0) return <div>등록한 와인이 없습니다.</div>;

  return (
    <div className="flex flex-col gap-16">
      {wines.map((wine) => (
        <MylistCard
          key={wine.id}
          imageUrl={wine.imageUrl}
          name={wine.name}
          region={wine.region}
          price={wine.price}
        />
      ))}
    </div>
  );
};

export default WineList;
