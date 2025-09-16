import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AppPreview() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">
          Por que agora é o momento certo para ter o meu app?
        </h2>
        <div className="inline-block bg-primary text-black font-bold px-4 py-1 rounded-md mb-4">
          7 DIAS GRÁTIS
        </div>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Meu método já foi validado por mais de 784 pessoas. Agora, quero ver VOCÊ faturando no digital.
        </p>
        <div className="bg-gray-900/50 border border-gray-800 p-4 md:p-8 rounded-lg max-w-5xl mx-auto backdrop-blur-sm">
            <Image 
                src="https://picsum.photos/seed/tablet/1024/768"
                alt="KrakenClass modules on a tablet"
                width={1024}
                height={768}
                className="rounded-md shadow-2xl"
                data-ai-hint="tablet screen course"
            />
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-left p-4 gap-4 bg-gray-900 rounded-lg">
                <div>
                    <p className="text-gray-400">VALOR TOTAL</p>
                    <p className="text-2xl text-gray-500 line-through">DE R$ 1.997,00</p>
                    <p className="text-gray-400">POR APENAS</p>
                </div>
                <div className="text-right">
                    <p className="text-4xl md:text-5xl font-bold text-primary">12x DE R$ 29,70</p>
                    <p className="text-gray-400">ou R$ 297,00 à vista</p>
                </div>
            </div>
            <Button size="lg" className="bg-primary text-black font-bold text-lg w-full mt-4 hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                QUERO ENTRAR AGORA MESMO
            </Button>
        </div>
      </div>
    </section>
  );
}
