import api from './axios';



export const fetchWineById = async (id: number) => {
  try {
    const response = await api.get(`/wines/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wine:', error);
    throw error;
  }
};

// ✅ 와인 삭제 함수 추가
export const deleteWine = async (wineId: number) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await api.delete(`/wines/${wineId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error deleting wine:', error);
    throw error;
  }
};

// ✅ 와인 수정 함수 예시 (필요시)
export const editWine = async (wineId: number, payload: any) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await api.patch(`/wines/${wineId}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error editing wine:', error);
    throw error;
  }
};

// 적용 예시 (components/WineDetail.tsx)
// import { useWineDetail } from '@/hooks/useWineDetail';
// const { data, isLoading } = useWineDetail(1);
