import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          これはあなたがいつも求めていたチャンスです
        </h2>
        <div className="text-gray-400 space-y-4 mb-8">
            <p>ゼロから始めて、月に4,000から10,000レアルを稼ぐために必要なすべてのステップバイステップへのアクセス。シンプルかつ直接的な方法で、顔を出す必要はありません。</p>
            <p>私が4年間かけて学び、テストし、検証したすべてに、ごくわずかな金額でアクセスできます。</p>
            <p>下のボタンをクリックして、発売記念割引であなたの場所を確保し、すべてのボーナスにアクセスしてください。</p>
            <p>向こう側でお会いしましょう！</p>
        </div>
        <Button size="lg" className="bg-primary text-black font-bold text-lg w-full md:w-auto hover:bg-primary/90 transition-transform duration-300 hover:scale-105">
            今すぐ参加したい
        </Button>
      </div>
    </section>
  );
}
