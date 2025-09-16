import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const bonus1 = [
  "コピーライティングのクラス",
  "有料トラフィックのクラス",
  "クリエイティブ作成のクラス",
  "コンティンジェンシーのクラス",
  "X1での販売方法のクラス",
  "VSLの作成方法のクラス",
  "トラフィックマネージャーの雇い方のクラス",
];

const bonus2 = [
    "毎週のクラスがある親しい友人",
    "WhatsAppでの個別サポート",
    "プロフィールと製品の分析",
    "すべての私の製品へのアクセス",
    "すべての私の製品へのアフィリエイト権",
]

export function Bonuses() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          そして、さらに... 限定ボーナス
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-green-900/30 border-green-700 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">ボーナス1：オンライン販売コース</CardTitle>
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
                <p className="text-center font-bold text-lg mt-6">個別販売価格 <span className="line-through">R$497</span></p>
                <p className="text-center font-bold text-2xl text-green-400">無料！</p>
            </CardContent>
          </Card>
          <Card className="bg-red-900/30 border-red-700 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">ボーナス2：個別メンターシップ</CardTitle>
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
                <p className="text-center font-bold text-lg mt-6">個別販売価格 <span className="line-through">R$1.000</span></p>
                <p className="text-center font-bold text-2xl text-red-400">無料！</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
