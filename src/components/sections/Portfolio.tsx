"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";

export function Portfolio() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      ...t.portfolio.projects[0],
      categoryKey: "AI",
      image: PlaceHolderImages.find((img) => img.id === "ai-project")?.imageUrl,
    },
    {
      ...t.portfolio.projects[1],
      categoryKey: "Web",
      image: PlaceHolderImages.find((img) => img.id === "web-project")
        ?.imageUrl,
    },
    {
      ...t.portfolio.projects[2],
      categoryKey: "App",
      image: PlaceHolderImages.find((img) => img.id === "app-project")
        ?.imageUrl,
    },
    {
      ...t.portfolio.projects[3],
      categoryKey: "Design",
      image: PlaceHolderImages.find((img) => img.id === "design-project")
        ?.imageUrl,
    },
  ];

  const filters = [
    { name: t.portfolio.filters.all, value: "All" },
    { name: t.portfolio.filters.web, value: "Web" },
    { name: t.portfolio.filters.app, value: "App" },
    { name: t.portfolio.filters.ai, value: "AI" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.categoryKey === activeFilter;
  });

  return (
    <section
      id="portfolio"
      className="py-24 bg-background transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl mb-8 md:mb-0">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">
              {t.portfolio.badge}
            </h2>
            <h3 className="text-4xl font-headline font-bold text-primary">
              {t.portfolio.title}
            </h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "text-sm font-semibold transition-all whitespace-nowrap px-4 py-2 rounded-full",
                  activeFilter === filter.value
                    ? "text-accent border-b-2 border-accent bg-accent/10"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project, idx) => (
            <div
              key={`${idx}-${language}`}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-md hover:shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95 duration-300 border border-border"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={project.image || "/main-content.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="software dashboard"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <Badge
                  variant="secondary"
                  className="mb-4 bg-accent/10 text-accent border-none rounded-full px-4"
                >
                  {project.category}
                </Badge>
                <h4 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{t.portfolio.empty}</p>
          </div>
        )}
      </div>
    </section>
  );
}
