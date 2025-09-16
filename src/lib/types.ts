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

// New types for landing page
export type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  image: string;
  text: string;
};

export type Module = {
  title: string;
  lessons: number;
  isNew?: boolean;
  isBonus?: boolean;
};
