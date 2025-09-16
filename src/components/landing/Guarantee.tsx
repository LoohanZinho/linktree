import { AlertCircle } from "lucide-react";

export function Guarantee() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-3xl text-center text-gray-400 space-y-6">
        <p>
          アクセスは、購入時に使用したメールアドレスに送信されます。お支払いが確認されるとすぐに、会員エリアへのアクセスが可能になります。
        </p>
        <p>
          クレジットカードまたはpixでお支払いの場合、アクセスは5分以内に許可されます。銀行振込の場合は、アクセスが許可されるまで最大48時間かかる場合があります。
        </p>
        <div className="flex items-start gap-4 text-left bg-gray-900 p-4 rounded-md border border-yellow-500">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <p className="text-yellow-400">
                注意：7日間の保証と永久アクセスは、このオファーに参加した人にのみ付与されます。ロットが切り替わった後は、保証は削除され、アクセスは年間になります。
            </p>
        </div>
      </div>
    </section>
  );
}
