import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function Stories() {
  return (
    <section className="py-20 bg-primary/90 text-black overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Hoje eles vivem depots de seus depoimentos de como o KrakenClass os ajudou
            </h2>
            <p>Nossos alunos estão transformando suas vidas e alcançando resultados incríveis. Veja o que eles estão compartilhando nas redes sociais sobre suas jornadas com o KrakenClass.</p>
          </div>
          <div className="relative h-[500px]">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <Image src="https://picsum.photos/seed/phone1/300/600" alt="App Screenshot 1" width={300} height={600} className="rounded-2xl mx-auto object-contain shadow-2xl" data-ai-hint="app screen social" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Image src="https://picsum.photos/seed/phone2/300/600" alt="App Screenshot 2" width={300} height={600} className="rounded-2xl mx-auto object-contain shadow-2xl" data-ai-hint="app screen analytics" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Image src="https://picsum.photos/seed/phone3/300/600" alt="App Screenshot 3" width={300} height={600} className="rounded-2xl mx-auto object-contain shadow-2xl" data-ai-hint="app screen chat" />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-[-50px] bg-white/50 border-white text-black hover:bg-white" />
              <CarouselNext className="right-[-50px] bg-white/50 border-white text-black hover:bg-white"/>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
