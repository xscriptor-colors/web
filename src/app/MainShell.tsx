"use client";

import { usePathname } from "next/navigation";

export default function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  if (isHome) return <>{children}</>;

  return <main id="main-content" className="pb-28">{children}</main>;
}
