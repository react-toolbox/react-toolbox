'use client';
import './tokens.css';

import { activeClasses } from './styles';
import type { TabsClassNames } from './types';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
export type TabContentClassNames = TabsClassNames;
export interface TabContentProps extends HTMLAttributes<HTMLElement> {
  active?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: TabContentClassNames;
  ref?: Ref<HTMLElement>;
}
export function TabContent({
  active = false,
  hidden = true,
  classNames,
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
        classNames?.tab,
        active && cn(activeClasses, classNames?.active),
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
