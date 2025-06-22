import { useEffect, useState } from 'react';
import { fetchMyWines } from '@/lib/api/user';
import MylistCard from '@/components/card/MylistCard';

interface Wine {
  id: number;
  image: string; // imageUrl이 아니라 image로 맞추세요 (API 응답에 맞게)
  name: string;
  region: string;
  price: number;
}

const WineList = ({ setWineCount }: { setWineCount: (count: number) => void }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWinesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const wines = await fetchMyWines(20);
        setWines(wines);
        setWineCount(wines.length);
      } catch {
        setError('와인을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchWinesData();
  }, [setWineCount]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (wines.length === 0) return <div>등록한 와인이 없습니다.</div>;

  return (
    <div className="flex flex-col gap-16">
      {wines.map((wine) => (
        <MylistCard
          key={wine.id}
          image={wine.image} // imageUrl → image로 수정
          name={wine.name}
          region={wine.region}
          price={wine.price}
        />
      ))}
    </div>
  );
};

export default WineList;
