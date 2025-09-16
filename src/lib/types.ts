export type Tool = 'pan' | 'pen' | 'eraser' | 'inpainting';

export type Point = {
  x: number;
  y: number;
};

export type SelectionRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
