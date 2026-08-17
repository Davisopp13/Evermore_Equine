export const dynamic = "force-dynamic";

import Image from "next/image";
import { getAllContent } from "@/lib/actions/content";
import { ContactForm } from "./ContactForm";

export default async function ContactPage() {
  const c = await getAllContent();

  return (
    <main className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section className="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-[#2D4F1E]">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e1c444d2-b20c-4128-9d1e-7b509ac38088/Attachment-1-1769783405836.png?width=8000&height=8000&resize=contain"
          alt="Pine Forest"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="container px-4 md:px-6 text-center relative z-10">
          <h1
            className="text-5xl font-normal text-white drop-shadow-lg pt-6"
            style={{ fontFamily: "var(--font-great-day)" }}
          >
            Schedule and Contact
          </h1>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Schedule Section */}
        <section className="space-y-4">
          <div className="mt-6 grid gap-6 md:grid-cols-2 items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Lesson Hours
              </h2>

              <div className="space-y-4 border border-border rounded-lg bg-card text-card-foreground p-4">
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    {c["contact.hours.summer.label"] ?? "April - November"}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {c["contact.hours.summer.days"] ?? "Tuesday through Saturday"}
                  </p>
                  <p className="text-sm md:text-base font-medium !whitespace-pre-line">
                    {c["contact.hours.summer.time"] ?? "9am - 7pm"}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold text-primary mb-1">
                    {c["contact.hours.winter.label"] ?? "December - March"}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {c["contact.hours.winter.days"] ?? "Friday, Saturday, Sunday"}
                  </p>
                  <p className="text-sm md:text-base font-medium !whitespace-pre-line">
                    {c["contact.hours.winter.time"] ?? "TBD"}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Closed on federal holidays.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Location and Contact
              </h2>

              <div className="space-y-3 border border-border rounded-lg bg-card text-card-foreground p-4 text-sm md:text-base">
                <div>
                  <h3 className="font-semibold text-primary mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    {c["contact.address.line1"] ?? "180 White Haven Rd."}
                    <br />
                    {c["contact.address.line2"] ?? "Bear Creek PA 18602"}
                  </p>
                </div>

                <div className="border-t border-border pt-3">
                  <h3 className="font-semibold text-primary mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    <a
                      href={`tel:${c["contact.phone.href"] ?? "15707095501"}`}
                      className="hover:text-primary transition-colors"
                    >
                      {c["contact.phone"] ?? "(570) 709-5501"}
                    </a>
                  </p>
                </div>

                <div className="border-t border-border pt-3">
                  <h3 className="font-semibold text-primary mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a
                      href={`mailto:${c["contact.email"] ?? "connect@evermoreequine.com"}`}
                      className="text-primary underline hover:text-primary/80 transition-colors"
                    >
                      {c["contact.email"] ?? "connect@evermoreequine.com"}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="space-y-4">
          <h2
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Contact and Sign-Up
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Please fill out the contact form below for riding lesson sign-up or
            general questions.
          </p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
