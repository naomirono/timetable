import { renderOg } from "@/lib/og";

export const alt = "Class Timetable: timetable, homework and exam planner for iPhone, iPad and Mac";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Timetable, homework and exam planner", title: "Know where to be and what's due." });
}
