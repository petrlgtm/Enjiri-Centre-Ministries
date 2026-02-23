# Enjiri Center Ministries International — Project Instructions

## Project Overview

This is the official website for **Enjiri Center Ministries International**, a church/ministry organization. It is a Next.js 16 application with Sanity CMS integration, built with TypeScript, Tailwind CSS v4, and Framer Motion.

**Client:** Joshua Nziza (freelance project)

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.x (strict mode) |
| CMS | Sanity | 5.x (next-sanity 12.x) |
| Styling | Tailwind CSS | 4.x (PostCSS plugin) |
| Animation | Framer Motion | 12.x |
| Icons | react-icons | 5.x |
| Package Manager | pnpm | — |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── charity/            # Charity page (new)
│   ├── contact/            # Contact page
│   ├── donate/             # Donation page
│   ├── sermons/            # Sermons listing + [slug] detail
│   ├── services/           # Services page
│   ├── studio/[[...tool]]/ # Embedded Sanity Studio
│   ├── layout.tsx          # Root layout (Inter + Playfair Display fonts)
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles + 50+ animation keyframes
├── components/
│   ├── about/              # ChurchHistory, LeadershipTeam, VisionMission
│   ├── home/               # Hero, MissionSection, UpcomingEvents, LatestSermons, CallToAction
│   ├── layout/             # Navbar, Footer
│   ├── sermons/            # SermonCard, SermonFilter, SermonPlayer
│   ├── services/           # EventCard, ServiceSchedule
│   └── ui/                 # Button, Container, SectionHeading, PageHeader,
│                           # NewsletterSignup, CountUp, ImageReveal, ParallaxImage,
│                           # PageTransition, SectionDivider, BackToTop
├── sanity/
│   ├── client.ts           # Sanity client (projectId from env)
│   ├── queries.ts          # All GROQ queries
│   ├── image.ts            # Image URL builder
│   └── schemas/            # Document types: sermon, event, leader, siteSettings
└── lib/
    └── utils.ts            # cn(), formatDate(), formatTime(), getYouTubeEmbedUrl()
```

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Code Conventions

### Component Patterns
- **"use client"** directive on all interactive components (anything with state, effects, event handlers, or Framer Motion)
- **Default exports** for all page and component files
- **TypeScript interfaces** for all component props (defined in the same file, above the component)
- **Composition pattern** — pages compose sections from domain-specific component folders
- Container component (`<Container>`) wraps page-level content for consistent max-width and padding

### Styling Rules
- **Tailwind CSS v4** with PostCSS — no tailwind.config file; uses CSS-first configuration in `globals.css`
- **Mobile-first responsive** — base styles are mobile, scale up with `md:`, `lg:`, `xl:` prefixes
- **CSS custom properties** in `:root` for brand colors (gold `#b8952e`, red `#b91c1c`, warm neutrals)
- **Two font families**: Inter (sans, body text) and Playfair Display (serif, headings/display)
- **Glass morphism** effects via `backdrop-blur` + semi-transparent backgrounds
- **Gradient borders** and **mesh gradients** for premium visual treatment
- `cn()` utility from `@/lib/utils` for conditional class merging (simple string join, not clsx)
- Never use inline styles — always Tailwind utilities or CSS classes from globals.css

### Animation Conventions
- **Framer Motion** for all component-level animations (enter/exit, hover, tap, scroll-triggered)
- **globals.css keyframes** for CSS-only animations (mesh-shift, shine, aurora, floating particles)
- Preferred easing: `cubic-bezier(0.22, 1, 0.36, 1)` for smooth, premium motion
- Always respect `prefers-reduced-motion` — wrap motion in checks or use Framer Motion's built-in support
- Stagger children animations using Framer Motion's `staggerChildren` in parent variants

### Sanity CMS

#### Document Types
1. **sermon** — title, slug, date, speaker, series, description, videoUrl, audioUrl, thumbnail, tags
2. **event** — title, date, endDate, location, description, image, isRecurring
3. **leader** — name, role, bio, image, order
4. **siteSettings** — churchName, tagline, description, logo, heroImage, address, phone, email, socialLinks, serviceSchedule

