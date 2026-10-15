'use client';
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
        'flex min-h-[48px] w-full items-center justify-between gap-[16px] rounded-none border-0 [box-shadow:inset_0_-1px_0_var(--input-text-bottom-border-color)] focus:[box-shadow:inset_0_-2px_0_var(--rt-color-primary)] bg-transparent px-0 py-[8px] text-[16px] leading-[24px] data-placeholder:text-(--rt-color-text-secondary) disabled:opacity-50',
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
      position="popper"
      sideOffset={4}
      collisionPadding={8}
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        surfaceClasses,
        popupClasses,
        'min-w-(--radix-select-trigger-width) max-h-(--radix-select-content-available-height)',
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
  return <Primitive.Item data-slot="DropdownOption" {...props} className={cn(optionClasses, className)} />;
}
export type DropdownLabelProps = ComponentProps<typeof Primitive.Label>;
export function DropdownLabel({ className, ...props }: DropdownLabelProps) {
  return (
    <Primitive.Label
      data-slot="DropdownLabel"
      {...props}
      className={cn('px-[16px] py-[8px] text-[14px] font-medium text-(--rt-color-text-secondary)', className)}
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
