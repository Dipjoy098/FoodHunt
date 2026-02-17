import { useState, useEffect } from "react";
import { StarRating } from "./StarRating";
import { PlatformBadge } from "./PlatformBadge";

const MEDAL_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

function ScoreBar({ score }) {
  return (
    <div style={{ width: "100%", height: "3px", background: "#2a2a3a", borderRadius: "2px", marginTop: "8px" }}>
      <div
        style={{
          height: "100%",
          width: `${score * 100}%`,
          background: "linear-gradient(90deg, #6C63FF, #A78BFA)",
          borderRadius: "2px",
          transition: "width 1s ease",
          boxShadow: "0 0 8px #6C63FF88",
        }}
      />
    </div>
  );
}

export function ResultCard({ item, rank, animDelay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), animDelay);
    return () => clearTimeout(t);
  }, [animDelay]);

  const isTop3 = rank <= 3;
  const medalColor = isTop3 ? MEDAL_COLORS[rank - 1] : null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        border: isTop3 ? `1px solid ${medalColor}44` : "1px solid #2a2a4a",
        borderRadius: "16px",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: isTop3 ? `0 4px 30px ${medalColor}22` : "0 2px 10px #00000044",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
        e.currentTarget.style.boxShadow = isTop3 ? `0 12px 40px ${medalColor}44` : "0 12px 30px #6C63FF33";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = isTop3 ? `0 4px 30px ${medalColor}22` : "0 2px 10px #00000044";
      }}
    >
      {isTop3 && (
        <div style={{
          position: "absolute", top: "-30px", right: "-30px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: `radial-gradient(circle, ${medalColor}22, transparent)`,
          pointerEvents: "none",
        }} />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ display: "flex", gap: "14px", flex: 1, minWidth: 0 }}>
          {/* Rank badge */}
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
            background: isTop3 ? `linear-gradient(135deg, ${medalColor}, ${medalColor}88)` : "#2a2a4a",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "900", color: isTop3 ? "#000" : "#666",
            boxShadow: isTop3 ? `0 0 16px ${medalColor}66` : "none",
          }}>
            {rank}
          </div>

          {/* Dish emoji */}
          <div style={{ fontSize: "28px", lineHeight: 1.2, flexShrink: 0 }}>{item.image}</div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#f0f0f8", fontFamily: "'Playfair Display', serif" }}>
                {item.dish_name}
              </h3>
              <PlatformBadge platform={item.platform} color={item.platform_color} />
            </div>
            <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#8888aa" }}>🏪 {item.restaurant}</p>
            <StarRating rating={item.rating} />
          </div>
        </div>

        {/* Price + CTA */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "22px", fontWeight: "900", color: "#A78BFA", marginBottom: "4px", fontFamily: "'Playfair Display', serif" }}>
            ₹{item.price}
          </div>
          <div style={{ fontSize: "10px", color: "#666", marginBottom: "8px" }}>🕐 {item.delivery_time}</div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-block", padding: "6px 14px",
              background: `linear-gradient(135deg, ${item.platform_color}, ${item.platform_color}bb)`,
              color: "#fff", borderRadius: "8px", fontSize: "11px", fontWeight: "700",
              textDecoration: "none", letterSpacing: "0.5px",
            }}
          >
            Order →
          </a>
        </div>
      </div>

      <ScoreBar score={item.score} />
      <div style={{ textAlign: "right", fontSize: "10px", color: "#555", marginTop: "4px" }}>
        Match score: {(item.score * 100).toFixed(0)}%
      </div>
    </div>
  );
}
