import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const bonus1 = [
  "Aulas sobre copywriting",
  "Aulas sobre tráfego pago",
  "Aulas sobre criação de criativos",
  "Aulas sobre contingência",
  "Aulas sobre como vender no X1",
  "Aulas sobre como criar um VSL",
  "Aulas sobre como contratar um gestor de tráfego",
];

const bonus2 = [
    "Close friends com aulas semanais",
    "Suporte individual no WhatsApp",
    "Análise de perfil e produto",
    "Acesso a todos os meus produtos",
    "Direito a afiliação em todos os meus produtos",
]

export function Bonuses() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          E ainda tem mais... BÔNUS EXCLUSIVOS
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-green-900/30 border-green-700 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">BÔNUS 1: CURSO DE VENDAS ONLINE</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {bonus1.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-center font-bold text-lg mt-6">Vendido separadamente por <span className="line-through">R$497</span></p>
                <p className="text-center font-bold text-2xl text-green-400">DE GRAÇA!</p>
            </CardContent>
          </Card>
          <Card className="bg-red-900/30 border-red-700 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">BÔNUS 2: MENTORIA INDIVIDUAL</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {bonus2.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-center font-bold text-lg mt-6">Vendido separadamente por <span className="line-through">R$1.000</span></p>
                <p className="text-center font-bold text-2xl text-red-400">DE GRAÇA!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
