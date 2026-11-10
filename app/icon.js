import { renderIcon } from "@/lib/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return renderIcon(48);
}
