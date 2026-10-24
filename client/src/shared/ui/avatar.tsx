import { useState } from 'react';
import { cn } from '../utils/cn';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('') || '?';

// Stable hue per name so each workspace gets its own colour.
const hue = (name: string) =>
  [...name].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 360, 7);

export function Avatar({
  name,
  src,
  shape = 'circle',
  className,
}: {
  name: string;
  src?: string;
  shape?: 'circle' | 'square';
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-md';
  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        onError={() => setFailed(true)}
        className={cn('size-8 shrink-0 object-cover', radius, className)}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-8 shrink-0 place-items-center text-[11px] font-semibold text-white',
        radius,
        className
      )}
      style={{ background: `oklch(0.58 0.13 ${hue(name)})` }}
    >
      {initials(name)}
    </span>
  );
}
