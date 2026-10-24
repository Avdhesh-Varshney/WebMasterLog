import { WarningCircle } from '@phosphor-icons/react';
import { cn } from '../utils/cn';

export function ErrorAlert({
  message,
  className,
}: {
  message: string | null;
  className?: string;
}) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-2 rounded-lg border border-danger/25 bg-danger-soft px-3 py-2.5 text-[13px] text-danger',
        className
      )}
    >
      <WarningCircle weight="fill" className="mt-px size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
