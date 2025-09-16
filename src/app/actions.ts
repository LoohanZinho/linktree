
'use server';

import { inpaintCanvas, type InpaintCanvasInput, type InpaintCanvasOutput } from '@/ai/flows/inpaint-canvas';

export async function inpaintCanvasAction(input: InpaintCanvasInput): Promise<InpaintCanvasOutput> {
  if (!input.imageToInpaintDataUri.startsWith('data:image/') || !input.maskDataUri.startsWith('data:image/')) {
    throw new Error('Invalid data URI format');
  }

  try {
    const result = await inpaintCanvas(input);
    return result;
  } catch (error) {
    console.error('Error during inpainting:', error);
    throw new Error('Failed to inpaint canvas.');
  }
}
