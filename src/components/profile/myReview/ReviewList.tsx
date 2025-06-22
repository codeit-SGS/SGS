import { useEffect, useState } from 'react';
import { fetchMyReviews } from '@/lib/api/user';
import { deleteReview } from '@/lib/api/review';
import MyCard from '@/components/card/MyCard';
import MyEditModal from './MyEditModal'; // 경로 주의!
import CancelModal from '@/components/modal/Cancel';

interface Review {
  id: number;
  wine: { id: number; name: string };
  rating: number;
  content: string;
  createdAt: string;
  taste: {
    body: number;
    tannin: number;
    sweetness: number;
    acidity: number;
  };
  aroma: string[];
}

const ReviewList = ({ setReviewCount }: { setReviewCount: (count: number) => void }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

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

  // 삭제 핸들러
  const handleDelete = async (id: number) => {
    try {
      await deleteReview(id); // id는 리뷰 id
      fetchReviewsData();
    } catch (e) {
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  // 수정 핸들러
  const handleEdit = (id: number) => {
    const review = reviews.find((review) => review.id === id);
    if (!review) return;

    setEditingReview({
      ...review,
      taste: review.taste ?? { body: 50, tannin: 50, sweetness: 50, acidity: 50 },
      aroma: review.aroma ?? [],
    });
    setEditModalOpen(true);
  };

  const openModal = (id: number) => {
    setSelectedReviewId(id);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedReviewId(null);
  };

  useEffect(() => {
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
          id={review.id}
          rating={review.rating}
          createdAt={review.createdAt}
          wineName={review.wine.name}
          content={review.content}
          onDelete={() => openModal(review.id)}
          onEdit={handleEdit}
        />
      ))}
      {editingReview && editModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
          onClick={() => setEditModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <MyEditModal
              isOpen={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              initialData={{
                rating: editingReview.rating,
                content: editingReview.content,
                taste: editingReview.taste,
                aroma: editingReview.aroma,
                wineId: editingReview.wine.id,
                wineName: editingReview.wine.name,
                reviewId: editingReview.id,
              }}
              onEditSuccess={() => {
                setEditModalOpen(false);
                fetchReviewsData(); // 리뷰 목록 새로고침
              }}
            />
          </div>
        </div>
      )}
      {open && (
        <CancelModal
          open={open}
          onCancel={closeModal}
          onConfirm={() => {
            if (selectedReviewId !== null) {
              handleDelete(selectedReviewId);
              closeModal();
            }
          }}
        />
      )}
    </div>
  );
};

export default ReviewList;