#### GROQ Queries
All queries live in `src/sanity/queries.ts`. Use the `groq` tagged template from `next-sanity`. Existing queries:
- `allSermonsQuery`, `sermonBySlugQuery`, `latestSermonsQuery`
- `upcomingEventsQuery`, `latestEventsQuery`
- `allLeadersQuery`
- `siteSettingsQuery`

#### Sanity Client
- Configured in `src/sanity/client.ts`
- Project ID and dataset from environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- CDN enabled in production, disabled in dev
- API version: `2024-01-01`
- Sanity Studio embedded at `/studio` route

#### Image Handling
- Use `@sanity/image-url` builder from `src/sanity/image.ts`
- Remote images allowed from: `cdn.sanity.io`, `images.unsplash.com`
- Always use Next.js `<Image>` component with proper `width`, `height`, or `fill` + `sizes` props

### File Naming
- Components: `PascalCase.tsx` (e.g., `SermonCard.tsx`)
- Pages: `page.tsx` in route directories (Next.js App Router convention)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)
- Sanity schemas: `camelCase.ts` (e.g., `siteSettings.ts`)

### Import Aliases
- `@/*` maps to `./src/*` — always use `@/` imports, never relative paths like `../../`

## Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| Gold (primary) | `#b8952e` | Buttons, accents, headings |
| Gold light | `#c9a84c` | Hover states, light accents |
| Gold dark | `#8a6d1b` | Active states, dark accents |
| Red | `#b91c1c` | CTA, alerts, secondary accent |
| Red light | `#dc2626` | Hover on red elements |
| Cream bg | `#fffbf5` | Page backgrounds |
| Warm neutrals | gray-50 to gray-900 | Text, borders, surfaces |

### Typography Scale
- **Display/Hero**: Playfair Display, text-5xl to text-7xl, font-bold
- **Section Headings**: Playfair Display, text-3xl to text-4xl, font-bold
- **Subheadings**: Inter, text-xl to text-2xl, font-semibold
- **Body**: Inter, text-base to text-lg, font-normal
- **Small/Caption**: Inter, text-sm, text-gray-600

### Button Variants (src/components/ui/Button.tsx)
- **primary**: Gold gradient background with shine overlay
- **secondary**: Red gradient background
- **outline**: Transparent with gold border
- **ghost**: Transparent, text only
- Sizes: `sm`, `md`, `lg`
- Supports rendering as `<Link>` (when `href` prop provided) or `<button>`

### Spacing & Layout
- Max content width via `<Container>` component
- Sections use `py-16 md:py-24` for vertical spacing
- Cards use `rounded-2xl` with subtle shadows

## Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=    # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=       # Dataset name (default: production)
```

## Key Architectural Decisions

1. **Embedded Sanity Studio** at `/studio` — the CMS is part of the Next.js app, not a separate deployment
2. **No external state management** — React useState/useEffect for all client state
3. **No API routes** — data fetched directly from Sanity in server components or via client
4. **Static-first approach** — pages should leverage Next.js static generation where possible
5. **Animation-heavy design** — this is a premium church website; rich motion and visual effects are intentional, not over-engineering
6. **Single-page sections** — each page is composed of full-viewport or near-full-viewport sections with scroll-based reveals

## Rules for AI Assistants

### Do
- Use `pnpm` for all package operations (not npm or yarn)
- Follow the existing Tailwind + Framer Motion patterns when building new components
- Keep animations smooth and premium — match the existing motion language
- Use the `@/` import alias for all imports
- Write TypeScript with proper interfaces for props
- Use `"use client"` only where necessary (components with interactivity)
- Fetch Sanity data in server components when possible
- Use `<Image>` from `next/image` for all images
- Match the warm, inviting, gold-and-cream design language
- Test responsiveness — the site must work on mobile

### Don't
- Don't use npm or yarn — this project uses pnpm
- Don't install unnecessary dependencies — check if existing tools can solve the problem first
- Don't use CSS-in-JS libraries — we use Tailwind + globals.css
- Don't use `clsx` or `classnames` — use the project's `cn()` from `@/lib/utils`
- Don't create new utility files without good reason — prefer extending `utils.ts`
- Don't hardcode content that should come from Sanity CMS
- Don't use inline styles — use Tailwind utilities or CSS classes
- Don't skip the `"use client"` directive on interactive components
- Don't use relative imports — always use `@/` alias
- Don't add excessive comments or documentation beyond what's necessary
- Don't commit `.env.local` or any file containing secrets
