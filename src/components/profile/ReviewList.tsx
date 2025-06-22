import { useEffect, useState } from 'react';
import { fetchMyReviews } from '@/lib/api/user';
import MyCard from '@/components/card/MyCard';

interface Review {
  id: number;
  wine: { id: number; name: string }; // wineName → wine 객체로 변경
  rating: number;
  content: string;
  createdAt: string;
}

const ReviewList = ({ setReviewCount }: { setReviewCount: (count: number) => void }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const reviews = await fetchMyReviews(20);
        setReviews(reviews);
        setReviewCount(reviews.length);
      } catch {
        setError('리뷰를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviewsData();
  }, [setReviewCount]);

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
          wineName={review.wine.name}  // 여기!
          content={review.content}
        />
      ))}
    </div>
  );
};

export default ReviewList;
