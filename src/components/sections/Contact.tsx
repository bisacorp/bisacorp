"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";

export function Contact() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleFillMessage = (e: Event) => {
      const customEvent = e as CustomEvent<{
        message: string;
        subject: string;
      }>;
      if (customEvent.detail?.message) {
        setMessage(customEvent.detail.message);
      }
      if (customEvent.detail?.subject) {
        setSubject(customEvent.detail.subject);
      }
    };

    window.addEventListener("fill-contact-message", handleFillMessage);
    return () => {
      window.removeEventListener("fill-contact-message", handleFillMessage);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim pesan.");
      toast({
        title: t.contact.form.successTitle,
        description: t.contact.form.successDesc,
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      toast({
        title: "Gagal mengirim",
        description: err instanceof Error ? err.message : "Terjadi kesalahan.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-background transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">
              {t.contact.badge}
            </h2>
            <h3 className="text-4xl font-headline font-bold text-primary mb-8 leading-tight">
              {t.contact.title}
            </h3>
            <p className="text-lg text-muted-foreground mb-12">
              {t.contact.description}
            </p>

            <div className="space-y-8">
              <a
                href="mailto:bisacorp.bisnis@gmail.com"
                className="flex items-start group hover:bg-primary/5 p-4 -m-4 rounded-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mr-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary">
                    {t.contact.emailTitle}
                  </h4>
                  <p className="text-muted-foreground">
                    bisacorp.bisnis@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/6289677218035"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start group hover:bg-primary/5 p-4 -m-4 rounded-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mr-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary">
                    {t.contact.waTitle}
                  </h4>
                  <p className="text-muted-foreground">
                    +62 896 7721 8035 {t.contact.waSubtitle}
                  </p>
                </div>
              </a>

              <div className="flex items-start p-4 -m-4">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mr-6">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary">
                    {t.contact.officeTitle}
                  </h4>
                  <p className="text-muted-foreground">
                    Jimbaran, Bali, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-10 rounded-3xl shadow-xl border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.form.name}</Label>
                  <Input
                    id="name"
                    placeholder={t.contact.form.namePlaceholder}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.contact.form.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.contact.form.emailPlaceholder}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t.contact.form.subject}</Label>
                <Input
                  id="subject"
                  placeholder={t.contact.form.subjectPlaceholder}
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t.contact.form.message}</Label>
                <Textarea
                  id="message"
                  placeholder={t.contact.form.messagePlaceholder}
                  className="min-h-[150px] bg-background border-border"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground h-14 text-lg font-bold rounded-xl"
              >
                {loading ? t.contact.form.btnSending : t.contact.form.btnSend}
                <Send size={20} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
