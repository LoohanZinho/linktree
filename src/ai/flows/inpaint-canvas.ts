'use server';

/**
 * @fileOverview Implements the Genkit flow for the InpaintCanvas story, allowing users to select a region of the canvas and use AI to automatically fill in or extend the drawing based on the surrounding context.
 *
 * - inpaintCanvas - A function that handles the inpainting process.
 * - InpaintCanvasInput - The input type for the inpaintCanvas function.
 * - InpaintCanvasOutput - The return type for the inpaintCanvas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InpaintCanvasInputSchema = z.object({
  imageToInpaintDataUri: z
    .string()
    .describe(
      "The image to inpaint, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  maskDataUri: z
    .string()
    .describe(
      'The mask indicating the region to inpaint, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  prompt: z.string().optional().describe('Optional prompt to guide the inpainting.'),
});
export type InpaintCanvasInput = z.infer<typeof InpaintCanvasInputSchema>;

const InpaintCanvasOutputSchema = z.object({
  inpaintedImageDataUri: z
    .string()
    .describe(
      'The inpainted image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type InpaintCanvasOutput = z.infer<typeof InpaintCanvasOutputSchema>;

export async function inpaintCanvas(input: InpaintCanvasInput): Promise<InpaintCanvasOutput> {
  return inpaintCanvasFlow(input);
}

const inpaintCanvasPrompt = ai.definePrompt({
  name: 'inpaintCanvasPrompt',
  input: {schema: InpaintCanvasInputSchema},
  output: {schema: InpaintCanvasOutputSchema},
  prompt: [
    {
      media: {url: '{{imageToInpaintDataUri}}'},
    },
    {
      text: `Inpaint the image, using the provided mask to guide the inpainting. Mask: {{media url=maskDataUri}}. ${'Optional prompt: '}{{{prompt}}}`,
    },
  ],
  model: 'googleai/gemini-2.5-flash-image-preview',
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const inpaintCanvasFlow = ai.defineFlow(
  {
    name: 'inpaintCanvasFlow',
    inputSchema: InpaintCanvasInputSchema,
    outputSchema: InpaintCanvasOutputSchema,
  },
  async input => {
    const {media} = await inpaintCanvasPrompt(input);
    return {inpaintedImageDataUri: media!.url!};
  }
);
