import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Essa é a chance que você sempre pediu
        </h2>
        <div className="text-gray-400 space-y-4 mb-8">
            <p>O acesso a todo o passo a passo que você precisa para sair do zero e fazer de 4 a 10 mil reais por mês, sem aparecer, de forma simples e direta.</p>
            <p>Tudo o que eu demorei 4 anos para aprender, testar e validar, você terá acesso por um valor irrisório.</p>
            <p>Clique no botão abaixo para garantir sua vaga com o desconto de lançamento e ter acesso a todos os bônus.</p>
            <p>Nos vemos do outro lado!</p>
        </div>
        <Button size="lg" className="bg-primary text-black font-bold text-lg w-full md:w-auto hover:bg-primary/90">
            QUERO ENTRAR AGORA MESMO
        </Button>
      </div>
    </section>
  );
}
