import axios from 'axios';

const API_URL = 'https://winereview-api.vercel.app/15-3';

export const fetchWineById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/wines/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wine:', error);
    throw error;
  }
};

// 적용 예시 (components/WineDetail.tsx)
// import { useWineDetail } from '@/hooks/useWineDetail';
// const { data, isLoading } = useWineDetail(1);
