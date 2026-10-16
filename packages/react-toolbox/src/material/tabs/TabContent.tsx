'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { activeClasses } from './styles';
import type { TabsTheme } from './types';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
export type TabContentTheme = TabsTheme;
export interface TabContentProps extends HTMLAttributes<HTMLElement> {
  active?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TabContentTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TabContentTheme;
  ref?: Ref<HTMLElement>;
}
export function TabContent({
  active = false,
  hidden = true,
  theme: legacyTheme,
  classNames,
  className,
  children,
  ...attributes
}: TabContentProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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

/** Style slots for the component. */
export type TabContentClassNames = TabContentTheme;
