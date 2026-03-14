
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/hooks/use-language";

export function Hero() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 dark:bg-primary/10 -skew-x-12 transform translate-x-1/2 -z-10" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary leading-tight">
              {t.hero.title} <span className="text-accent">{t.hero.vision}</span> {t.hero.subtitle}
            </h1>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide">
              {t.hero.badge}
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-lg rounded-full">
              <Link href="/#services">
                {t.hero.btnServices} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8 h-14 text-lg rounded-full border-primary text-primary hover:bg-primary/5">
              <Link href="/#portfolio">{t.hero.btnPortfolio}</Link>
            </Button>
          </div>
        </div>

        <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
          <div className="absolute inset-0 bg-accent/20 rounded-3xl -rotate-3 scale-95 blur-2xl" />
          <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10">
            <Image
              src={heroImage?.imageUrl || "https://picsum.photos/seed/bisa/800/600"}
              alt="BISA Corp Hero"
              fill
              className="object-cover dark:brightness-90"
              priority
              data-ai-hint="corporate office"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
