import { useEffect, useState } from 'react';
import { fetchMyReviews } from '@/lib/api/user';
import MyCard from '@/components/card/MyCard';

interface Review {
  id: number;
  wineName: string;
  rating: number;
  content: string;
  createdAt: string;
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMyReviews();
        setReviews(data); // API 응답 구조에 따라 수정 필요
      } catch (e) {
        setError('리뷰를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (reviews.length === 0) return <div>작성한 리뷰가 없습니다.</div>;

  return (
    <div className="flex flex-col gap-16">
      {reviews.map((review) => (
        <MyCard
          key={review.id}
          rating={review.rating}
          createdAt={review.createdAt}
          wineName={review.wineName}
          content={review.content}
        />
      ))}
    </div>
  );
};

export default ReviewList;
