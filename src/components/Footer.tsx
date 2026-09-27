import Link from "next/link";
import Image from "next/image";

const LOGO =
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/EE-Logo-1763684405565.JPG?width=8000&height=8000&resize=contain";

export function Footer() {
  return (
    <footer className="bg-night text-sage">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4 lg:px-8">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src={LOGO}
              alt="evermore equine logo"
              width={56}
              height={56}
              className="size-14 rounded-lg object-contain"
            />
            <span className="font-script text-[30px] leading-none text-cream">
              evermore equine
            </span>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed">
            A boutique riding lesson facility focused on foundational horsemanship and
            safety, in a peaceful setting on 17 acres in Bear Creek, PA.
          </p>
        </div>

        <div className="space-y-2.5 text-[15px]">
          <p className="font-extrabold text-cream">Visit</p>
          <p>180 White Haven Rd.</p>
          <p>Bear Creek, PA 18602</p>
          <p>
            <a href="tel:15707095501" className="hover:text-cream">
              (570) 709-5501
            </a>
          </p>
          <p>
            <a href="mailto:connect@evermoreequine.com" className="hover:text-cream">
              connect@evermoreequine.com
            </a>
          </p>
        </div>

        <div className="space-y-2.5 text-[15px]">
          <p className="font-extrabold text-cream">Explore</p>
          <p>
            <Link href="/about" className="hover:text-cream">
              Our Story
            </Link>
          </p>
          <p>
            <Link href="/services" className="hover:text-cream">
              Services &amp; Pricing
            </Link>
          </p>
          <p>
            <Link href="/contact" className="hover:text-cream">
              Schedule &amp; Contact
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-sage/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-[13px] md:flex-row md:justify-between lg:px-8">
          <p>&reg; {new Date().getFullYear()} evermore equine LLC. All rights reserved</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Website-Terms-Conditions.docx-1765564053765.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Privacy-Policy-1765563925664.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.docodelab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
            >
              <span>Website by</span>
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/DO-CODE-LAB-White-Logo-1763698867902.png?width=8000&height=8000&resize=contain"
                alt="DO Code Lab"
                width={96}
                height={32}
                className="h-8 w-24 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
