import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Zap } from "lucide-react";

const features = [
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "デジタル製品の作成",
    description: "電子書籍、ビデオコース、メンターシップなどの作成方法を学びます。",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "販売戦略",
    description: "有料トラフィック（Facebook広告）とコンバージョンにつながる販売戦略をマスターします。",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "コンテンツマーケティング",
    description: "オーディエンスを引き付け、エンゲージメントを高め、権威と売上を生み出すコンテンツを作成します。",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          あなたが学ぶこと
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
