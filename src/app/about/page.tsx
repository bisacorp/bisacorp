
"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function AboutPage() {
  const { t, language } = useLanguage();
  
  const teamMembers = t.about.team.members.map((member, idx) => ({
    ...member,
    image: PlaceHolderImages.find(img => img.id === `team-member-${idx + 1}`)?.imageUrl
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Header Section */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary mb-8 leading-tight">
              {t.about.hero.title} <span className="text-accent">{t.about.hero.digital}</span> {t.about.hero.since}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.about.hero.desc}
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-primary dark:bg-zinc-900 text-white dark:text-foreground py-24 mb-24 relative overflow-hidden">
          {/* Decorative element for dark mode */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://picsum.photos/seed/bisa-mission/800/600"
                alt="Mission"
                fill
                className="object-cover"
                data-ai-hint="collaboration meeting"
              />
            </div>
            <div>
              <h2 className="text-4xl font-headline font-bold mb-8">{t.about.mission.title}</h2>
              <p className="text-lg text-white/80 dark:text-muted-foreground mb-8 leading-relaxed">
                {t.about.mission.desc}
              </p>
              <ul className="space-y-4">
                {t.about.mission.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-lg">
                    <CheckCircle2 size={24} className="mr-4 text-accent shrink-0" />
                    <span className="text-white dark:text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-6 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">{t.about.team.badge}</h2>
            <h3 className="text-4xl font-headline font-bold text-primary">{t.about.team.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, idx) => (
              <div key={`${idx}-${language}`} className="group text-center">
                <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-8 border-white dark:border-zinc-800 shadow-xl group-hover:border-accent/20 transition-all duration-500">
                  <Image
                    src={member.image || "https://picsum.photos/seed/team/400/400"}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    data-ai-hint="professional portrait"
                  />
                </div>
                <h4 className="text-2xl font-bold text-primary mb-1">{member.name}</h4>
                <p className="text-accent font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
