function RatingBar({
  score,
  count,
  total,
}: {
  score: number;
  count: number;
  total: number;
}) {
  const percent = (count / total) * 100;

  return (
    <div className="p-10 flex items-center gap-2 text-sm">
      <span className="w-6 mr-15 text-right text-lg text-gray-500 whitespace-nowrap">
        {score}점
      </span>
      <div className="relative ml-15 w-full h-8 bg-gray-200 rounded">
        <div
          className="absolute left-0 top-0 h-8 bg-main rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default RatingBar;
