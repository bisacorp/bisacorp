
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { explainAIServices, type AIServicesExplainerOutput } from "@/ai/flows/ai-services-explainer-flow";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function AIExplainer() {
  const { t } = useLanguage();
  const [businessType, setBusinessType] = useState("");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIServicesExplainerOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType) return;

    setLoading(true);
    try {
      const output = await explainAIServices({ businessType, problem });
      setResult(output);
    } catch (error) {
      console.error("Failed to generate AI explanation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-primary dark:bg-zinc-950 text-primary-foreground dark:text-foreground overflow-hidden relative border-y border-border/10">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6">
              <Sparkles size={16} className="mr-2" /> {t.aiExplainer.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 leading-tight">
              {t.aiExplainer.title}
            </h2>
            <p className="text-lg opacity-80 dark:text-muted-foreground mb-8 max-w-lg">
              {t.aiExplainer.description}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 dark:bg-card/50 p-8 rounded-3xl border border-white/10 dark:border-border/20 backdrop-blur-md">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-white dark:text-foreground">{t.aiExplainer.labelBusiness}</Label>
                <Input
                  id="businessType"
                  placeholder={t.aiExplainer.placeholderBusiness}
                  className="bg-white/10 dark:bg-background/50 border-white/20 dark:border-border/30 text-white dark:text-foreground placeholder:text-white/60 dark:placeholder:text-muted-foreground h-12 focus:ring-accent"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="problem" className="text-white dark:text-foreground">{t.aiExplainer.labelProblem}</Label>
                <Input
                  id="problem"
                  placeholder={t.aiExplainer.placeholderProblem}
                  className="bg-white/10 dark:bg-background/50 border-white/20 dark:border-border/30 text-white dark:text-foreground placeholder:text-white/60 dark:placeholder:text-muted-foreground h-12 focus:ring-accent"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading || !businessType}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 rounded-xl transition-all hover:scale-[1.02]"
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5" />
                )}
                {loading ? t.aiExplainer.btnLoading : t.aiExplainer.btnGenerate}
              </Button>
            </form>
          </div>

          <div className="min-h-[400px] flex items-center justify-center">
            {result ? (
              <div className="w-full space-y-6 animate-in fade-in slide-in-from-right duration-500">
                <h4 className="text-2xl font-headline font-bold text-accent">{t.aiExplainer.resultTitle}</h4>
                <div className="grid gap-4">
                  {result.useCases.map((useCase, i) => (
                    <Card key={i} className="bg-white/10 dark:bg-card border-white/20 dark:border-border/30 text-white dark:text-foreground border">
                      <CardContent className="p-6 flex items-start">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-4 shrink-0 text-sm font-bold">
                          {i + 1}
                        </div>
                        <p className="opacity-90 leading-relaxed">{useCase}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setResult(null)}
                  className="border-white/20 dark:border-border/30 text-white dark:text-foreground hover:bg-white/10 dark:hover:bg-muted"
                >
                  {t.aiExplainer.btnRestart}
                </Button>
              </div>
            ) : (
              <div className="text-center p-12 rounded-3xl border-2 border-dashed border-white/20 dark:border-border/30">
                <div className="w-20 h-20 bg-white/5 dark:bg-card/50 rounded-full flex items-center justify-center mx-auto mb-6 opacity-30">
                  <Wand2 size={40} className="text-white dark:text-foreground" />
                </div>
                <p className="text-white/60 dark:text-muted-foreground italic whitespace-pre-line">
                  {t.aiExplainer.emptyState}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
