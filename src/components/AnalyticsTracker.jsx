"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toolSlugFromPath, getToolMeta } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId || typeof window.gtag !== "function") return;

    const slug = toolSlugFromPath(pathname);
    const toolMeta = slug ? getToolMeta(slug) : {};

    window.gtag("event", "page_view", {
      page_path: pathname,
      ...toolMeta,
    });
  }, [pathname]);

  return null;
}
