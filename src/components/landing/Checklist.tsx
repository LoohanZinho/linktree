import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const checklistItems = [
    { title: "Como ter uma mentalidade de sucesso", description: "O mindset que você precisa para começar a empreender no digital." },
    { title: "Como escolher o nicho de mercado ideal", description: "Os melhores nichos para atuar e como escolher o mais lucrativo para você." },
    { title: "Como validar e criar seu primeiro produto", description: "O passo a passo para criar um produto digital que vende todos os dias." },
]

export function Checklist() {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="space-y-6">
                    {checklistItems.map((item, index) => (
                        <Card key={index} className="bg-gray-900/50 border-gray-800 p-6 flex items-start gap-4 transition-all duration-300 hover:border-primary/50">
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
