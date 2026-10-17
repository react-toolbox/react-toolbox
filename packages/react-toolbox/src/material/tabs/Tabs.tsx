'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { TabsClassNames } from './types';

import {
  Children,
  Fragment,
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
  type ReactElement,
  type Ref,
} from 'react';
import { cn } from '../foundations/styles/cn';
import * as RovingFocus from '@radix-ui/react-roving-focus';
import { FontIcon } from '../font-icon';
import Tab, { type TabProps } from './Tab';
import TabContent, { type TabContentProps } from './TabContent';

export type { TabsClassNames } from './types';
export interface TabsHandle {
  updatePointer(index?: number): void;
  readonly node: HTMLDivElement | null;
}
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disableAnimatedBottomBorder?: boolean;
  fixed?: boolean;
  hideMode?: 'display' | 'unmounted';
  index?: number;
  /** Initial selection when index is not controlled. */
  defaultIndex?: number;
  /** Manual activation keeps expensive panels unchanged until Enter or Space. */
  activationMode?: 'automatic' | 'manual';
  loop?: boolean;
  inverse?: boolean;
  onChange?: (index: number) => void;
  /** Classes for the component's rendered parts. */
  classNames?: TabsClassNames;
  ref?: Ref<TabsHandle>;
}
export function Tabs({
  children,
  className,
  disableAnimatedBottomBorder,
  fixed = false,
  hideMode = 'unmounted',
  index: controlledIndex,
  defaultIndex = 0,
  activationMode = 'automatic',
  loop = true,
  inverse = false,
  onChange,
  classNames,
  ref,
  ...attributes
}: TabsProps) {
  const [internalIndex, setIndex] = useState(defaultIndex);
  const index = controlledIndex ?? internalIndex;
  const [focusedIndex, setFocusedIndex] = useState(index);
  useEffect(() => setFocusedIndex(index), [index]);
  const change = (next: number) => {
    if (next === index) return;
    if (controlledIndex === undefined) setIndex(next);
    onChange?.(next);
  };
  const id = `toolbox-tabs-${useId()}`;
  const root = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const keyboardNavigation = useRef(false);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  useEffect(() => {
    if (root.current) setDirection(getComputedStyle(root.current).direction === 'rtl' ? 'rtl' : 'ltr');
  }, [attributes.dir]);
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
    if (!node) return;
    const labels = Array.from(node.querySelectorAll<HTMLElement>('[role="tab"]'))
      .filter((item) => !item.hidden)
      .map((item) => item.getBoundingClientRect());
    const nav = node.getBoundingClientRect();
    setArrows({
      left: labels.some((label) => label.left < nav.left - 5),
      right: labels.some((label) => label.right > nav.right + 5),
    });
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
    if (previousChildren.current !== children || previousIndex.current !== index) updatePointer(index);
    updateArrows();
    previousChildren.current = children;
    previousIndex.current = index;
  }, [children, index, updatePointer, updateArrows]);
  const scroll = (factor: number) => {
    const node = navigation.current;
    if (!node) return;
    const previous = node.scrollLeft;
    node.scrollLeft += factor * node.clientWidth;
    if (previous !== node.scrollLeft) updateArrows();
  };
  const headers: ReactElement<TabProps>[] = [];
  const explicitContents: ReactElement<TabContentProps>[] = [];
  const collect = (children: React.ReactNode) =>
    Children.forEach(children, (item) => {
      if (isValidElement<{ children?: React.ReactNode }>(item) && item.type === Fragment) {
        collect(item.props.children);
        return;
      }
      if (isValidElement<TabProps>(item) && item.type === Tab) headers.push(item);
      else if (isValidElement<TabContentProps>(item) && item.type === TabContent) explicitContents.push(item);
    });
  collect(children);
  const contents = explicitContents.length
    ? explicitContents
    : headers.some((item) => item.props.children != null)
      ? headers.map((item) => <TabContent>{item.props.children}</TabContent>)
      : [];
  const navigationIndex = activationMode === 'manual' ? focusedIndex : index;
  const selected = headers[navigationIndex];
  const focusIndex =
    selected && !selected.props.disabled && !selected.props.hidden
      ? navigationIndex
      : headers.findIndex((item) => !item.props.disabled && !item.props.hidden);
  const arrow = (direction: 'left' | 'right') => (
    <div
      className={cn(
        'rt-tabs-arrowContainer',
        'items-center [box-shadow:inset_0_-1px_var(--tab-navigation-border-color)] cursor-pointer flex',
        '[&:focus-visible]:[outline:2px_solid_currentColor] [&:focus-visible]:-outline-offset-2',
        '[.rt-tabs-inverse_&]:bg-(--tab-inverse-bar-color)',
        classNames?.arrowContainer,
      )}
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
      <FontIcon
        className={cn(
          'rt-tabs-arrow',
          'text-(--tab-text-color) p-[0_var(--tab-label-h-padding)] w-[calc(1em+2*var(--tab-label-h-padding))]',
          '[.rt-tabs-inverse_&]:text-(--tab-inverse-text-color)',
          classNames?.arrow,
        )}
        value={`keyboard_arrow_${direction}`}
      />
    </div>
  );
  return (
    <div
      {...attributes}
      ref={root}
      data-react-toolbox="tabs"
      className={cn(
        'rt-tabs-tabs',
        'flex flex-col',
        materialRoot,
        materialDescendants,
        classNames?.tabs,
        fixed && cn('rt-tabs-fixed', classNames?.fixed),
        inverse && cn('rt-tabs-inverse', classNames?.inverse),
        className,
      )}
    >
      <div className={cn('rt-tabs-navigationContainer', 'flex', classNames?.navigationContainer)}>
        {arrows.left && arrow('left')}
        <RovingFocus.Root
          asChild
          orientation="horizontal"
          dir={direction}
          loop={loop}
          currentTabStopId={String(focusIndex)}
          onCurrentTabStopIdChange={(next) => {
            if (next !== null) setFocusedIndex(Number(next));
          }}
          onEntryFocus={(event) => event.preventDefault()}
        >
          <div
            className={cn(
              'rt-tabs-navigation',
              '[box-shadow:inset_0_-1px_var(--tab-navigation-border-color)] flex flex-row overflow-x-hidden relative',
              '[.rt-tabs-navigationContainer_&]:flex-1',
              '[.rt-tabs-inverse_&]:bg-(--tab-inverse-bar-color)',
              classNames?.navigation,
            )}
            role="tablist"
            aria-label={attributes['aria-label']}
            aria-labelledby={attributes['aria-labelledby']}
            tabIndex={-1}
            onPointerDownCapture={() => {
              keyboardNavigation.current = false;
            }}
            onKeyDownCapture={(event) => {
              keyboardNavigation.current =
                !event.altKey &&
                !event.ctrlKey &&
                !event.metaKey &&
                ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key);
            }}
            ref={navigation}
            onScroll={updateArrows}
          >
            {headers.map((item, itemIndex) => (
              <RovingFocus.Item
                key={item.key ?? itemIndex}
                asChild
                tabStopId={String(itemIndex)}
                active={index === itemIndex}
                focusable={!item.props.disabled && !item.props.hidden}
              >
                {cloneElement(item, {
                  children: null,
                  key: itemIndex,
                  index: itemIndex,
                  classNames: mergeStyleSlots(classNames, item.props.classNames),
                  active: index === itemIndex,
                  tabIndex: itemIndex === focusIndex ? 0 : -1,
                  id: item.props.id || `${id}-tab-${itemIndex}`,
                  'aria-controls':
                    contents[itemIndex] && (hideMode === 'display' || index === itemIndex)
                      ? contents[itemIndex].props.id || `${id}-panel-${itemIndex}`
                      : undefined,
                  onFocus: (event) => {
                    item.props.onFocus?.(event);
                    if (keyboardNavigation.current && !event.defaultPrevented) {
                      keyboardNavigation.current = false;
                      if (activationMode === 'automatic') change(itemIndex);
                      event.currentTarget.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
                      updateArrows();
                    }
                  },
                  onClick: (event) => {
                    item.props.onClick?.(event, itemIndex);
                    if (!event.defaultPrevented) change(itemIndex);
                  },
                })}
              </RovingFocus.Item>
            ))}
            <span
              className={cn(
                'rt-tabs-pointer',
                'bg-(--tab-pointer-color) h-(--tab-pointer-height) mt-[calc(-1_*_var(--tab-pointer-height))] absolute [transition-duration:var(--animation-duration)] [transition-property:left,width] [transition-timing-function:var(--animation-curve-default)] w-0',
                '[.rt-tabs-inverse_&]:bg-(--tab-inverse-pointer-color)',
                classNames?.pointer,
                disableAnimatedBottomBorder && classNames?.disableAnimation,
              )}
              style={{ ...pointer, ...(disableAnimatedBottomBorder ? { transition: 'none' } : {}) }}
            />
          </div>
        </RovingFocus.Root>
        {arrows.right && arrow('right')}
      </div>
      {contents.map((item, itemIndex) =>
        hideMode === 'unmounted' && itemIndex !== index
          ? null
          : cloneElement(item, {
              key: itemIndex,
              classNames: mergeStyleSlots(classNames, item.props.classNames),
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
