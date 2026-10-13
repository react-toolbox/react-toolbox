'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type Ref,
} from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import { FontIcon } from '../font_icon';
import Tab, { type TabProps } from './Tab';
import TabContent, { type TabContentProps } from './TabContent';
import defaults from './theme';

export type TabsTheme = Partial<typeof defaults> & { disableAnimation?: string };
export interface TabsHandle {
  updatePointer(index?: number): void;
  readonly node: HTMLDivElement | null;
}
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disableAnimatedBottomBorder?: boolean;
  fixed?: boolean;
  hideMode?: 'display' | 'unmounted';
  index?: number;
  inverse?: boolean;
  onChange?: (index: number) => void;
  theme?: TabsTheme;
  ref?: Ref<TabsHandle>;
}
export function Tabs({
  children,
  className,
  disableAnimatedBottomBorder,
  fixed = false,
  hideMode = 'unmounted',
  index = 0,
  inverse = false,
  onChange,
  theme: overrides,
  ref,
  ...attributes
}: TabsProps) {
  const theme = mergeTheme(defaults, overrides);
  const id = `toolbox-tabs-${useId()}`;
  const root = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const currentIndex = useRef(index);
  currentIndex.current = index;
  const [pointer, setPointer] = useState<CSSProperties>({});
  const [arrows, setArrows] = useState({ left: false, right: false });
  const updatePointer = useCallback((selected = currentIndex.current) => {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    if (!navigation.current?.children[selected]) return;
    frame.current = requestAnimationFrame(() => {
      const node = navigation.current;
      const item = node?.children[selected];
      if (!node || !item) return;
      const nav = node.getBoundingClientRect();
      const label = item.getBoundingClientRect();
      setPointer({
        top: `${nav.height}px`,
        left: `${label.left + node.scrollLeft - nav.left}px`,
        width: `${label.width}px`,
      });
    });
  }, []);
  const updateArrows = useCallback(() => {
    const node = navigation.current;
    const last = node?.children[node.children.length - 2];
    if (!node || !last) return;
    const nav = node.getBoundingClientRect();
    const label = last.getBoundingClientRect();
    setArrows({ left: node.scrollLeft > 0, right: nav.right < label.right - 5 });
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      updatePointer,
      get node() {
        return root.current;
      },
    }),
    [updatePointer],
  );
  useEffect(() => {
    const resize = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        updatePointer();
        updateArrows();
      }, 100);
    };
    window.addEventListener('resize', resize);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(resizeTimer.current);
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [updatePointer, updateArrows]);
  const previousChildren = useRef(children);
  const previousIndex = useRef(index);
  useEffect(() => {
    if (previousChildren.current !== children || previousIndex.current !== index)
      updatePointer(index);
    previousChildren.current = children;
    previousIndex.current = index;
  }, [children, index, updatePointer]);
  const scroll = (factor: number) => {
    const node = navigation.current;
    if (!node) return;
    const previous = node.scrollLeft;
    node.scrollLeft += factor * node.clientWidth;
    if (previous !== node.scrollLeft) updateArrows();
  };
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) ||
      !navigation.current
    )
      return;
    const node = navigation.current;
    const tabs = Array.from(
      node.querySelectorAll<HTMLElement>(
        '[role="tab"]:not([aria-disabled="true"]):not([aria-hidden="true"])',
      ),
    );
    if (!tabs.length) return;
    const current = tabs.findIndex((tab) => tab === document.activeElement);
    const direction =
      (event.key === 'ArrowRight' ? 1 : -1) * (getComputedStyle(node).direction === 'rtl' ? -1 : 1);
    const next =
      event.key === 'Home'
        ? tabs[0]
        : event.key === 'End'
          ? tabs[tabs.length - 1]
          : tabs[(current + direction + tabs.length) % tabs.length];
    event.preventDefault();
    next.focus({ preventScroll: true });
    next.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    onChange?.(Array.from(node.children).indexOf(next));
    updateArrows();
  };
  const headers: ReactElement<TabProps>[] = [];
  const explicitContents: ReactElement<TabContentProps>[] = [];
  Children.forEach(children, (item) => {
    if (isValidElement<TabProps>(item) && item.type === Tab) headers.push(item);
    else if (isValidElement<TabContentProps>(item) && item.type === TabContent)
      explicitContents.push(item);
  });
  const contents = explicitContents.length
    ? explicitContents
    : headers.some((item) => item.props.children != null)
      ? headers.map((item) => <TabContent>{item.props.children}</TabContent>)
      : [];
  const selected = headers[index];
  const focusIndex =
    selected && !selected.props.disabled && !selected.props.hidden
      ? index
      : headers.findIndex((item) => !item.props.disabled && !item.props.hidden);
  const arrow = (direction: 'left' | 'right') => (
    <div
      className={theme.arrowContainer}
      role="button"
      tabIndex={0}
      aria-label={`Scroll tabs ${direction}`}
      onClick={() => scroll(direction === 'left' ? -1 : 1)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          scroll(direction === 'left' ? -1 : 1);
        }
      }}
    >
      <FontIcon className={theme.arrow} value={`keyboard_arrow_${direction}`} />
    </div>
  );
  return (
    <div
      {...attributes}
      ref={root}
      data-react-toolbox="tabs"
      className={classnames(theme.tabs, fixed && theme.fixed, inverse && theme.inverse, className)}
    >
      <div className={theme.navigationContainer}>
        {arrows.left && arrow('left')}
        <div
          className={theme.navigation}
          role="tablist"
          aria-label={attributes['aria-label']}
          aria-labelledby={attributes['aria-labelledby']}
          onKeyDown={keyDown}
          ref={navigation}
        >
          {headers.map((item, itemIndex) =>
            cloneElement(item, {
              children: null,
              key: itemIndex,
              index: itemIndex,
              theme: overrides,
              active: index === itemIndex,
              tabIndex: itemIndex === focusIndex ? 0 : -1,
              id: item.props.id || `${id}-tab-${itemIndex}`,
              'aria-controls':
                contents[itemIndex] && (hideMode === 'display' || index === itemIndex)
                  ? contents[itemIndex].props.id || `${id}-panel-${itemIndex}`
                  : undefined,
              onClick: (event) => {
                onChange?.(itemIndex);
                item.props.onClick?.(event, itemIndex);
              },
            }),
          )}
          <span
            className={classnames(
              theme.pointer,
              disableAnimatedBottomBorder && overrides?.disableAnimation,
            )}
            style={pointer}
          />
        </div>
        {arrows.right && arrow('right')}
      </div>
      {contents.map((item, itemIndex) =>
        hideMode === 'unmounted' && itemIndex !== index
          ? null
          : cloneElement(item, {
              key: itemIndex,
              theme: overrides,
              active: index === itemIndex,
              hidden: index !== itemIndex && hideMode === 'display',
              id: item.props.id || `${id}-panel-${itemIndex}`,
              'aria-labelledby': headers[itemIndex]
                ? headers[itemIndex].props.id || `${id}-tab-${itemIndex}`
                : undefined,
              tabIndex: item.props.tabIndex ?? (index === itemIndex ? 0 : -1),
            }),
      )}
    </div>
  );
}
export default Tabs;
