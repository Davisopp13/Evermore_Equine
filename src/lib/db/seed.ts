import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { siteContent } from "./schema";

// Bun automatically loads .env.local — no extra dotenv import needed.

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const db = drizzle(client);

const packages = [
  {
    name: "Opelite",
    subtitle: "One Lesson a Month",
    color: "#90EE90",
    options: [
      { duration: "30 Min", price: "$30", savings: null },
      { duration: "60 Min", price: "$50", savings: null },
    ],
  },
  {
    name: "Peace",
    subtitle: "Two Lessons a Month",
    color: "#FFD700",
    options: [
      { duration: "30 Min", price: "$60", savings: null },
      { duration: "60 Min", price: "$100", savings: null },
    ],
  },
  {
    name: "Style",
    subtitle: "Three Lessons a Month",
    color: "#D3D3D3",
    options: [
      { duration: "30 Min", price: "$90", savings: null },
      { duration: "60 Min", price: "$150", savings: null },
    ],
  },
  {
    name: "Fearless",
    subtitle: "Four Lessons a Month",
    color: "#FF6B6B",
    options: [
      { duration: "30 Min", price: "$120", savings: null },
      { duration: "60 Min", price: "$230", savings: "save $10" },
    ],
  },
  {
    name: "Daylight",
    subtitle: "Five Lessons a Month",
    color: "#FFA500",
    options: [
      { duration: "30 Min", price: "$170", savings: null },
      { duration: "60 Min", price: "$280", savings: "save $20" },
    ],
  },
  {
    name: "Happiness",
    subtitle: "Six Lessons a Month",
    color: "#FF69B4",
    options: [
      { duration: "30 Min", price: "$180", savings: null },
      { duration: "60 Min", price: "$330", savings: "save $30" },
    ],
  },
  {
    name: "Enchanted",
    subtitle: "Seven Lessons a Month",
    color: "#87CEEB",
    options: [
      { duration: "30 Min", price: "$240", savings: null },
      { duration: "60 Min", price: "$380", savings: "save $40" },
    ],
  },
  {
    name: "Stay, Stay, Stay",
    subtitle: "Eight Lessons a Month",
    color: "#DDA0DD",
    options: [
      { duration: "30 Min", price: "$240", savings: null },
      { duration: "60 Min", price: "$430", savings: "save $50" },
    ],
  },
];

