'use client';
import { activeClasses } from './styles';
import type { TabsTheme } from './types';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../utils/cn';
export type TabContentTheme = TabsTheme;
export interface TabContentProps extends HTMLAttributes<HTMLElement> {
  active?: boolean;
  theme?: TabContentTheme;
  ref?: Ref<HTMLElement>;
}
export function TabContent({
  active = false,
  hidden = true,
  theme,
  className,
  children,
  ...attributes
}: TabContentProps) {
  return (
    <section
      {...attributes}
      className={cn(
        'rt-tabs-tab',
        'flex flex-col overflow-hidden p-[var(--tab-label-v-padding)_var(--tab-label-h-padding)] relative',
        '[&:not(.rt-tabs-active)]:hidden',
        theme?.tab,
        active && cn(activeClasses, theme?.active),
        className,
      )}
      role="tabpanel"
      aria-hidden={!active || hidden || undefined}
      hidden={!active || hidden}
      tabIndex={attributes.tabIndex ?? (active ? 0 : -1)}
    >
      {children}
    </section>
  );
}
export default TabContent;
