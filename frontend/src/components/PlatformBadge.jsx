export function PlatformBadge({ platform, color }) {
  return (
    <span
      style={{
        background: `${color}22`,
        border: `1px solid ${color}55`,
        color,
        padding: "2px 10px",
        borderRadius: "100px",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
      }}
    >
      {platform}
    </span>
  );
}
