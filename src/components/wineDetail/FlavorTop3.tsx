export default function FlavorTop3({ flavors }: { flavors: string[] }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        어떤 향이 있나요?
      </h3>
      <div className="flex gap-4 flex-wrap">
        {flavors.map((tag) => (
          <div
            key={tag}
            className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
