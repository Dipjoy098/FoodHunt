export function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ letterSpacing: "1px", fontSize: "12px" }}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color: i < full ? "#FFB800" : i === full && half ? "#FFB800" : "#3a3a4a",
            filter: i < full || (i === full && half) ? "drop-shadow(0 0 4px #FFB80088)" : "none",
          }}
        >
          {i < full ? "★" : i === full && half ? "⭐" : "☆"}
        </span>
      ))}
      <span style={{ color: "#aaa", marginLeft: "4px", fontSize: "11px" }}>{rating.toFixed(1)}</span>
    </span>
  );
}
