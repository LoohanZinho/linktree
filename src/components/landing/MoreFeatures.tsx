import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShieldCheck, Video } from "lucide-react";

const features = [
  {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "トレーニングへの永久アクセス",
    description: "一度支払えば、将来のすべてのアップデートを含め、永久にアクセスできます。",
  },
  {
    icon: <Video className="w-8 h-8 text-primary" />,
    title: "100%実践的で要点を押さえたクラス",
    description: "回りくどい説明はありません。結果を出すために本当に重要なことを教えることに焦点を当てたクラスです。",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "7日間の無条件保証",
    description: "気に入らなければ、返金をお求めください。あなたにリスクはありません。",
  },
];

export function MoreFeatures() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          さらに良くするために...
        </h2>
        <p className="text-gray-400 text-center mb-12">これらすべてにアクセスできます</p>
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
