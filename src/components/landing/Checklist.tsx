import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const checklistItems = [
    { title: "成功するためのマインドセットを持つ方法", description: "デジタルで起業するために必要なマインドセット。" },
    { title: "理想的な市場ニッチの選び方", description: "活動するのに最適なニッチと、あなたにとって最も収益性の高いものを選ぶ方法。" },
    { title: "最初の製品を検証して作成する方法", description: "毎日売れるデジタル製品を作成するためのステップバイステップ。" },
]

export function Checklist() {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="space-y-6">
                    {checklistItems.map((item, index) => (
                        <Card key={index} className="bg-gray-900/50 border-gray-800 p-6 flex items-start gap-4 transition-all duration-300 hover:border-primary/50 hover:scale-105">
                            <CheckCircle2 className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
