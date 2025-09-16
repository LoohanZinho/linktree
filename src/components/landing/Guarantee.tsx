import { AlertCircle } from "lucide-react";

export function Guarantee() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-3xl text-center text-gray-400 space-y-6">
        <p>
          Seu acesso será enviado para o e-mail que você utilizar no ato da
          compra. Assim que o seu pagamento for confirmado, você receberá o
          acesso a nossa área de membros.
        </p>
        <p>
          Caso o pagamento seja feito via cartão de crédito ou pix, o acesso é
          liberado em até 5 minutos. Caso seja por boleto, pode levar até 48
          horas para o acesso ser liberado.
        </p>
        <div className="flex items-start gap-4 text-left bg-gray-900 p-4 rounded-md border border-yellow-500">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <p className="text-yellow-400">
                Atenção: A liberação da garantia de 7 dias e acesso vitalício só será
                concedida para aqueles que entrarem nesta oferta. Após a virada de
                lote, a garantia será removida e o acesso será anual.
            </p>
        </div>
      </div>
    </section>
  );
}
