import { ImageResponse } from "next/og";

const c = {
  paper: "#fafbff", ink: "#14213d", soft: "#4a5472", wash: "#e4ebff",
  yellow: "#ffd93d", coral: "#ff6b5b", mint: "#bff0d8",
};

// The brand mark: four colour blocks, like cells in a timetable.
function mark(size, rounded = true) {
  const b = size * 0.3;
  const gap = size * 0.08;
  const block = (bg) => <div style={{ width: b, height: b, background: bg, borderRadius: size * 0.08, display: "flex" }} />;
  const spacer = <div style={{ width: gap, height: gap, display: "flex" }} />;
  return (
    <div style={{ width: size, height: size, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: c.ink, borderRadius: rounded ? size * 0.24 : 0 }}>
      <div style={{ display: "flex" }}>{block(c.yellow)}{spacer}{block(c.wash)}</div>
      <div style={{ display: "flex", height: gap }} />
      <div style={{ display: "flex" }}>{block(c.mint)}{spacer}{block(c.coral)}</div>
    </div>
  );
}

export function renderIcon(size, rounded = true) {
  return new ImageResponse(mark(size, rounded), { width: size, height: size });
}

const chip = (label, bg) => (
  <div style={{ display: "flex", background: bg, border: `2px solid ${c.ink}`, borderRadius: 999, padding: "10px 24px", marginRight: 14 }}>{label}</div>
);

// 1200x630 social sharing card
export function renderOg({ eyebrow, title }) {
  const fontSize = title.length > 70 ? 56 : title.length > 40 ? 68 : 84;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: c.paper, color: c.ink, padding: "56px 72px 48px", borderBottom: `18px solid ${c.yellow}` }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {mark(56)}
          <div style={{ display: "flex", marginLeft: 18, fontSize: 36, fontWeight: 700 }}>Class Timetable</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: c.soft, marginBottom: 20 }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em" }}>{title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, fontWeight: 700 }}>
          {chip("Classes", c.wash)}
          {chip("Tasks", c.mint)}
          {chip("Exams", c.yellow)}
          <div style={{ display: "flex", marginLeft: "auto", color: c.soft, fontWeight: 400 }}>Free on the App Store</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
