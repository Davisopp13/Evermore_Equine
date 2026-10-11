import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evermore Equine Admin",
  manifest: "/admin.webmanifest",
  applicationName: "Evermore Equine Admin",
  appleWebApp: { capable: true, title: "Evermore Admin", statusBarStyle: "black-translucent" },
  icons: {
    icon: [
      { url: "/icons/admin-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/admin-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/admin-apple-touch.png",
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
