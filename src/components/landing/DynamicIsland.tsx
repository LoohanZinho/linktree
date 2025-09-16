import { Button } from "@/components/ui/button";
import { Anchor } from "lucide-react";

export function DynamicIsland() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50 transition-all duration-300">
      <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-full p-2 flex justify-between items-center shadow-2xl shadow-primary/10 hover:shadow-primary/20">
        <div className="flex items-center gap-3 pl-2">
          <div className="bg-primary/80 p-2 rounded-full">
            <Anchor className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-white text-lg hidden sm:inline">KrakenClass</span>
        </div>
        <Button className="shimmer-button bg-primary text-primary-foreground font-bold hover:bg-primary/90 text-sm rounded-full px-5 py-2 h-auto transition-transform hover:scale-105">
          今すぐ購入
        </Button>
      </div>
    </div>
  );
}
