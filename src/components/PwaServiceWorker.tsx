"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PwaServiceWorker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (pathname.startsWith("/admin")) {
      void navigator.serviceWorker.register("/admin-sw.js", { scope: "/admin" });
    } else {
      void navigator.serviceWorker.register("/sw.js", { scope: "/" });
    }
  }, [pathname]);

  return null;
}
