import { useEffect, useState } from 'react';
import { fetchMyWines } from '@/lib/api/user';
import { deleteWine } from '@/lib/api/wine'; // 추가
import MylistCard from '@/components/card/MylistCard';
import MyEditWineModal from '@/components/profile/myWine/MyEditWineModal'; // 추가

interface Wine {
  id: number;
  image: string;
  name: string;
  region: string;
  price: number;
}

const WineList = ({ setWineCount }: { setWineCount: (count: number) => void }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 수정 모달 상태
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingWine, setEditingWine] = useState<Wine | null>(null);

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

  useEffect(() => {
    fetchWinesData();
  }, [setWineCount]);

  // 삭제 핸들러
  const handleDelete = async (wineId: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteWine(wineId);
      fetchWinesData();
    } catch {
      alert('와인 삭제에 실패했습니다.');
    }
  };

  // 수정 핸들러
  const handleEdit = (wine: Wine) => {
    setEditingWine(wine);
    setEditModalOpen(true);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (wines.length === 0) return <div>등록한 와인이 없습니다.</div>;

  return (
    <div className="flex flex-col gap-16">
      {wines.map((wine) => (
        <MylistCard
          key={wine.id}
          image={wine.image}
          name={wine.name}
          region={wine.region}
          price={wine.price}
          onDelete={() => handleDelete(wine.id)} // 삭제 버튼 연결
          onEdit={() => handleEdit(wine)}       // 수정 버튼 연결
        />
      ))}
      {editingWine && editModalOpen && (
        <MyEditWineModal
          wine={editingWine}
          onClose={() => setEditModalOpen(false)}
          onSuccess={() => {
            setEditModalOpen(false);
            fetchWinesData();
          }}
        />
      )}
    </div>
  );
};

export default WineList;