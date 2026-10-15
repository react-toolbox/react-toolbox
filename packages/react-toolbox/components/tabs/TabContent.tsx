'use client';

import type { HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaults from './theme';
export type TabContentTheme = Partial<typeof defaults>;
export interface TabContentProps extends HTMLAttributes<HTMLElement> {
  active?: boolean;
  theme?: TabContentTheme;
  ref?: Ref<HTMLElement>;
}
export function TabContent({
  active = false,
  hidden = true,
  theme: overrides,
  className,
  children,
  ...attributes
}: TabContentProps) {
  const theme = mergeTheme(defaults, overrides);
  return (
    <section
      {...attributes}
      className={classnames(theme.tab, active && theme.active, className)}
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
