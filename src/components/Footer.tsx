import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>evermore equine</h3>
              <p className="text-primary-foreground/80 max-w-xs">A boutique, small-scale riding lesson facility dedicated to providing a personalized, high-quality equestrian learning experience focused on foundational horsemanship and safety in a peaceful setting.
              </p>
            </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>180 White Haven Rd., Bear Creek, PA 18602</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>(570) 709-5501</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:evermore.equine@gmail.com" className="hover:text-white transition-colors">
                  evermore.equine@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors !whitespace-pre-line">Schedule & Contact

                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 bg-primary/90">
        <div className="mx-auto max-w-7xl px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-4 md:order-2 md:mt-0">
            <p className="text-center text-xs leading-5 text-primary-foreground/60">
              &reg; {new Date().getFullYear()} evermore equine LLC. All rights reserved
            </p>
          </div>
          <div className="mt-4 md:order-2 md:mt-0 flex items-center gap-4">
            <a
              href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Website-Terms-Conditions.docx-1765564053765.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-foreground/60 hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Privacy-Policy-1765563925664.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-foreground/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </div>
          <div className="mt-4 md:order-1 md:mt-0">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-primary-foreground/50">Website built by</span>
              <a
                href="https://www.docodelab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/DO-CODE-LAB-White-Logo-1763698867902.png?width=8000&height=8000&resize=contain"
                  alt="DoCodeLab Logo"
                  width={160}
                  height={48}
                  className="h-10 w-32 md:h-12 md:w-40 object-contain" />

              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>);

}