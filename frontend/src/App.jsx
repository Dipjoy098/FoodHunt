import { useState } from "react";
import { useSearch } from "./hooks/useSearch";
import { SearchBox } from "./components/SearchBox";
import { BestChoiceBanner } from "./components/BestChoiceBanner";
import { FiltersPanel } from "./components/FiltersPanel";
import { ResultCard } from "./components/ResultCard";

export default function App() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [filters, setFilters] = useState({ maxPrice: 1000, minRating: 0, platform: "all" });
  const [rankingConfig, setRankingConfig] = useState({ ratingWeight: 0.7, priceWeight: 0.3 });

  const { results, bestChoice, loading, searched, error, adapterStatus, search } = useSearch();

  const handleSearch = (q = query, loc = location) => {
    setQuery(q);
    search(q, loc, rankingConfig);
  };

  const filteredResults = results.filter(
    (r) =>
      r.price <= filters.maxPrice &&
      r.rating >= filters.minRating &&
      (filters.platform === "all" || r.platform.toLowerCase() === filters.platform)
  );

  const noMatchTerm = error?.startsWith("NO_MATCH:") ? error.replace("NO_MATCH:", "") : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 50%, #0a0a1a 100%)",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: "#f0f0f8",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; }
        input:focus { outline: none; }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 2px; background: #2a2a4a; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #6C63FF; cursor: pointer; box-shadow: 0 0 8px #6C63FF88; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .shimmer { background: linear-gradient(90deg,#1a1a2e 25%,#2a2a4a 50%,#1a1a2e 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:12px; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ borderBottom: "1px solid #1a1a3a", padding: "0 24px", background: "#0a0a1a99", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "22px" }}>🍽️</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "900", background: "linear-gradient(135deg, #A78BFA, #6C63FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FoodHunt</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {Object.entries(adapterStatus).map(([k, v]) => (
              <span key={k} style={{
                fontSize: "10px", padding: "3px 8px", borderRadius: "100px",
                background: v === "✓" ? "#1a3a1a" : "#1a1a3a",
                color: v === "✓" ? "#4ade80" : "#6C63FF",
                border: `1px solid ${v === "✓" ? "#4ade8033" : "#6C63FF33"}`,
                animation: v !== "✓" ? "pulse 1s infinite" : "none",
              }}>{k}: {v}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>

        {/* ── Hero ── */}
        {!searched && (
          <div style={{ textAlign: "center", padding: "60px 0 40px" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px", animation: "float 3s ease-in-out infinite" }}>🍽️</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 56px)", fontWeight: "900", margin: "0 0 12px", background: "linear-gradient(135deg, #f0f0f8 0%, #A78BFA 60%, #6C63FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1 }}>
              Find the Best Dish.<br />Across Every Platform.
            </h1>
            <p style={{ color: "#8888aa", fontSize: "16px", maxWidth: "460px", margin: "0 auto 32px" }}>
              We compare Swiggy & Zomato simultaneously, rank by rating + price, and surface your best options instantly.
            </p>
          </div>
        )}

        {/* ── Search Box ── */}
        <SearchBox
          query={query} setQuery={setQuery}
          location={location} setLocation={setLocation}
          loading={loading} onSearch={handleSearch}
        />

        {/* ── Filters ── */}
        {searched && !loading && results.length > 0 && (
          <FiltersPanel
            filters={filters} setFilters={setFilters}
            rankingConfig={rankingConfig} setRankingConfig={setRankingConfig}
            onRerank={() => handleSearch()}
          />
        )}

        {/* ── Loading skeleton ── */}
        {loading && (
          <div>
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px", animation: "spin 1s linear infinite", display: "inline-block" }}>🔄</div>
              <p style={{ margin: 0, fontSize: "14px" }}>Hunting across platforms...</p>
            </div>
            {[...Array(4)].map((_, i) => <div key={i} className="shimmer" style={{ height: "110px", marginBottom: "12px" }} />)}
          </div>
        )}

        {/* ── No results ── */}
        {!loading && noMatchTerm && (
          <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "20px", padding: "48px 32px", textAlign: "center" }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🍽️</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: "700", color: "#f0f0f8", margin: "0 0 10px" }}>No results found</h2>
            <p style={{ color: "#8888aa", margin: "0 0 20px", fontSize: "15px" }}>
              No dishes containing{" "}
              <span style={{ background: "#2a1a4a", border: "1px solid #6C63FF44", borderRadius: "6px", padding: "2px 10px", color: "#A78BFA", fontWeight: "700", fontFamily: "monospace" }}>"{noMatchTerm}"</span>{" "}
              were found in {location}.
            </p>
          </div>
        )}

        {/* ── General error ── */}
        {!loading && error && !noMatchTerm && (
          <div style={{ background: "#2a1a1a", border: "1px solid #5a2a2a", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
            <p style={{ color: "#ff6b6b", margin: 0 }}>{error}</p>
          </div>
        )}

        {/* ── Best Choice banner ── */}
        {!loading && bestChoice && <BestChoiceBanner item={bestChoice} />}

        {/* ── Results count ── */}
        {!loading && filteredResults.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <p style={{ margin: 0, color: "#8888aa", fontSize: "13px" }}>
              Showing <span style={{ color: "#A78BFA", fontWeight: "700" }}>{filteredResults.length}</span> result{filteredResults.length !== 1 ? "s" : ""}
              {filteredResults.length !== results.length && ` (filtered from ${results.length})`}
            </p>
            <p style={{ margin: 0, color: "#555", fontSize: "11px" }}>
              Ranked by {(rankingConfig.ratingWeight * 100).toFixed(0)}% rating + {(rankingConfig.priceWeight * 100).toFixed(0)}% price
            </p>
          </div>
        )}

        {/* ── Result cards ── */}
        {!loading && filteredResults.map((item, i) => (
          <div key={item.id} style={{ marginBottom: "12px" }}>
            <ResultCard item={item} rank={i + 1} animDelay={i * 80} />
          </div>
        ))}

        {/* ── Filtered-to-zero state ── */}
        {!loading && searched && results.length > 0 && filteredResults.length === 0 && (
          <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
            <p style={{ color: "#666", margin: 0 }}>No results match your filters. Try adjusting them.</p>
          </div>
        )}

        {/* ── Footer ── */}
        <div style={{ textAlign: "center", padding: "40px 0 20px", borderTop: "1px solid #1a1a3a", marginTop: "40px" }}>
          <p style={{ color: "#333", fontSize: "11px", margin: 0 }}>FoodHunt • Aggregating Swiggy & Zomato • Powered by Adapter Pattern</p>
          <p style={{ color: "#222", fontSize: "10px", margin: "4px 0 0", letterSpacing: "1px" }}>MOCK DATA — Production version connects to live APIs</p>
        </div>
      </div>
    </div>
  );
}
