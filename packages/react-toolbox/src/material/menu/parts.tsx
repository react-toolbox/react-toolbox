'use client';
import './tokens.css';
import * as Primitive from '@radix-ui/react-dropdown-menu';
import { createContext, useContext, type ComponentProps, type CSSProperties } from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import { surfaceClasses, popupClasses, optionClasses } from '../foundations/styles/composition';
export type MenuDensity = 'comfortable' | 'desktop' | 'compact';
const DensityContext = createContext<MenuDensity>('comfortable');
const menuOptionClasses =
  'min-h-(--menu-item-height) px-(--menu-item-padding) py-0 text-(length:--menu-item-font-size) leading-[24px] whitespace-nowrap data-highlighted:bg-(--menu-item-hover-background)';
const densityVariables: Record<MenuDensity, CSSProperties> = {
  comfortable: {},
  desktop: {
    '--menu-item-height': '32px',
    '--menu-item-padding': '24px',
    '--menu-item-font-size': '15px',
  } as CSSProperties,
  compact: {
    '--menu-item-height': '24px',
    '--menu-item-padding': '24px',
    '--menu-item-font-size': '13px',
    '--menu-padding': '4px 0',
  } as CSSProperties,
};
export type DropdownMenuRootProps = ComponentProps<typeof Primitive.Root> & {
  /** M1 touch, desktop, or dense desktop metrics. Portaled submenus inherit this choice. */
  density?: MenuDensity;
};
export function DropdownMenuRoot({ density = 'comfortable', ...props }: DropdownMenuRootProps) {
  return (
    <DensityContext value={density}>
      <Primitive.Root {...props} />
    </DensityContext>
  );
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
  const density = useContext(DensityContext);
  return (
    <Primitive.Content
      data-slot="DropdownMenuContent"
      sideOffset={4}
      collisionPadding={16}
      {...props}
      {...theme}
      style={{ ...theme.style, ...densityVariables[density], ...style }}
      className={cn(
        surfaceClasses,
        popupClasses,
        'bg-(--menu-background-color) text-(--rt-color-text) rounded-(--menu-outline-border-radius) p-(--menu-padding) data-[state=open]:animate-[toolbox-enter_var(--menu-expand-duration)_var(--animation-curve-linear-out-slow-in)] data-[state=closed]:animate-[toolbox-exit_var(--menu-fade-duration)_var(--animation-curve-fast-out-linear-in)]',
        className,
      )}
    />
  );
}
export type DropdownMenuSubContentProps = ComponentProps<typeof Primitive.SubContent>;
export function DropdownMenuSubContent({ className, style, ...props }: DropdownMenuSubContentProps) {
  const theme = usePortalTheme();
  const density = useContext(DensityContext);
  return (
    <Primitive.SubContent
      data-slot="DropdownMenuSubContent"
      sideOffset={2}
      collisionPadding={16}
      {...props}
      {...theme}
      style={{ ...theme.style, ...densityVariables[density], ...style }}
      className={cn(
        surfaceClasses,
        popupClasses,
        'bg-(--menu-background-color) text-(--rt-color-text) rounded-(--menu-outline-border-radius) p-(--menu-padding) data-[state=open]:animate-[toolbox-enter_var(--menu-expand-duration)_var(--animation-curve-linear-out-slow-in)] data-[state=closed]:animate-[toolbox-exit_var(--menu-fade-duration)_var(--animation-curve-fast-out-linear-in)]',
        className,
      )}
    />
  );
}
export type DropdownMenuItemProps = ComponentProps<typeof Primitive.Item>;
export function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
  return (
    <Primitive.Item
      data-slot="DropdownMenuItem"
      {...props}
      className={cn(optionClasses, menuOptionClasses, 'data-[state=open]:bg-(--menu-item-hover-background)', className)}
    />
  );
}
export type DropdownMenuCheckboxItemProps = ComponentProps<typeof Primitive.CheckboxItem>;
export function DropdownMenuCheckboxItem({ className, ...props }: DropdownMenuCheckboxItemProps) {
  return (
    <Primitive.CheckboxItem
      data-slot="DropdownMenuCheckboxItem"
      {...props}
      className={cn(optionClasses, menuOptionClasses, 'data-[state=open]:bg-(--menu-item-hover-background)', className)}
    />
  );
}
export type DropdownMenuRadioItemProps = ComponentProps<typeof Primitive.RadioItem>;
export function DropdownMenuRadioItem({ className, ...props }: DropdownMenuRadioItemProps) {
  return (
    <Primitive.RadioItem
      data-slot="DropdownMenuRadioItem"
      {...props}
      className={cn(optionClasses, menuOptionClasses, 'data-[state=open]:bg-(--menu-item-hover-background)', className)}
    />
  );
}
export type DropdownMenuSubTriggerProps = ComponentProps<typeof Primitive.SubTrigger>;
export function DropdownMenuSubTrigger({ className, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <Primitive.SubTrigger
      data-slot="DropdownMenuSubTrigger"
      {...props}
      className={cn(optionClasses, menuOptionClasses, 'data-[state=open]:bg-(--menu-item-hover-background)', className)}
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
