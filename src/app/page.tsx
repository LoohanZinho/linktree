import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Checklist } from "@/components/landing/Checklist";
import { Cta } from "@/components/landing/Cta";
import { Stories } from "@/components/landing/Stories";
import { About } from "@/components/landing/About";
import { Testimonials } from "@/components/landing/Testimonials";
import { MoreFeatures } from "@/components/landing/MoreFeatures";
import { AppPreview } from "@/components/landing/AppPreview";
import { Guarantee } from "@/components/landing/Guarantee";
import { FinalCta } from "@/components/landing/FinalCta";
import { Bonuses } from "@/components/landing/Bonuses";
import { Footer } from "@/components/landing/Footer";
import { DynamicIsland } from "@/components/landing/DynamicIsland";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Features />
      <Checklist />
      <Cta />
      <Stories />
      <About />
      <Testimonials />
      <MoreFeatures />
      <AppPreview />
      <Guarantee />
      <FinalCta />
      <Bonuses />
      <Footer />
      <DynamicIsland />
    </div>
  );
}
