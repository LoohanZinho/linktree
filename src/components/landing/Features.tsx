import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Zap } from "lucide-react";

const features = [
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Criação de Produtos Digitais",
    description: "Aprenda a criar e-books, cursos em vídeo, mentorias e muito mais.",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Estratégias de Vendas",
    description: "Domine o tráfego pago (Facebook Ads) e estratégias de vendas que convertem.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Marketing de Conteúdo",
    description: "Crie conteúdo que atrai e engaja sua audiência, gerando autoridade e vendas.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          VOCÊ VAI APRENDER
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full ring-4 ring-primary/20">
                    {feature.icon}
                  </div>
                </div>
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