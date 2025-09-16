import { DrawingCanvas } from '@/components/drawing/DrawingCanvas';

export default function Home() {
  return (
    <main className="h-dvh w-dvh overflow-hidden bg-background">
      <DrawingCanvas />
    </main>
  );
}
