import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  { name: "Bruno", image: "https://picsum.photos/seed/bruno/200/200", text: "R$ 15.2k em 15 dias" },
  { name: "Yuri", image: "https://picsum.photos/seed/yuri/200/200", text: "R$ 6.3k em 30 dias" },
  { name: "Lucas", image: "https://picsum.photos/seed/lucas/200/200", text: "R$ 8k em 1 Mês" },
  { name: "Jader", image: "https://picsum.photos/seed/jader/200/200", text: "R$ 40k em 1 Mês" },
  { name: "Gabriel", image: "https://picsum.photos/seed/gabriel/200/200", text: "R$ 11k em 30 dias" },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">O que nossos alunos dizem?</h2>
        <p className="text-gray-400 mb-12">veja alguns resultados dos nossos alunos</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center transition-transform duration-300 hover:scale-110">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={150}
                height={150}
                className="rounded-full mb-4 object-cover border-2 border-primary"
                data-ai-hint="person portrait"
              />
              <h3 className="font-bold text-white">{testimonial.name}</h3>
              <p className="text-primary">{testimonial.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-gray-500">... e centenas de outros resultados</p>
      </div>
    </section>
  );
}