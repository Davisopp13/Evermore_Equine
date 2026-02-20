## Project Summary
Evermore Equine is a professional equestrian service website offering horse riding lessons, training, and facilities information. The site features age-based lesson tiers, pricing packages, and contact information for prospective students.

## Tech Stack
- Framework: Next.js 15
- Styling: Tailwind CSS
- UI Components: Shadcn UI (Radix UI)
- Icons: Lucide React
- Database/Storage: Supabase (referenced for uploads)
- Language: TypeScript

## Architecture
- `src/app/`: Next.js App Router for page routes (Home, Services, About, Contact)
- `src/components/`: Reusable React components
- `src/components/ui/`: Shadcn UI primitive components
- `public/`: Static assets

## User Preferences
- Use "Great Day" font for main page headers (banner titles).
- Use "Nunito" font for section headers and card titles.
- Banners with specific focal images should use `object-contain` to ensure the full image is visible, especially when the image aspect ratio is more square than the banner container.
- Header font sizes for primary page titles (e.g., "Services & Pricing", "Schedule & Contact") should be consistent (`text-5xl`).

## Project Guidelines
- Maintain a clean, professional equestrian aesthetic with high-quality imagery.
- Ensure responsive design for mobile and desktop users.
- Use CSS variables for consistent typography and color schemes.
- Keep RLS disabled on Supabase tables for simplicity (per Orchids standard).

## Common Patterns
- Banner sections use a relative container with an absolute-fill Next.js Image component and a text overlay.
- Pricing and service tiers are presented using Shadcn Cards.
