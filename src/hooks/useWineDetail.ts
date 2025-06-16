import { useEffect, useState } from 'react';
import { fetchWineById } from '@/lib/api/wine';
import { dummyWineDetail } from '@/lib/api/dummy/wine';

export const useWineDetail = (id: number) => {
  const [data, setData] = useState<typeof dummyWineDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchWineById(id);
        setData(result);
      } catch (err) {
        console.warn('API 실패로 더미 데이터 사용');
        setData(dummyWineDetail);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [id]);

  return { data, isLoading, error };
};