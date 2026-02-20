"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
{ name: "Home", href: "/" },
{ name: "Our Story", href: "/about" },
{ name: "Services & Pricing", href: "/services" },
{ name: "Schedule & Contact", href: "/contact" }];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/EE-Logo-1763684405565.JPG?width=8000&height=8000&resize=contain"
              alt="evermore equine llc"
              width={90}
              height={72}
              className="object-contain"
              priority />
          </Link>
        </div>
        

        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ?
            <X className="h-6 w-6" aria-hidden="true" /> :

            <Menu className="h-6 w-6" aria-hidden="true" />
            }
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) =>
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
            )}>
              {item.name}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen &&
      <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border/40 shadow-lg">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) =>
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "block rounded-md px-3 py-2 text-base font-medium transition-colors",
              pathname === item.href ?
              "bg-secondary text-primary" :
              "text-muted-foreground hover:bg-secondary hover:text-primary"
            )}
            onClick={() => setMobileMenuOpen(false)}>

                {item.name}
              </Link>
          )}
          </div>
        </div>
      }
    </header>);

}