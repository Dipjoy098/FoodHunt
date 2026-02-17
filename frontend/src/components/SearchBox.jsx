const SUGGESTIONS = ["Biryani", "Pizza", "Burger", "Paneer", "Chicken", "Roll"];

export function SearchBox({ query, setQuery, location, setLocation, loading, onSearch }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1a2e, #16213e)",
      border: "1px solid #2a2a5a",
      borderRadius: "20px",
      padding: "20px",
      marginBottom: "24px",
      boxShadow: "0 8px 40px #6C63FF22",
    }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {/* Food query input */}
        <div style={{ flex: 2, minWidth: "200px", position: "relative" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(query, location)}
            placeholder="Chicken Biryani, Pizza, Burger..."
            style={{
              width: "100%", padding: "14px 14px 14px 44px",
              background: "#0d0d2b", border: "1px solid #2a2a5a",
              borderRadius: "12px", color: "#f0f0f8", fontSize: "15px",
              outline: "none", transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6C63FF")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a5a")}
          />
        </div>

        {/* Location input */}
        <div style={{ flex: 1, minWidth: "140px", position: "relative" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>📍</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(query, location)}
            placeholder="City or area"
            style={{
              width: "100%", padding: "14px 14px 14px 44px",
              background: "#0d0d2b", border: "1px solid #2a2a5a",
              borderRadius: "12px", color: "#f0f0f8", fontSize: "15px",
              outline: "none", transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6C63FF")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a5a")}
          />
        </div>

        <button
          onClick={() => onSearch(query, location)}
          disabled={loading}
          style={{
            padding: "14px 28px",
            background: loading ? "#2a2a4a" : "linear-gradient(135deg, #6C63FF, #A78BFA)",
            border: "none", borderRadius: "12px", color: "#fff",
            fontSize: "15px", fontWeight: "700", whiteSpace: "nowrap",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 4px 20px #6C63FF55",
            transition: "all 0.2s",
          }}
        >
          {loading ? "Hunting..." : "Hunt 🎯"}
        </button>
      </div>

      {/* Suggestion chips */}
      <div style={{ display: "flex", gap: "8px", marginTop: "14px", flexWrap: "wrap" }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSearch(s, location)}
            style={{
              padding: "5px 12px",
              background: "#0d0d2b", border: "1px solid #2a2a4a",
              borderRadius: "100px", color: "#8888aa", fontSize: "12px", cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#6C63FF"; e.target.style.color = "#A78BFA"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "#2a2a4a"; e.target.style.color = "#8888aa"; }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
