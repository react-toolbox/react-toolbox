'use client';
import * as Primitive from '@radix-ui/react-dropdown-menu';
import type { ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import { surfaceClasses, popupClasses, optionClasses } from '../foundations/styles/composition';
export type DropdownMenuRootProps = ComponentProps<typeof Primitive.Root>;
export function DropdownMenuRoot(props: DropdownMenuRootProps) {
  return <Primitive.Root {...props} />;
}
export type DropdownMenuTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  return <Primitive.Trigger {...props} />;
}
export type DropdownMenuPortalProps = ComponentProps<typeof Primitive.Portal>;
export function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <Primitive.Portal {...props} />;
}
export type DropdownMenuGroupProps = ComponentProps<typeof Primitive.Group>;
export function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  return <Primitive.Group {...props} />;
}
export type DropdownMenuSubProps = ComponentProps<typeof Primitive.Sub>;
export function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <Primitive.Sub {...props} />;
}
export type DropdownMenuRadioGroupProps = ComponentProps<typeof Primitive.RadioGroup>;
export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  return <Primitive.RadioGroup {...props} />;
}
export type DropdownMenuItemIndicatorProps = ComponentProps<typeof Primitive.ItemIndicator>;
export function DropdownMenuItemIndicator(props: DropdownMenuItemIndicatorProps) {
  return <Primitive.ItemIndicator {...props} />;
}
export type DropdownMenuContentProps = ComponentProps<typeof Primitive.Content>;
export function DropdownMenuContent({ className, style, ...props }: DropdownMenuContentProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Content
      data-slot="DropdownMenuContent"
      sideOffset={4}
      collisionPadding={8}
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(surfaceClasses, popupClasses, className)}
    />
  );
}
export type DropdownMenuSubContentProps = ComponentProps<typeof Primitive.SubContent>;
export function DropdownMenuSubContent({ className, style, ...props }: DropdownMenuSubContentProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.SubContent
      data-slot="DropdownMenuSubContent"
      sideOffset={2}
      collisionPadding={8}
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(surfaceClasses, popupClasses, className)}
    />
  );
}
export type DropdownMenuItemProps = ComponentProps<typeof Primitive.Item>;
export function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
  return (
    <Primitive.Item
      data-slot="DropdownMenuItem"
      {...props}
      className={cn(optionClasses, 'data-[state=open]:bg-(--menu-item-hover-background)', className)}
    />
  );
}
export type DropdownMenuCheckboxItemProps = ComponentProps<typeof Primitive.CheckboxItem>;
export function DropdownMenuCheckboxItem({ className, ...props }: DropdownMenuCheckboxItemProps) {
  return (
    <Primitive.CheckboxItem
      data-slot="DropdownMenuCheckboxItem"
      {...props}
      className={cn(optionClasses, 'data-[state=open]:bg-(--menu-item-hover-background)', className)}
    />
  );
}
export type DropdownMenuRadioItemProps = ComponentProps<typeof Primitive.RadioItem>;
export function DropdownMenuRadioItem({ className, ...props }: DropdownMenuRadioItemProps) {
  return (
    <Primitive.RadioItem
      data-slot="DropdownMenuRadioItem"
      {...props}
      className={cn(optionClasses, 'data-[state=open]:bg-(--menu-item-hover-background)', className)}
    />
  );
}
export type DropdownMenuSubTriggerProps = ComponentProps<typeof Primitive.SubTrigger>;
export function DropdownMenuSubTrigger({ className, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <Primitive.SubTrigger
      data-slot="DropdownMenuSubTrigger"
      {...props}
      className={cn(optionClasses, 'data-[state=open]:bg-(--menu-item-hover-background)', className)}
    />
  );
}
export type DropdownMenuLabelProps = ComponentProps<typeof Primitive.Label>;
export function DropdownMenuLabel({ className, ...props }: DropdownMenuLabelProps) {
  return (
    <Primitive.Label
      data-slot="DropdownMenuLabel"
      {...props}
      className={cn(
        'px-[16px] py-[8px] text-[14px] leading-[24px] font-medium text-(--rt-color-text-secondary)',
        className,
      )}
    />
  );
}
export type DropdownMenuSeparatorProps = ComponentProps<typeof Primitive.Separator>;
export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <Primitive.Separator
      data-slot="DropdownMenuSeparator"
      {...props}
      className={cn('my-[8px] h-px bg-(--rt-color-divider)', className)}
    />
  );
}
