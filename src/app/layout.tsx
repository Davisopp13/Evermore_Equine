import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { OpeningAnnouncement } from "@/components/OpeningAnnouncement";

export const metadata: Metadata = {
  title: "evermore equine llc | Boutique Riding Lesson Facility",
  description: "Foundational horsemanship, safety, and peace at Bear Creek.",
  icons: {
    icon: "/evermore_equine_logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;200;300;400;500;600;700;800;900&display=swap" />
          <link href="https://fonts.cdnfonts.com/css/great-day-personal-use" rel="stylesheet" />
          <style>{`
          :root {
            --font-nunito: 'Nunito', sans-serif;
            --font-great-day: 'Great Day Personal Use', cursive;
          }
        `}</style>
        </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="e1c444d2-b20c-4128-9d1e-7b509ac38088"
        />
        <ErrorReporter />
        <OpeningAnnouncement />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <VisualEditsMessenger />
        <Toaster />
      </body>
    </html>
  );
}
