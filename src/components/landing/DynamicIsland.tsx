import { Button } from "@/components/ui/button";
import { BookCheck } from "lucide-react";

export function DynamicIsland() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl z-50">
      <div className="bg-green-900/50 backdrop-blur-lg border border-green-700/50 rounded-2xl p-3 flex justify-between items-center shadow-2xl shadow-green-500/10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/80 p-2 rounded-lg">
            <BookCheck className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-white text-lg hidden sm:inline">EnemQuest</span>
        </div>
        <Button className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 text-sm md:text-base px-4 py-2 h-auto">
          ADQUIRA AGORA
        </Button>
      </div>
    </div>
  );
}
