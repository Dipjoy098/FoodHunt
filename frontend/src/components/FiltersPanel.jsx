import { useState } from "react";

export function FiltersPanel({ filters, setFilters, rankingConfig, setRankingConfig, onRerank }) {
  const [showRanking, setShowRanking] = useState(false);

  return (
    <div style={{
      background: "#1a1a2e", border: "1px solid #2a2a4a",
      borderRadius: "16px", padding: "16px 20px", marginBottom: "20px",
    }}>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-end" }}>
        {/* Max price slider */}
        <div style={{ flex: 1, minWidth: "150px" }}>
          <label style={{ fontSize: "11px", color: "#666", letterSpacing: "1px", textTransform: "uppercase" }}>
            Max Price: ₹{filters.maxPrice}
          </label>
          <input type="range" min={50} max={1000} step={10} value={filters.maxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
            style={{ width: "100%", marginTop: "6px" }} />
        </div>

        {/* Min rating slider */}
        <div style={{ flex: 1, minWidth: "150px" }}>
          <label style={{ fontSize: "11px", color: "#666", letterSpacing: "1px", textTransform: "uppercase" }}>
            Min Rating: {filters.minRating.toFixed(1)}⭐
          </label>
          <input type="range" min={0} max={5} step={0.1} value={filters.minRating}
            onChange={(e) => setFilters((f) => ({ ...f, minRating: Number(e.target.value) }))}
            style={{ width: "100%", marginTop: "6px" }} />
        </div>

        {/* Platform toggle */}
        <div>
          <label style={{ fontSize: "11px", color: "#666", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
            Platform
          </label>
          <div style={{ display: "flex", gap: "6px" }}>
            {["all", "swiggy", "zomato"].map((p) => (
              <button key={p} onClick={() => setFilters((f) => ({ ...f, platform: p }))}
                style={{
                  padding: "5px 12px",
                  background: filters.platform === p ? "linear-gradient(135deg, #6C63FF, #A78BFA)" : "#0d0d2b",
                  border: `1px solid ${filters.platform === p ? "#6C63FF" : "#2a2a4a"}`,
                  borderRadius: "8px", color: filters.platform === p ? "#fff" : "#888",
                  fontSize: "12px", cursor: "pointer", textTransform: "capitalize",
                }}>{p}</button>
            ))}
          </div>
        </div>

        <button onClick={() => setShowRanking((x) => !x)}
          style={{ padding: "6px 14px", background: "transparent", border: "1px solid #2a2a4a", borderRadius: "8px", color: "#666", fontSize: "11px", cursor: "pointer" }}>
          ⚙️ Ranking
        </button>
      </div>

      {/* Ranking weights */}
      {showRanking && (
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #2a2a4a", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "150px" }}>
            <label style={{ fontSize: "11px", color: "#A78BFA", letterSpacing: "1px" }}>
              Rating Weight: {(rankingConfig.ratingWeight * 100).toFixed(0)}%
            </label>
            <input type="range" min={0} max={100} step={5}
              value={rankingConfig.ratingWeight * 100}
              onChange={(e) => { const v = Number(e.target.value) / 100; setRankingConfig({ ratingWeight: v, priceWeight: 1 - v }); }}
              style={{ width: "100%", marginTop: "6px" }} />
          </div>
          <div style={{ flex: 1, minWidth: "150px" }}>
            <label style={{ fontSize: "11px", color: "#6C63FF", letterSpacing: "1px" }}>
              Price Weight: {(rankingConfig.priceWeight * 100).toFixed(0)}%
            </label>
            <input type="range" min={0} max={100} step={5}
              value={rankingConfig.priceWeight * 100}
              onChange={(e) => { const v = Number(e.target.value) / 100; setRankingConfig({ priceWeight: v, ratingWeight: 1 - v }); }}
              style={{ width: "100%", marginTop: "6px" }} />
          </div>
          <button onClick={onRerank}
            style={{ padding: "8px 16px", background: "linear-gradient(135deg, #6C63FF, #A78BFA)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px", cursor: "pointer", fontWeight: "700" }}>
            Re-rank
          </button>
        </div>
      )}
    </div>
  );
}
