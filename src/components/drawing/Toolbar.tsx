
'use client';

import * as React from 'react';
import { Hand, PenLine, Eraser, RectangleHorizontal, Sparkles, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Tool } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  onInpaint: () => void;
  canInpaint: boolean;
  isProcessing: boolean;
}

const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
  { id: 'pan', icon: <Hand />, label: 'Pan (hold space)' },
  { id: 'pen', icon: <PenLine />, label: 'Pen' },
  { id: 'eraser', icon: <Eraser />, label: 'Eraser' },
  { id: 'inpainting', icon: <RectangleHorizontal />, label: 'Select to Inpaint' },
];

export function Toolbar({
  tool,
  setTool,
  color,
  setColor,
  strokeWidth,
  setStrokeWidth,
  onInpaint,
  canInpaint,
  isProcessing,
}: ToolbarProps) {
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setTool('pan');
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setTool('pen');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setTool]);
  
  return (
    <Card className="absolute left-4 top-4 z-10 w-auto h-auto shadow-lg border-2 border-border/70">
      <CardContent className="p-2">
        <TooltipProvider delayDuration={100}>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col gap-1">
              {tools.map(t => (
                <Tooltip key={t.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={tool === t.id ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setTool(t.id)}
                      className={cn("transition-all duration-150", tool === t.id && 'ring-2 ring-ring')}
                    >
                      {t.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{t.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <Separator />

            <div className="relative w-10 h-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="w-10 h-10 rounded-md border-2 border-border cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Stroke Color</p>
                </TooltipContent>
              </Tooltip>
              <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            <div className="flex flex-col gap-2 items-center w-full px-2 pt-2">
                <Label htmlFor="stroke-width" className="text-xs">Weight</Label>
                <Slider
                    id="stroke-width"
                    min={1}
                    max={50}
                    step={1}
                    value={[strokeWidth]}
                    onValueChange={(value) => setStrokeWidth(value[0])}
                    className="w-full"
                />
            </div>

            <Separator />

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    onClick={onInpaint}
                    disabled={!canInpaint}
                    variant="default"
                    size="icon"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {isProcessing ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Generate with AI Inpainting</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
