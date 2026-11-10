import { renderIcon } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so this one is full-bleed.
export default function AppleIcon() {
  return renderIcon(180, false);
}
