import Image from "next/image";

export function About() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-lg p-8 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <Image
              src="https://picsum.photos/seed/teacher/400/400"
              alt="Maikon Kraemer"
              width={400}
              height={400}
              className="rounded-lg object-cover w-full"
              data-ai-hint="man teacher"
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4">MAIKON KRAEMER</h2>
            <div className="text-gray-400 space-y-4">
                <p>Maikon Kraemerはデジタルマーケティングとオンライン販売の専門家です。2018年にキャリアをスタートさせ、以来、インターネットで7桁の収益を上げてきました。</p>
                <p>彼は784人以上の学生が自分のデジタルビジネスを立ち上げ、夢の経済的自由を達成するのを支援してきました。</p>
                <p>彼の使命は明確です：デジタル起業家精神を通じてできるだけ多くの人々が人生を変えるのを助け、顔を出さなくてもインターネットで製品を作成して販売するための正確な道を示すことです。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
