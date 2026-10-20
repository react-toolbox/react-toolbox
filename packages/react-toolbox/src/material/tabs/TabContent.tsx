'use client';
import './tokens.css';

import { activeClasses } from './styles';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
export interface TabContentProps extends HTMLAttributes<HTMLElement> {
  /** Stable selection value shared by the tab and its panel. */
  value: string;
  active?: boolean;
  ref?: Ref<HTMLElement>;
}
export function TabContent({
  value: _value,
  active = false,
  hidden = true,
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
        active && activeClasses,
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
