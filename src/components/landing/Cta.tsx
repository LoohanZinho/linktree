import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="relative bg-primary/90 text-black rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto overflow-hidden">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse delay-500"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
            期間限定の発売記念特別オファー R$497.00 がわずか 12X R$29.70
          </h2>
          <p className="mb-8 text-lg relative z-10">
            はい、月に4,000から10,000レアルを稼ぐ方法を学ぶために、ピザ1枚分の月額料金よりも安いです。
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-black font-bold text-lg w-full md:w-auto hover:bg-gray-200 relative z-10 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            私の席を確保したい
          </Button>
        </div>
      </div>
    </section>
  );
}
