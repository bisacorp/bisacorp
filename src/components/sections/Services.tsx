"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Code,
  Smartphone,
  BrainCircuit,
  Palette,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.web.title,
      description: t.services.web.desc,
      icon: Code,
      features: t.services.web.features,
    },
    {
      title: t.services.app.title,
      description: t.services.app.desc,
      icon: Smartphone,
      features: t.services.app.features,
    },
    {
      title: t.services.ai.title,
      description: t.services.ai.desc,
      icon: BrainCircuit,
      features: t.services.ai.features,
    },
    {
      title: t.services.design.title,
      description: t.services.design.desc,
      icon: Palette,
      features: t.services.design.features,
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-background/50 transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">
            {t.services.badge}
          </h2>
          <h3 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6">
            {t.services.title}
          </h3>
          <p className="text-lg text-muted-foreground">
            {t.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group perspective h-[400px] cursor-pointer"
            >
              <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:[transform:rotateY(-180deg)]">
                {/* Front Side */}
                <Card className="absolute inset-0 backface-hidden border border-border shadow-lg bg-card flex flex-col">
                  <CardHeader className="pt-8 px-8">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                      <service.icon size={32} />
                    </div>
                    <CardTitle className="text-xl font-bold text-primary mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 mt-auto"></CardContent>
                </Card>

                {/* Back Side */}
                <Card className="absolute inset-0 backface-hidden rotate-y-180 border-none shadow-lg bg-primary dark:bg-zinc-900 text-white dark:text-foreground flex flex-col justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent to-transparent" />

                  <CardHeader className="px-8 relative z-10">
                    <CardTitle className="text-xl font-bold text-accent mb-4">
                      {t.services.keyFeatures}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 relative z-10">
                    <ul className="space-y-4">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center text-sm">
                          <CheckCircle2
                            size={18}
                            className="text-accent mr-3 shrink-0"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
