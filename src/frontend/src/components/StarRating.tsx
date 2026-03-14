interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5].map((i) => ({
    key: i,
    filled: i <= Math.floor(rating),
    half: i > Math.floor(rating) && i - 0.5 < rating,
  }));

  const starSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${starSize}`}>
        {stars.map((s) => (
          <span
            key={s.key}
            className={
              s.filled
                ? "text-amber-500"
                : s.half
                  ? "text-amber-400"
                  : "text-stone-300"
            }
          >
            &#9733;
          </span>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-stone-500">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
