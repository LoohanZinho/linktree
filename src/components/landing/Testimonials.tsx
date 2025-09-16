import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  { name: "Bruno", image: "https://picsum.photos/seed/bruno/200/200", text: "15日間でR$ 15.2k" },
  { name: "Yuri", image: "https://picsum.photos/seed/yuri/200/200", text: "30日間でR$ 6.3k" },
  { name: "Lucas", image: "https://picsum.photos/seed/lucas/200/200", text: "1ヶ月でR$ 8k" },
  { name: "Jader", image: "https://picsum.photos/seed/jader/200/200", text: "1ヶ月でR$ 40k" },
  { name: "Gabriel", image: "https://picsum.photos/seed/gabriel/200/200", text: "30日間でR$ 11k" },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">生徒たちの声は？</h2>
        <p className="text-gray-400 mb-12">生徒たちの結果をご覧ください</p>
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
        <p className="mt-8 text-gray-500">...そして何百もの他の結果</p>
      </div>
    </section>
  );
}
