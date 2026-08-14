"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import {
  ArrowLeft,
  Calendar,
  User,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
  Code2,
} from "lucide-react";

interface PortfolioPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function PortfolioDetailPage({ params }: PortfolioPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { t } = useLanguage();

  const labels = t.portfolio.detailLabels || {
    backToPortfolio: "Kembali ke Portofolio",
    client: "Klien",
    role: "Peran",
    date: "Tahun / Waktu",
    category: "Kategori",
    visitWebsite: "Kunjungi Situs Live",
    overview: "Gambaran Umum Proyek",
    challenge: "Tantangan",
    solution: "Solusi Kami",
    keyFeatures: "Fitur Utama",
    techStack: "Teknologi yang Digunakan",
    results: "Hasil & Dampak",
    ctaTitle: "Tertarik Membuat Proyek Serupa?",
    ctaDesc: "Tim BISA Corp siap membantu mewujudkan ide digital Anda menjadi solusi yang siap pakai dan terukur.",
    ctaButton: "Hubungi Kami Sekarang",
    notFoundTitle: "Portofolio Tidak Ditemukan",
    notFoundDesc: "Maaf, halaman proyek portofolio yang Anda cari tidak tersedia.",
    backToHome: "Kembali ke Beranda",
  };

  const project = t.portfolio.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <main className="container mx-auto px-6 py-40 text-center flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-headline font-bold text-primary mb-4">
            {labels.notFoundTitle}
          </h1>
          <p className="text-muted-foreground max-w-md mb-8">
            {labels.notFoundDesc}
          </p>
          <Button asChild variant="default" className="bg-primary text-primary-foreground">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              {labels.backToHome}
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const projectImage = "/portfolio/bisa-comp-profile-new.png";

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header / Breadcrumb Section */}
        <section className="container mx-auto px-6 mb-12">
          <Link
            href="/#portfolio"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80 transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            {labels.backToPortfolio}
          </Link>

          <div className="max-w-4xl">
            <Badge
              variant="secondary"
              className="mb-4 bg-accent/10 text-accent border-none rounded-full px-4 py-1 text-sm font-semibold"
            >
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.desc}
            </p>
          </div>
        </section>

        {/* Project Meta Cards */}
        <section className="container mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-card border border-border/60 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {labels.client}
                </p>
                <p className="text-base font-bold text-primary">{project.client || "BISA Corp"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {labels.role}
                </p>
                <p className="text-base font-bold text-primary">{project.role || "Full-Stack & AI"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {labels.date}
                </p>
                <p className="text-base font-bold text-primary">{project.date || "2026"}</p>
              </div>
            </div>

            <div className="flex items-center justify-start lg:justify-end">
              {project.liveUrl ? (
                <Button asChild variant="default" className="bg-primary text-primary-foreground w-full sm:w-auto">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    {labels.visitWebsite}
                    <ExternalLink size={16} />
                  </a>
                </Button>
              ) : (
                <Button disabled variant="outline" className="w-full sm:w-auto">
                  {labels.visitWebsite}
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Hero Showcase Image */}
        <section className="container mx-auto px-6 mb-20">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-border bg-card/50 p-2 md:p-4">
            <div className="relative w-full h-[400px] md:h-[650px] rounded-2xl overflow-hidden">
              <Image
                src={projectImage}
                alt={project.title}
                fill
                priority
                className="object-contain object-top transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* Overview & Content Section */}
        <section className="container mx-auto px-6 max-w-5xl">
          {/* Overview */}
          {project.overview && (
            <div className="mb-16 p-8 md:p-10 rounded-3xl bg-card border border-border/60 shadow-md">
              <h2 className="text-2xl font-headline font-bold text-primary mb-4 flex items-center gap-3">
                <SparklesIcon className="text-accent" />
                {labels.overview}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.overview}
              </p>
            </div>
          )}

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {project.challengeDesc && (
              <div className="p-8 rounded-3xl bg-card border border-border/60 shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-6">
                    <Target size={24} />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-primary mb-3">
                    {project.challengeTitle || labels.challenge}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.challengeDesc}
                  </p>
                </div>
              </div>
            )}

            {project.solutionDesc && (
              <div className="p-8 rounded-3xl bg-card border border-border/60 shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                    <Lightbulb size={24} />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-primary mb-3">
                    {project.solutionTitle || labels.solution}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.solutionDesc}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Key Features & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Features (Takes 2 Cols) */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="lg:col-span-2 p-8 md:p-10 rounded-3xl bg-card border border-border/60 shadow-md">
                <h3 className="text-2xl font-headline font-bold text-primary mb-6 flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-accent" />
                  {project.keyFeaturesTitle || labels.keyFeatures}
                </h3>
                <ul className="space-y-4">
                  {project.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mr-3 mt-1" />
                      <span className="text-muted-foreground text-base leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack (Takes 1 Col) */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="p-8 rounded-3xl bg-card border border-border/60 shadow-md">
                <h3 className="text-2xl font-headline font-bold text-primary mb-6 flex items-center gap-3">
                  <Code2 size={24} className="text-accent" />
                  {project.techStackTitle || labels.techStack}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="px-4 py-2 text-sm font-medium rounded-xl bg-background/50 border-border/80"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results & Impact */}
          {project.results && project.results.length > 0 && (
            <div className="p-8 md:p-10 rounded-3xl bg-primary text-white dark:bg-zinc-900 dark:text-foreground mb-20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl font-headline font-bold mb-6 flex items-center gap-3">
                  <TrendingUp size={24} className="text-accent" />
                  {project.resultsTitle || labels.results}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.results.map((result, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white/5 dark:bg-zinc-800/50 border border-white/10 dark:border-zinc-700/50"
                    >
                      <p className="text-white/90 dark:text-muted-foreground text-sm leading-relaxed">
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Call to Action Card */}
          <div className="p-10 md:p-14 rounded-3xl bg-accent/10 border border-accent/20 text-center relative overflow-hidden">
            <h3 className="text-3xl font-headline font-bold text-primary mb-4">
              {labels.ctaTitle}
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-base">
              {labels.ctaDesc}
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold rounded-full px-8">
              <Link href="/#contact">{labels.ctaButton}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
