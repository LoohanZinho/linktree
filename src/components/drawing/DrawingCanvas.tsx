
'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Point, SelectionRect, Tool } from '@/lib/types';
import { inpaintCanvasAction } from '@/app/actions';

import { Toolbar } from './Toolbar';
import { SpinnerOverlay } from './SpinnerOverlay';
import { cn } from '@/lib/utils';

const OFFSCREEN_CANVAS_WIDTH = 4000;
const OFFSCREEN_CANVAS_HEIGHT = 3000;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 5;
const SCROLL_SENSITIVITY = 0.001;

export function DrawingCanvas() {
  const { toast } = useToast();
  const visibleCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  const [tool, setTool] = React.useState<Tool>('pen');
  const [color, setColor] = React.useState('#000000');
  const [strokeWidth, setStrokeWidth] = React.useState(5);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const [selection, setSelection] = React.useState<SelectionRect | null>(null);
  const transform = React.useRef({ scale: 1, offsetX: 0, offsetY: 0 });
  const isInteracting = React.useRef(false);
  const startDragPos = React.useRef<Point | null>(null);
  const lastDrawPoint = React.useRef<Point | null>(null);

  const getCanvasContext = React.useCallback(
    (canvas: HTMLCanvasElement | null) => canvas?.getContext('2d'),
    []
  );

  const redrawVisibleCanvas = React.useCallback(() => {
    if (!visibleCanvasRef.current || !offscreenCanvasRef.current) return;

    const visibleCtx = getCanvasContext(visibleCanvasRef.current);
    if (!visibleCtx) return;

    visibleCtx.save();
    visibleCtx.clearRect(0, 0, visibleCanvasRef.current.width, visibleCanvasRef.current.height);
    
    const { scale, offsetX, offsetY } = transform.current;
    visibleCtx.translate(offsetX, offsetY);
    visibleCtx.scale(scale, scale);

    visibleCtx.drawImage(offscreenCanvasRef.current, 0, 0);

    // Draw selection rectangle if it exists
    if (selection) {
      visibleCtx.strokeStyle = 'rgba(0, 120, 255, 0.8)';
      visibleCtx.lineWidth = 1 / scale;
      visibleCtx.setLineDash([5 / scale, 5 / scale]);
      visibleCtx.strokeRect(selection.x, selection.y, selection.width, selection.height);
      visibleCtx.setLineDash([]);
    }

    visibleCtx.restore();
  }, [selection, getCanvasContext]);

  React.useEffect(() => {
    const visibleCanvas = visibleCanvasRef.current;
    if (!visibleCanvas) return;

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = OFFSCREEN_CANVAS_WIDTH;
    offscreenCanvas.height = OFFSCREEN_CANVAS_HEIGHT;
    offscreenCanvasRef.current = offscreenCanvas;

    const offscreenCtx = getCanvasContext(offscreenCanvas);
    if (offscreenCtx) {
      offscreenCtx.fillStyle = '#F0F4F7';
      offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    }
    
    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      visibleCanvas.width = entry.contentRect.width;
      visibleCanvas.height = entry.contentRect.height;
      redrawVisibleCanvas();
    });

    resizeObserver.observe(visibleCanvas);
    setIsReady(true);
    redrawVisibleCanvas();

    return () => {
      resizeObserver.disconnect();
    };
  }, [getCanvasContext, redrawVisibleCanvas]);


  const getMousePos = (e: React.MouseEvent | MouseEvent): Point => {
    if (!visibleCanvasRef.current) return { x: 0, y: 0 };
    const rect = visibleCanvasRef.current.getBoundingClientRect();
    const { scale, offsetX, offsetY } = transform.current;
    return {
      x: (e.clientX - rect.left - offsetX) / scale,
      y: (e.clientY - rect.top - offsetY) / scale,
    };
  };

  const drawLine = React.useCallback((start: Point, end: Point) => {
    const offscreenCtx = getCanvasContext(offscreenCanvasRef.current);
    if (!offscreenCtx) return;

    offscreenCtx.beginPath();
    offscreenCtx.moveTo(start.x, start.y);
    offscreenCtx.lineTo(end.x, end.y);
    offscreenCtx.strokeStyle = tool === 'eraser' ? '#F0F4F7' : color;
    offscreenCtx.lineWidth = strokeWidth;
    offscreenCtx.lineCap = 'round';
    offscreenCtx.lineJoin = 'round';
    offscreenCtx.globalCompositeOperation = tool === 'pen' ? 'source-over' : 'destination-out';
    if(tool === 'eraser') {
      offscreenCtx.globalCompositeOperation = 'source-over';
    }
    offscreenCtx.stroke();
    offscreenCtx.globalCompositeOperation = 'source-over';

  }, [color, strokeWidth, tool, getCanvasContext]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isInteracting.current = true;
    startDragPos.current = getMousePos(e);
    if (tool === 'pen' || tool === 'eraser') {
      lastDrawPoint.current = startDragPos.current;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInteracting.current || !startDragPos.current) return;
    const currentPos = getMousePos(e);

    if (tool === 'pan') {
      const dx = currentPos.x * transform.current.scale - startDragPos.current.x * transform.current.scale;
      const dy = currentPos.y * transform.current.scale - startDragPos.current.y * transform.current.scale;
      transform.current.offsetX += dx;
      transform.current.offsetY += dy;
    } else if (tool === 'pen' || tool === 'eraser') {
      if (lastDrawPoint.current) {
        drawLine(lastDrawPoint.current, currentPos);
        lastDrawPoint.current = currentPos;
      }
    } else if (tool === 'inpainting') {
        const x = Math.min(startDragPos.current.x, currentPos.x);
        const y = Math.min(startDragPos.current.y, currentPos.y);
        const width = Math.abs(startDragPos.current.x - currentPos.x);
        const height = Math.abs(startDragPos.current.y - currentPos.y);
        setSelection({ x, y, width, height });
    }
    redrawVisibleCanvas();
  };

  const handleMouseUp = () => {
    isInteracting.current = false;
    startDragPos.current = null;
    lastDrawPoint.current = null;
    if (tool === 'pen' || tool === 'eraser') {
      redrawVisibleCanvas();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const { deltaY } = e;
    const { scale } = transform.current;
    
    const zoom = 1 - deltaY * SCROLL_SENSITIVITY;
    const newScale = Math.min(Math.max(scale * zoom, MIN_ZOOM), MAX_ZOOM);

    const mousePos = getMousePos(e);
    
    transform.current.offsetX = mousePos.x * scale - mousePos.x * newScale + transform.current.offsetX * (newScale / scale);
    transform.current.offsetY = mousePos.y * scale - mousePos.y * newScale + transform.current.offsetY * (newScale / scale);
    transform.current.scale = newScale;

    redrawVisibleCanvas();
  };

  const handleInpaint = async () => {
    if (!selection) return;
    setIsProcessing(true);

    try {
      const imageToInpaintDataUri = offscreenCanvasRef.current!.toDataURL('image/png');
      
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = OFFSCREEN_CANVAS_WIDTH;
      maskCanvas.height = OFFSCREEN_CANVAS_HEIGHT;
      const maskCtx = maskCanvas.getContext('2d')!;
      maskCtx.fillStyle = 'black';
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskCtx.fillStyle = 'white';
      maskCtx.fillRect(selection.x, selection.y, selection.width, selection.height);
      const maskDataUri = maskCanvas.toDataURL('image/png');

      const result = await inpaintCanvasAction({
        imageToInpaintDataUri,
        maskDataUri,
        prompt: 'Fill the selected area seamlessly based on the surrounding context.',
      });

      const offscreenCtx = getCanvasContext(offscreenCanvasRef.current);
      if (offscreenCtx) {
        const img = new Image();
        img.onload = () => {
          offscreenCtx.drawImage(img, 0, 0);
          redrawVisibleCanvas();
          toast({
            title: 'Inpainting Complete',
            description: 'The canvas has been updated with the AI-generated content.',
          });
        };
        img.src = result.inpaintedImageDataUri;
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Inpainting Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsProcessing(false);
      setSelection(null);
    }
  };


  return (
    <div className="relative h-full w-full flex">
      <Toolbar
        tool={tool}
        setTool={(newTool) => {
          setTool(newTool);
          if (newTool !== 'inpainting') {
            setSelection(null);
          }
        }}
        color={color}
        setColor={setColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        onInpaint={handleInpaint}
        canInpaint={!!selection && !isProcessing}
        isProcessing={isProcessing}
      />
      <div 
        className={cn("relative h-full w-full flex-1 touch-none", {
          "cursor-grab": tool === 'pan' && !isInteracting.current,
          "cursor-grabbing": tool === 'pan' && isInteracting.current,
          "cursor-crosshair": tool === 'pen' || tool === 'inpainting'
        })}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <canvas ref={visibleCanvasRef} className="h-full w-full bg-background" />
        {!isReady && <SpinnerOverlay text="Preparing Canvas..." />}
        {isProcessing && <SpinnerOverlay text="Inpainting with AI..." />}
      </div>
    </div>
  );
}