const entries: Array<{ key: string; value: string }> = [
  // ── Home ────────────────────────────────────────────────────────────────
  { key: "home.hero.tagline", value: "where passion makes progress" },

  { key: "home.welcome.title", value: "Welcome to Evermore Equine" },
  {
    key: "home.welcome.paragraph1",
    value:
      "We are a boutique, small-scale riding lesson facility dedicated to providing a personalized, high-quality equestrian learning experience. We proudly serve riders of all ages, with a focus on beginner through intermediate riders who are eager to build a solid foundation in both horsemanship and riding.",
  },
  {
    key: "home.welcome.paragraph2",
    value:
      "We create an atmosphere where riders can come have fun, relax and have a positive outlet. Each rider decides whether they want to enjoy horsemanship as a fun, relaxing outlet, or take a more competitive approach. We follow the riders' pace and will guide them in accomplishing their personal goals.",
  },
  {
    key: "home.welcome.paragraph3",
    value:
      "Evermore Equine also values connection. We're grateful for the friends and family who stand with us, and we're committed to supporting the small businesses and animal rescues that make a lasting impact in our community. It's part of who we are and what we care about.",
  },

  { key: "home.mission.title", value: "Our Mission" },
  {
    key: "home.mission.paragraph1",
    value:
      "At Evermore Equine, we believe true equestrian skill begins on the ground. Our lesson program emphasizes safety, confidence, responsibility, and connection with the horse. We provide a well-rounded equestrian education that emphasizes safety, responsible horse care, and strong foundational riding skills.",
  },
  {
    key: "home.mission.paragraph2",
    value:
      "Our program includes instruction in basic barn practices, everyday horse handling and management, confident and effective riding techniques, and groundwork that fosters trust, communication and bond between horse and rider. Evermore Equine strives to be a safe place, where all people are welcome.",
  },

  { key: "home.basics.title", value: "From Basics to Beyond" },
  {
    key: "home.basics.paragraph2",
    value:
      "Our mission is to cultivate knowledgeable, capable, and compassionate equestrians; in the saddle, on the ground, and outside the barn. We want riders to take the knowledge they learn from Evermore Equine and implement their skills into all aspects of life.",
  },

  { key: "home.values.title", value: "Why Choose Evermore Equine?" },
  { key: "home.values.safety.title", value: "Safety First" },
  {
    key: "home.values.safety.body",
    value:
      "Our top priority is the safety of both rider and horse. We teach strictly adhered-to barn rules and safety protocols to ensure a secure learning environment.",
  },
  { key: "home.values.horsemanship.title", value: "Foundational Horsemanship" },
  {
    key: "home.values.horsemanship.body",
    value:
      "We go beyond just riding. Our programs include a comprehensive approach to horsemanship. Our lessons take place in and out of the saddle, to build a complete equestrian.",
  },
  { key: "home.values.atmosphere.title", value: "Peaceful Atmosphere" },
  {
    key: "home.values.atmosphere.body",
    value:
      "Nestled on 17 acres of beautiful land, our facility offers a warm, minimal, and distraction-free environment for you to connect with nature.",
  },

  {
    key: "home.cta.tagline",
    value: '"where passion makes progress"',
  },
  {
    key: "home.cta.paragraph1",
    value:
      'At Evermore Equine, we created our tag line, "where passion makes progress", encouraging our students to follow their passions, in and out of the barn.',
  },
  {
    key: "home.cta.paragraph2",
    value: "Email, text, or call for more information.",
  },

  // ── About ───────────────────────────────────────────────────────────────
  { key: "about.history.title", value: "The History of 180 White Haven Rd" },
  {
    key: "about.history.paragraph1",
    value:
      "Evermore Equine was established in 2025, but the property and history date back nearly two decades. The Haas family purchased 180 White Haven Road in 2010, which is seventeen acres of beautiful wooded land in the northeastern Pocono Mountains of Pennsylvania.",
  },
  {
    key: "about.history.paragraph2",
    value:
      "Shortly after the purchase, the original house was restored into a livable home, and construction took place to build a small equine facility and fields for pasture. Conservation of the Pocono Mountains is a Haas family priority, so the majority of the seventeen acres is undeveloped and reserved for natural wildlife.",
  },
  {
    key: "about.history.paragraph3",
    value:
      "Mariah, one of the Haas girls, spent the majority of her childhood here, where she would watch her two older sisters ride in the fields before she became a rider herself. Her first introduction to riding was with the family pony, Cappy.",
  },
  {
    key: "about.history.paragraph4",
    value:
      "Mariah's love and passion for horses continued to grow, and she went on to compete with her own horse, Big Red, in high school, then took her skills to university. Mariah studied Sport, Recreation, and Wellness with a concentration in Equine Performance and a minor in Intercultural Studies, graduating with a Bachelors of Science in 2022. She got her first official job working in New Jersey under top equine professionals.",
  },
  {
    key: "about.history.paragraph5",
    value:
      "With professional experience under her belt, Mariah wanted to go back to her roots and share the beauty of 180 white haven Rd with others, thus creating Evermore Equine. She continues to preserve nature and wildlife, while utilizing the property to share her love for horsemanship.",
  },
  {
    key: "about.history.paragraph6",
    value:
      "Mariah currently resides in Pennsylvania with her two bunnies, Thyme and Bean.",
  },

  { key: "about.dedication.title", value: "Where It All Began" },
  {
    key: "about.dedication.quote",
    value:
      '"Before making a big decision, leaders slow down, do careful research, and talk to people until they understand five key stakeholders: the customer, the employee, the owner, the community, and the process."',
  },
  {
    key: "about.dedication.quoteAuthor",
    value:
      "Robert I. Sutton, The Friction Project: How Smart Leaders Make the Right Things Easier and the Wrong Things Harder, regarding what the Haas family preaches.",
  },
  {
    key: "about.dedication.paragraph1",
    value:
      "Mariah's great-grandfather, Otto Haas, was born in March of 1872 in Stuttgart Germany. He co-founded a tanning material company in 1907. From Germany to Philadelphia, Otto created a legacy that continues to this day. As third and fourth-generation family members continue Otto's legacy, Mariah wanted to honor her great-grandfather in her own way. The legacy of Otto Haas is vast, but Mariah connects most to his fearless pioneering, improving the quality of life for children and families, preservation of open land, and passion for all things living.",
  },
  {
    key: "about.dedication.paragraph2",
    value:
      "Another important piece of Mariah's life is her family pony, Cappy, who inspired and brought to life Mariah's love for horses and the art of the equine sport. Since she was two years old, Cappy has been Mariah's loyal companion, by her side, bringing to life her love and passion for horsemanship every step of the way. Cappy is still a loyal family member, living a peaceful life in Pennsylvania.",
  },
  {
    key: "about.dedication.paragraph3",
    value:
      "In 2025, Mariah established Evermore Equine LLC, a place where her great-grandfather can be remembered and a place of equine sport. Mariah acknowledges her roots, where she came from, and those made it possible for her to do what she loves; her family, and Cappy.",
  },
  {
    key: "about.dedication.paragraph4",
    value:
      "May Evermore Equine's legacy mimic Otto's; the betterment of life for all, and Cappy's; the art of the equine sport, evermore.",
  },
  {
    key: "about.dedication.footer",
    value:
      "Mariah Dedicates Evermore Equine LLC to Otto Haas who is the origin of this story, and Cappy, Mariah's loyalest friend.",
  },

  { key: "about.brand.title", value: "Why Evermore & The Color Green?" },
  {
    key: "about.brand.paragraph1",
    value:
      "The name evermore comes from a song that is close to Mariah's heart. The song's summary is themes of finding a way out of a depressive state, processing past betrayals, and ultimately discovering that even painful experiences can lead to a stronger, more beautiful future and present self.",
  },
  {
    key: "about.brand.paragraph2",
    value:
      "Mariah successfully became a business owner, having 180 White Haven Rd be a place of betterment of life, evermore.",
  },
  {
    key: "about.brand.paragraph3",
    value:
      "Mariah uses the color green as it represents nature, growth, and renewal, as well as its association with balance, harmony, and stability.",
  },

  // ── Services ────────────────────────────────────────────────────────────
  {
    key: "services.tiers.justGreen.paragraph1",
    value:
      "We love our littles! At Evermore Equine, we offer a fun, hands-on experience for children 4-8 years old in a safe, confidence-building environment.",
  },
  {
    key: "services.tiers.justGreen.paragraph2",
    value:
      "Our lessons focus on teaching basic horsemanship skills through age-appropriate activities. Children learn horse safety, grooming techniques, and balancing on the horse.",
  },
  {
    key: "services.tiers.justGreen.paragraph3",
    value:
      "Our program is relaxed with no structured curriculum—each lesson is based on having fun and learning something new each time. We believe a good, stable foundation sets our young ones up for success!",
  },
  {
    key: "services.tiers.gallant.paragraph1",
    value:
      "We offer a detailed lesson program for our students ages 9-18. Students will learn a strong foundation in horsemanship and correct skills in the saddle.",
  },
  {
    key: "services.tiers.gallant.paragraph2",
    value:
      "As students advance, we emphasize responsibility, confidence, and goal-setting, encouraging riders to grow both in and out of the saddle. Our program offers hands-on learning in a positive environment.",
  },
  {
    key: "services.tiers.gallant.paragraph3",
    value:
      "Each Gallant student will receive a hard copy detailed packet of level I checklist materials to work through at their own pace. We work through the curriculum in a positive and structured setting.",
  },
  {
    key: "services.tiers.gallant.paragraph4",
    value:
      "We want students to take the knowledge they learn from Evermore Equine and implement their skills into all aspects of life.",
  },
  {
    key: "services.tiers.trailblazer.paragraph1",
    value:
      "We welcome all adult students! Our Trail Blazers don't follow a specific curriculum, rather we let our adult students choose how they want to structure their lessons.",
  },
  {
    key: "services.tiers.trailblazer.paragraph2",
    value:
      "Whether you're a complete beginner or returning to riding after years away, we meet you where you are and support your individual goals at any experience level.",
  },

  { key: "services.pricing.thirtyMin", value: "$50" },
  { key: "services.pricing.oneHour", value: "$70" },
  {
    key: "services.lessonInfo",
    value: JSON.stringify([
      "Each lesson is private unless group lesson is requested",
      "All lesson packages are due on the day of first lesson",
      "All riders are required to wear long pants, boots, and an ASTM certified helmet while mounted",
      "Evermore Equine provides Certified Helmets for all riders",
      "We welcome all friends, family, and pets, please keep all pets leashed for their safety",
      "All visitors are required to wear closed toe shoes for their safety",
    ]),
  },
  {
    key: "services.paymentMethods",
    value: JSON.stringify([
      "Venmo (@evermore.equine)",
      "Cash",
      "Check (made out to Evermore Equine)",
      "Lessons may be rescheduled or gifted, but cannot be refunded",
    ]),
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  { key: "contact.hours.summer.label", value: "April - November" },
  { key: "contact.hours.summer.days", value: "Tuesday through Saturday" },
  { key: "contact.hours.summer.time", value: "9am - 7pm" },
  { key: "contact.hours.winter.label", value: "December - March" },
  { key: "contact.hours.winter.days", value: "Friday, Saturday, Sunday" },
  { key: "contact.hours.winter.time", value: "TBD" },
  { key: "contact.address.line1", value: "180 White Haven Rd." },
  { key: "contact.address.line2", value: "Bear Creek PA 18602" },
  { key: "contact.phone", value: "(570) 709-5501" },
  { key: "contact.phone.href", value: "15707095501" },
  { key: "contact.email", value: "evermore.equine.llc@gmail.com" },
];

async function seed() {
  console.log("Seeding site_content table...");
  for (const entry of entries) {
    await db
      .insert(siteContent)
      .values({ key: entry.key, value: entry.value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteContent.key,
        set: { value: entry.value, updatedAt: new Date() },
      });
    console.log(`  ✓ ${entry.key}`);
  }
  console.log(`\nDone. Seeded ${entries.length} entries.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
