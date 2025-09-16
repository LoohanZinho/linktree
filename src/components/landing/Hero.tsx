import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { BrowserMockup } from "./BrowserMockup";

export function Hero() {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <div className="flex items-center gap-2 text-primary mb-4 drop-shadow-[0_0_8px_hsl(var(--primary))] animate-pulse">
            <Instagram />
            <span className="font-bold">@maikonkraemer</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            HOJE VOCÊ PODE GARANTIR SUA VAGA NO <span className="text-primary">KRAKENCLASS</span>
          </h1>
          <p className="text-lg text-gray-300 mb-2">
            O método completo para você criar e vender seu próprio produto digital do zero e faturar de <span className="font-bold text-white">4 a 10 mil reais por mês</span> (sem aparecer).
          </p>
          <p className="text-gray-400 mb-8">
            Mesmo que você seja um completo iniciante, não saiba nada sobre marketing digital e tenha pouco dinheiro para investir. Tudo o que você precisa está aqui.
          </p>
          <Button size="lg" className="bg-primary text-black font-bold text-lg w-full md:w-auto hover:bg-primary/90 transition-transform transform hover:scale-105 shadow-lg shadow-primary/30 hover:shadow-primary/40">
            QUERO APRENDER
          </Button>
        </div>
        <div className="relative h-auto z-10">
          <BrowserMockup />
        </div>
      </div>
    </section>
  );
}
