import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { cn } from '../utils/cn';
import { Spinner } from './spinner';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.12)] data-[hovered]:bg-accent-hover',
  secondary:
    'bg-surface text-ink border border-line shadow-[0_1px_2px_rgb(0_0_0/0.04)] data-[hovered]:bg-subtle data-[hovered]:border-line-strong',
  ghost: 'text-ink-muted data-[hovered]:bg-subtle data-[hovered]:text-ink',
  danger: 'bg-danger text-white data-[hovered]:opacity-90',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-md',
  md: 'h-9 px-3.5 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-4 text-[15px] gap-2 rounded-lg',
};

export interface ButtonProps extends Omit<AriaButtonProps, 'className'> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  isDisabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      isDisabled={isDisabled || loading}
      className={cn(
        'inline-flex shrink-0 cursor-default items-center justify-center font-medium whitespace-nowrap transition-[background-color,border-color,color,opacity,transform] duration-150 outline-none select-none',
        'data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent data-[focus-visible]:ring-offset-2 data-[focus-visible]:ring-offset-canvas',
        'data-[pressed]:scale-[0.98] data-[disabled]:opacity-55',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {renderProps => (
        <>
          {loading && <Spinner className="size-4" />}
          {typeof children === 'function' ? children(renderProps) : children}
        </>
      )}
    </AriaButton>
  );
}
