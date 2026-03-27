"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Layout,
  Smartphone,
  Zap,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Ebook Design</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Turn Your PDF into a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Masterpiece</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            EbookCraft AI analyzes your content, extracts the core soul of your writing,
            and automatically renders it in a professional, high-end template tailored for your genre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-lg font-semibold gap-2">
                Craft Your Ebook Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold">
                See Examples
              </Button>
            </Link>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="rounded-2xl border bg-card/50 backdrop-blur aspect-video shadow-2xl overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-primary/20 text-primary animate-pulse">
                  <BookOpen className="h-12 w-12" />
                </div>
                <p className="text-xl font-medium text-muted-foreground">Preview of "The Modern Minimal" Template</p>
              </div>

              {/* Before/After Indicator */}
              <div className="absolute top-4 left-4 bg-background/80 px-4 py-2 rounded-lg border backdrop-blur text-sm font-bold">
                BEFORE: Raw PDF
              </div>
              <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                AFTER: EbookCraft AI
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Magic Behind the Craft</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our multi-engine pipeline processes your ebook to ensure every page looks like it was designed by a world-class book studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-yellow-400" />}
            title="Instant Analysis"
            description="Our AI extracts text, chapters, and sentiment in seconds to understand your ebook's soul."
          />
          <FeatureCard
            icon={<Layout className="h-8 w-8 text-blue-400" />}
            title="15+ Premium Templates"
            description="From Sci-Fi Neon to Classic Literary, we've got a design for every possible genre."
          />
          <FeatureCard
            icon={<Smartphone className="h-8 w-8 text-green-400" />}
            title="Read Anywhere"
            description="Export to High-Resolution PDF, EPUB, or use our premium shareable web reader."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30 rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Start for free, upgrade when you're ready to publish.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PricingCard
              title="Free"
              price="$0"
              features={["1 Ebook Upload", "Standard Templates", "Watermarked Web Reader"]}
              buttonText="Start Free"
            />
            <PricingCard
              title="Pro"
              price="$29"
              features={["Unlimited Uploads", "All 15+ Premium Templates", "No Watermark", "Priority AI Analysis", "EPUB Export"]}
              popular
              buttonText="Go Pro"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-all hover:border-primary/50 group">
      <div className="mb-4 inline-block">{icon}</div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, features, popular, buttonText }: { title: string, price: string, features: string[], popular?: boolean, buttonText: string }) {
  return (
    <div className={`p-8 rounded-2xl border ${popular ? 'border-primary ring-1 ring-primary relative overflow-hidden' : 'bg-card'}`}>
      {popular && <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest">Most Popular</div>}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className="text-muted-foreground">/once</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" variant={popular ? 'default' : 'outline'}>{buttonText}</Button>
    </div>
  );
}
