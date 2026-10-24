import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge about the custom `label-mono` utility's font-size.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { 'font-size': ['label-mono'] } },
});

/** Join class names; later Tailwind classes override earlier conflicting ones. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
