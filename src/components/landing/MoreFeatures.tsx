import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShieldCheck, Video } from "lucide-react";

const features = [
  {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "Acesso vitalício ao treinamento completo",
    description: "Pague uma vez e acesse para sempre, incluindo todas as futuras atualizações.",
  },
  {
    icon: <Video className="w-8 h-8 text-primary" />,
    title: "Aulas 100% práticas e diretas ao ponto",
    description: "Sem enrolação. Aulas focadas em te ensinar o que realmente importa para ter resultados.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Garantia incondicional de 7 dias",
    description: "Se não gostar, peça seu dinheiro de volta. Risco zero para você.",
  },
];

export function MoreFeatures() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Para melhorar ainda mais...
        </h2>
        <p className="text-gray-400 text-center mb-12">Você terá acesso a tudo isso</p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 text-center transition-transform duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}