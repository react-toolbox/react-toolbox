'use client';
import './tokens.css';
import '../input/tokens.css';
import * as Primitive from '@radix-ui/react-select';
import type { ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import { surfaceClasses, popupClasses, optionClasses, focusClasses } from '../foundations/styles/composition';
export type DropdownRootProps = ComponentProps<typeof Primitive.Root>;
export function DropdownRoot(props: DropdownRootProps) {
  return <Primitive.Root {...props} />;
}
export type DropdownSelectionProps = ComponentProps<typeof Primitive.Value>;
export function DropdownSelection(props: DropdownSelectionProps) {
  return <Primitive.Value {...props} />;
}
export type DropdownPortalProps = ComponentProps<typeof Primitive.Portal>;
export function DropdownPortal(props: DropdownPortalProps) {
  return <Primitive.Portal {...props} />;
}
export type DropdownGroupProps = ComponentProps<typeof Primitive.Group>;
export function DropdownGroup(props: DropdownGroupProps) {
  return <Primitive.Group {...props} />;
}
export type DropdownOptionTextProps = ComponentProps<typeof Primitive.ItemText>;
export function DropdownOptionText(props: DropdownOptionTextProps) {
  return <Primitive.ItemText {...props} />;
}
export type DropdownOptionIndicatorProps = ComponentProps<typeof Primitive.ItemIndicator>;
export function DropdownOptionIndicator(props: DropdownOptionIndicatorProps) {
  return <Primitive.ItemIndicator {...props} />;
}
export type DropdownIconProps = ComponentProps<typeof Primitive.Icon>;
export function DropdownIcon(props: DropdownIconProps) {
  return <Primitive.Icon {...props} />;
}
export type DropdownTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export function DropdownTrigger({ className, ...props }: DropdownTriggerProps) {
  return (
    <Primitive.Trigger
      data-slot="DropdownTrigger"
      {...props}
      className={cn(
        surfaceClasses,
        focusClasses,
        'text-(--input-text-input-element-color) flex min-h-[max(48px,var(--input-field-height))] w-full items-center justify-between gap-[16px] rounded-none border-0 [box-shadow:inset_0_-1px_0_var(--input-text-bottom-border-color)] focus:[box-shadow:inset_0_-2px_0_var(--input-text-highlight-color)] bg-(--input-text-background-color) px-0 py-(--input-field-padding) text-(length:--input-field-font-size) leading-[1.4] data-placeholder:text-(--input-text-label-color) disabled:opacity-50',
        className,
      )}
    />
  );
}
export type DropdownContentProps = ComponentProps<typeof Primitive.Content>;
export function DropdownContent({ className, style, ...props }: DropdownContentProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Content
      data-slot="DropdownContent"
      position="item-aligned"
      sideOffset={4}
      collisionPadding={16}
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        surfaceClasses,
        popupClasses,
        'bg-(--dropdown-color-white) py-(--input-field-padding) text-(--rt-color-text) rounded-(--dropdown-value-border-radius) min-w-(--radix-select-trigger-width) max-h-(--radix-select-content-available-height)',
        className,
      )}
    />
  );
}
export type DropdownViewportProps = ComponentProps<typeof Primitive.Viewport>;
export function DropdownViewport({ className, ...props }: DropdownViewportProps) {
  return <Primitive.Viewport data-slot="DropdownViewport" {...props} className={cn('p-0', className)} />;
}
export type DropdownOptionProps = ComponentProps<typeof Primitive.Item>;
export function DropdownOption({ className, ...props }: DropdownOptionProps) {
  return (
    <Primitive.Item
      data-slot="DropdownOption"
      {...props}
      className={cn(
        optionClasses,
        'min-h-[max(48px,var(--input-field-height))] px-[calc(1.6*var(--unit))] py-(--input-field-padding) text-(length:--input-field-font-size) leading-[1.4] data-highlighted:bg-(--dropdown-value-hover-background)',
        className,
      )}
    />
  );
}
export type DropdownLabelProps = ComponentProps<typeof Primitive.Label>;
export function DropdownLabel({ className, ...props }: DropdownLabelProps) {
  return (
    <Primitive.Label
      data-slot="DropdownLabel"
      {...props}
      className={cn(
        'px-[calc(1.6*var(--unit))] py-(--input-field-padding) text-(length:--font-size-small) font-medium text-(--rt-color-text-secondary)',
        className,
      )}
    />
  );
}
export type DropdownSeparatorProps = ComponentProps<typeof Primitive.Separator>;
export function DropdownSeparator({ className, ...props }: DropdownSeparatorProps) {
  return (
    <Primitive.Separator
      data-slot="DropdownSeparator"
      {...props}
      className={cn('my-[8px] h-px bg-(--rt-color-divider)', className)}
    />
  );
}
export type DropdownScrollUpButtonProps = ComponentProps<typeof Primitive.ScrollUpButton>;
export function DropdownScrollUpButton({ className, ...props }: DropdownScrollUpButtonProps) {
  return (
    <Primitive.ScrollUpButton
      data-slot="DropdownScrollUpButton"
      {...props}
      className={cn('flex h-[32px] items-center justify-center', className)}
    />
  );
}
export type DropdownScrollDownButtonProps = ComponentProps<typeof Primitive.ScrollDownButton>;
export function DropdownScrollDownButton({ className, ...props }: DropdownScrollDownButtonProps) {
  return (
    <Primitive.ScrollDownButton
      data-slot="DropdownScrollDownButton"
      {...props}
      className={cn('flex h-[32px] items-center justify-center', className)}
    />
  );
}
