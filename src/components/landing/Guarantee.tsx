import { AlertCircle } from "lucide-react";

export function Guarantee() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-3xl text-center text-gray-400 space-y-6">
        <p>
          O acesso é enviado para o e-mail que você utilizou na hora da compra. Assim que seu pagamento for confirmado, você receberá acesso à nossa área de membros.
        </p>
        <p>
          Se o pagamento for feito por cartão de crédito ou pix, o acesso é liberado em até 5 minutos. Pagamentos por boleto podem levar até 48 horas para serem liberados.
        </p>
        <div className="flex items-start gap-4 text-left bg-gray-900 p-4 rounded-md border border-yellow-500">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <p className="text-yellow-400">
                ATENÇÃO: A garantia de 7 dias e o acesso vitalício serão concedidos apenas para quem entrar nesta oferta. Após a virada de lote, a garantia será removida e o acesso será anual.
            </p>
        </div>
      </div>
    </section>
  );
}
