import { StarRating } from "./StarRating";
import { PlatformBadge } from "./PlatformBadge";

export function BestChoiceBanner({ item }) {
  if (!item) return null;
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1a3a, #16213e)",
      border: "1px solid #FFD70044",
      borderRadius: "16px", padding: "20px", marginBottom: "20px",
      display: "flex", alignItems: "center", gap: "16px",
      boxShadow: "0 4px 30px #FFD70022",
    }}>
      <div style={{ fontSize: "36px" }}>🏆</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "10px", color: "#FFD700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>
          Best Choice — Score {(item.score * 100).toFixed(0)}%
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: "700", color: "#f0f0f8" }}>
          {item.dish_name}{" "}
          <span style={{ color: "#8888aa", fontSize: "14px" }}>at {item.restaurant}</span>
        </div>
        <div style={{ display: "flex", gap: "16px", marginTop: "6px", fontSize: "13px", flexWrap: "wrap" }}>
          <span style={{ color: "#A78BFA", fontWeight: "700" }}>₹{item.price}</span>
          <StarRating rating={item.rating} />
          <PlatformBadge platform={item.platform} color={item.platform_color} />
        </div>
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "10px 20px",
          background: "linear-gradient(135deg, #FFD700, #FFA500)",
          color: "#000", borderRadius: "10px", fontSize: "13px",
          fontWeight: "800", textDecoration: "none", whiteSpace: "nowrap",
          boxShadow: "0 4px 20px #FFD70044",
        }}
      >
        Order Best →
      </a>
    </div>
  );
}
