import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="bg-primary/90 text-black rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            OFERTA EXCLUSIVA DE LANÇAMENTO POR TEMPO LIMITADO DE R$497,00 POR APENAS 12X DE R$29,70
          </h2>
          <p className="mb-8 text-lg">
            Sim, é menos que o valor de uma pizza por mês para aprender a faturar de 4 a 10 mil reais mensais.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-black font-bold text-lg w-full md:w-auto hover:bg-gray-200">
            QUERO GARANTIR MINHA VAGA
          </Button>
        </div>
      </div>
    </section>
  );
}
