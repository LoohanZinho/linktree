
'use client';

import { LoaderCircle } from 'lucide-react';

interface SpinnerOverlayProps {
  text?: string;
}

export function SpinnerOverlay({ text = 'Loading...' }: SpinnerOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoaderCircle className="h-10 w-10 animate-spin text-accent" />
      <p className="mt-4 text-lg font-medium text-foreground">{text}</p>
    </div>
  );
}
