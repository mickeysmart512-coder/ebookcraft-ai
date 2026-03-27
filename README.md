# EbookCraft AI

**EbookCraft AI** is a professional SaaS application that transforms standard PDF ebooks into stunning, ready-to-publish masterpieces. Using multi-engine AI analysis, it selects the perfect design template for your content and renders it in a premium web reader.

## Features
- **AI Analysis**: Deep content analysis for genre, tone, and theme detection.
- **15+ Premium Templates**: From Modern Minimal to Sci-Fi Neon.
- **Interactive Reader**: Responsive, high-end web reading experience.
- **Multiple Exports**: One-click PDF and EPUB generation.
- **Fast Pipeline**: Real-time crafting status and instant previews.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Backend/DB**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Google Gemini API
- **PDF Processing**: pdf-parse

## Getting Started

1. **Clone the repository** (or use the provided scratch files).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Deployment
Deploy easily to Vercel or any Next.js compatible hosting:
- Connect your repo to Vercel.
- Add the environment variables in the project settings.
- Deploy!

---
*Crafted with passion for writers and publishers.*
