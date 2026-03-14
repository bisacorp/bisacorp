
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { AIExplainer } from "@/components/sections/AIExplainer";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent/30">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <AIExplainer />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
