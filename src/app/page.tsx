import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, TreePine } from "lucide-react";
import { getAllContent } from "@/lib/actions/content";

export default async function Home() {
  const c = await getAllContent();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e1c444d2-b20c-4128-9d1e-7b509ac38088/Attachment-1-1769784170295.png?width=8000&height=8000&resize=contain"
            alt="Evermore Equine Pine Forest"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center space-y-8">
          <div className="space-y-4">
            <h1
              className="text-[70px] md:text-[82px] lg:text-[106px] text-white mx-auto max-w-full drop-shadow-lg !whitespace-pre-line !w-[82%] md:!max-w-[82%]"
              style={{ fontFamily: "var(--font-great-day)" }}
            >
              evermore equine
            </h1>
            <p
              className="mx-auto text-[45px] md:text-[51px] text-white font-medium drop-shadow-md italic !whitespace-pre-line !w-[82%] !max-w-[82%]"
              style={{ fontFamily: "var(--font-great-day)" }}
            >
              &ldquo;{c["home.hero.tagline"] ?? "where passion makes progress"}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 text-center space-y-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {c["home.welcome.title"] ?? "Welcome to Evermore Equine"}
            </h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {c["home.welcome.paragraph1"]}
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {c["home.welcome.paragraph2"]}
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {c["home.welcome.paragraph3"]}
              </p>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[500px] w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/_MG_8430-1-resized-1766587431984.jpg?width=8000&height=8000&resize=contain"
              alt="Horse and rider jumping at Evermore Equine"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section — Our Mission */}
      <section className="py-20 bg-secondary/30">
        <div
          className="container px-4 md:px-6"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {c["home.mission.title"] ?? "Our Mission"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c["home.mission.paragraph1"]}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c["home.mission.paragraph2"]}
              </p>

              <div className="pt-4">
                <Button
                  asChild
                  variant="ghost"
                  className="group pl-0 text-primary hover:bg-transparent hover:text-primary/80"
                >
                  <Link href="/about" className="flex items-center gap-2">
                    Read more about our history{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/zoomed-in-horses-resized-1766587867527.jpg?width=8000&height=8000&resize=contain"
                alt="Evermore Equine horses in paddock"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* From Basics to Beyond Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 text-center max-w-4xl mx-auto space-y-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-primary"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {c["home.basics.title"] ?? "From Basics to Beyond"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {c["home.basics.paragraph1"]}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {c["home.basics.paragraph2"]}
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 space-y-4 flex flex-col items-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {c["home.values.title"] ?? "Why Choose Evermore Equine?"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto"></p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {c["home.values.safety.title"]}
              </h3>
              <p className="text-muted-foreground">
                {c["home.values.safety.body"]}
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {c["home.values.horsemanship.title"]}
              </h3>
              <p className="text-muted-foreground">
                {c["home.values.horsemanship.body"]}
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {c["home.values.atmosphere.title"]}
              </h3>
              <p className="text-muted-foreground">
                {c["home.values.atmosphere.body"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6 space-y-8 flex flex-col items-center">
          <h2
            className="text-3xl md:text-4xl font-bold italic"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {c["home.cta.tagline"]}
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            {c["home.cta.paragraph1"]}
          </p>
          <p className="text-lg text-primary-foreground/80">
            {c["home.cta.paragraph2"]}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-secondary text-primary hover:bg-secondary/90 font-semibold text-lg px-10 py-6 rounded-full shadow-lg"
          >
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
