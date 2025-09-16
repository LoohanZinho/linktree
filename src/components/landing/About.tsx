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
                <p>Maikon Kraemer é especialista em marketing digital e vendas online. Começou sua jornada em 2018 e, desde então, já faturou múltiplos 7 dígitos na internet.</p>
                <p>Ele já ajudou mais de 784 alunos a começarem seus próprios negócios digitais e alcançarem a tão sonhada liberdade financeira.</p>
                <p>Sua missão é clara: ajudar o maior número de pessoas a transformar de vida através do empreendedorismo digital, mostrando o caminho exato para criar e vender produtos na internet sem precisar aparecer.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
