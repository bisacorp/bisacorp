"use client";

import Link from "next/link";
import { Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary dark:bg-zinc-950 text-white dark:text-foreground py-20 border-t border-border/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-headline font-bold text-white">
                BISA<span className="text-accent">Corp</span>
              </span>
            </Link>
            <p className="text-white/70 dark:text-muted-foreground leading-relaxed mb-6">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/bisa-corp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 dark:bg-zinc-900 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
              >
                <Linkedin size={20} className="text-white" />
              </Link>
              <Link
                href="https://www.instagram.com/bisa.corporation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 dark:bg-zinc-900 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
              >
                <Instagram size={20} className="text-white" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">
                {t.footer.servicesTitle}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#services"
                    className="text-white/70 dark:text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {t.services.web.title}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="text-white/70 dark:text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {t.services.app.title}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="text-white/70 dark:text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {t.services.ai.title}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="text-white/70 dark:text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {t.services.design.title}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">
                {t.footer.companyTitle}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-white/70 dark:text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {t.footer.links.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#portfolio"
                    className="text-white/70 dark:text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {t.footer.links.portfolio}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className="text-white/70 dark:text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {t.footer.links.contact}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 dark:border-border/20 flex flex-col md:flex-row justify-between items-center text-sm text-white/50 dark:text-muted-foreground/50">
          <p>© 2026 BISA Corp Digital. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
