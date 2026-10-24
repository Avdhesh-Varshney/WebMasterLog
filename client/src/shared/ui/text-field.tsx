import { ReactNode } from 'react';
import {
  FieldError,
  Input,
  Label,
  Text,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { cn } from '../utils/cn';

export interface TextFieldProps extends Omit<AriaTextFieldProps, 'className'> {
  label: string;
  description?: string;
  placeholder?: string;
  icon?: ReactNode;
  /** Rendered at the right side of the label row (e.g. "Forgot password?"). */
  labelAction?: ReactNode;
  className?: string;
}

export function TextField({
  label,
  description,
  placeholder,
  icon,
  labelAction,
  className,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={cn('group flex flex-col gap-1.5', className)}
    >
      <div className="flex items-center justify-between">
        <Label className="text-[13px] font-medium text-ink">{label}</Label>
        {labelAction}
      </div>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-faint group-data-[invalid]:text-danger">
            {icon}
          </span>
        )}
        <Input
          placeholder={placeholder}
          className={cn(
            'h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink shadow-[0_1px_2px_rgb(0_0_0/0.03)] transition-[border-color,box-shadow] outline-none placeholder:text-ink-faint',
            'data-[hovered]:border-line-strong',
            'data-[focused]:border-accent data-[focused]:ring-3 data-[focused]:ring-accent/15',
            'data-[invalid]:border-danger data-[invalid]:data-[focused]:ring-danger/15',
            'data-[disabled]:opacity-60',
            icon && 'pl-9'
          )}
        />
      </div>
      {description && (
        <Text slot="description" className="text-xs text-ink-muted">
          {description}
        </Text>
      )}
      <FieldError className="text-xs text-danger" />
    </AriaTextField>
  );
}
