import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function Stories() {
  return (
    <section className="py-20 bg-primary/90 text-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Hoje eles vivem depots de seus depoimentos de como o KrakenClass os ajudou
            </h2>
          </div>
          <div className="relative h-[500px]">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <Image src="https://picsum.photos/seed/phone1/300/600" alt="App Screenshot 1" width={300} height={600} className="rounded-2xl mx-auto object-contain" data-ai-hint="app screen social" />
                </CarouselItem>
                <CarouselItem>
                  <Image src="https://picsum.photos/seed/phone2/300/600" alt="App Screenshot 2" width={300} height={600} className="rounded-2xl mx-auto object-contain" data-ai-hint="app screen analytics" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-[-50px]" />
              <CarouselNext className="right-[-50px]"/>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
