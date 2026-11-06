import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  // AuthShell is rendered by each auth page, so this layout intentionally
  // does not add another header, footer, or background.
  return children;
}
