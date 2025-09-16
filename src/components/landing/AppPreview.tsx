import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AppPreview() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">
          なぜ今が私のアプリを持つ絶好の機会なのですか？
        </h2>
        <div className="inline-block bg-primary text-black font-bold px-4 py-1 rounded-md mb-4">
          7日間無料
        </div>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            私の方法は784人以上によって検証されています。今、私はあなたがデジタルでお金を稼ぐのを見たいです。
        </p>
        <div className="bg-gray-900/50 border border-gray-800 p-4 md:p-8 rounded-lg max-w-5xl mx-auto backdrop-blur-sm transition-all duration-300 hover:shadow-primary/20">
            <Image 
                src="https://picsum.photos/seed/dashboard/1024/768"
                alt="KrakenClass modules on a tablet"
                width={1024}
                height={768}
                className="rounded-md shadow-2xl"
                data-ai-hint="dashboard analytics"
            />
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-left p-4 gap-4 bg-gray-900 rounded-lg">
                <div>
                    <p className="text-gray-400">合計金額</p>
                    <p className="text-2xl text-gray-500 line-through">R$ 1,997.00から</p>
                    <p className="text-gray-400">わずか</p>
                </div>
                <div className="text-right">
                    <p className="text-4xl md:text-5xl font-bold text-primary">12x R$ 29.70</p>
                    <p className="text-gray-400">または一括でR$ 297.00</p>
                </div>
            </div>
            <Button size="lg" className="bg-primary text-black font-bold text-lg w-full mt-4 hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all transform hover:scale-105">
                今すぐ参加したい
            </Button>
        </div>
      </div>
    </section>
  );
}
