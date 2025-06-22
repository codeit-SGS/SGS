import { useEffect, useState } from 'react';
import { fetchMyWines, deleteWine } from '@/lib/api/wine';
import MyWineCard from '@/components/card/MylistCard';
import MyEditModal from '@/components/profile/myReview/MyEditModal';

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

const WineList = ({ setWineCount }: { setWineCount: (count: number) => void }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingWine, setEditingWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWinesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const rawWines = await fetchMyWines(20);
      const wines: Wine[] = rawWines.map((w: any) => ({
        id: w.id,
        name: w.name,
        region: w.region,
        image: w.image,
        price: w.price,
        type: w.type,
      }));
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

  // 삭제
  const handleDelete = async (wineId: number) => {
    try {
      await deleteWine(wineId);
      await fetchWinesData();
    } catch (e) {
      alert('와인 삭제에 실패했습니다.\n이미 삭제된 와인이거나 존재하지 않습니다.');
      await fetchWinesData();
    }
  };

  // 수정
  const handleEdit = (wine: Wine) => {
    setEditingWine(wine);
    setEditModalOpen(true);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (wines.length === 0) return <div>등록한 와인이 없습니다.</div>;
  if (!Array.isArray(wines)) return <div>와인 데이터가 올바르지 않습니다.</div>;

  return (
    <div className="flex flex-col gap-16">
      {wines.map((wine) => (
        <MyWineCard
          key={wine.id}
          wine={wine}
          onDelete={() => handleDelete(wine.id)}
          onEdit={() => handleEdit(wine)}
        />
      ))}
      {editingWine && editModalOpen && (
        <MyEditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialData={editingWine}
          onEditSuccess={() => {
            setEditModalOpen(false);
            fetchWinesData();
          }}
        />
      )}
    </div>
  );
};

export default WineList;
