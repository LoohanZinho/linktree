import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-black text-white py-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="z-10">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Instagram />
            <span className="font-bold">@maikonkraemer</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hoje mesmo você pode garantir o seu lugar na{" "}
            <span className="text-primary">KRAKENCLASS</span>
          </h1>
          <p className="text-lg text-gray-300 mb-2">
            O método COMPLETO para você criar e vender seus próprios produtos
            digitais do zero e faturar{" "}
            <span className="font-bold text-white">DE 4 A 10 MIL REAIS</span>{" "}
            por mês SEM APARECER.
          </p>
          <p className="text-gray-400 mb-8">
            Mesmo que você seja um completo iniciante, não entenda nada de marketing digital e tenha pouco dinheiro para investir. Tudo o que você precisa está aqui dentro.
          </p>
          <Button size="lg" className="bg-primary text-black font-bold text-lg w-full md:w-auto hover:bg-primary/90">
            QUERO ENTRAR
          </Button>
        </div>
        <div className="relative h-96 md:h-auto">
          <Image
            src="https://picsum.photos/seed/hero/600/800"
            alt="Maikon Kraemer"
            width={600}
            height={800}
            className="rounded-lg object-cover w-full h-full"
            data-ai-hint="man smiling"
          />
           <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg text-center">
                <p className="text-4xl font-bold text-primary">784</p>
                <p className="text-sm text-white">Alunos</p>
            </div>
        </div>
      </div>
    </section>
  );
}
