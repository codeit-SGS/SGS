'use client';

import { Star, StarHalf, Star as StarOutline } from 'lucide-react';

export default function StarDisplay({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex text-purple-500">
      {[...Array(full)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" stroke="none" />
      ))}
      {half && <StarHalf fill="currentColor" stroke="none" />}
      {[...Array(empty)].map((_, i) => (
        <StarOutline key={`empty-${i}`} stroke="currentColor" />
      ))}
    </div>
  );
}
