import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  Popover,
  Separator,
  type MenuItemProps,
  type MenuProps,
  type PopoverProps,
} from 'react-aria-components';
import { cn } from '../utils/cn';

export function MenuPopover({
  className,
  ...props
}: Omit<PopoverProps, 'className'> & { className?: string }) {
  return (
    <Popover
      offset={6}
      {...props}
      className={cn(
        'min-w-56 rounded-xl border border-line bg-surface p-1 shadow-[0_12px_32px_-8px_rgb(0_0_0/0.18),0_2px_6px_rgb(0_0_0/0.06)] outline-none',
        className
      )}
    />
  );
}

export function Menu<T extends object>(props: MenuProps<T>) {
  return <AriaMenu {...props} className="outline-none" />;
}

export function MenuItem({
  className,
  ...props
}: Omit<MenuItemProps, 'className'> & { className?: string }) {
  return (
    <AriaMenuItem
      {...props}
      className={cn(
        'flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-ink outline-none',
        'data-[focused]:bg-subtle data-[disabled]:opacity-50',
        className
      )}
    />
  );
}

export function MenuSeparator() {
  return <Separator className="mx-1 my-1 h-px bg-line" />;
}
