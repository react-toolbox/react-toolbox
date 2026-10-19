'use client';
import './tokens.css';
import { forcedColorsFocusClasses } from '../foundations/styles/composition';
import useMergedRefs from '../foundations/portal/useMergedRefs';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from 'react';
import { cn } from '../foundations/styles/cn';
import * as Primitive from '@radix-ui/react-tabs';
import { FontIcon } from '../font-icon';
import Tab, { type TabProps } from './Tab';
import TabContent, { type TabContentProps } from './TabContent';

/** Keep Radix's empty selection distinct from every public string value. */
const primitiveValuePrefix = 'tab:';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disableAnimatedBottomBorder?: boolean;
  fixed?: boolean;
  hideMode?: 'display' | 'unmounted';
  value?: string;
  /** Initial selection when value is not controlled. */
  defaultValue?: string;
  /** Manual activation keeps expensive panels unchanged until Enter or Space. */
  activationMode?: 'automatic' | 'manual';
  loop?: boolean;
  inverse?: boolean;
  onValueChange?: (value: string) => void;
  ref?: Ref<HTMLDivElement>;
}
export function Tabs({
  children,
  className,
  disableAnimatedBottomBorder,
  fixed = false,
  hideMode = 'unmounted',
  value: controlledValue,
  defaultValue,
  activationMode = 'automatic',
  loop = true,
  inverse = false,
  onValueChange,
  ref,
  ...attributes
}: TabsProps) {
  const [internalValue, setValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const id = `toolbox-tabs-${useId()}`;
  const root = useRef<HTMLDivElement>(null);
  const rootRef = useMergedRefs(ref, root);
  const navigation = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  useEffect(() => {
    if (root.current) setDirection(getComputedStyle(root.current).direction === 'rtl' ? 'rtl' : 'ltr');
  }, [attributes.dir]);
  const frame = useRef<number | undefined>(undefined);
  const [pointer, setPointer] = useState({ top: 0, left: 0, width: 0 });
  const [arrows, setArrows] = useState({ left: false, right: false });
  const updatePointer = useCallback(() => {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const node = navigation.current;
      if (!node) return;
      const item = node.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      if (!item) {
        setPointer({ top: 0, left: 0, width: 0 });
        return;
      }
      const nav = node.getBoundingClientRect();
      const label = item.getBoundingClientRect();
      setPointer({
        top: nav.height,
        left: label.left + node.scrollLeft - nav.left,
        width: label.width,
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
  useEffect(() => {
    const node = navigation.current;
    if (!node) return;
    const measure = () => {
      updatePointer();
      updateArrows();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(node);
    node.querySelectorAll('[role="tab"]').forEach((tab) => resize.observe(tab));
    measure();
    return () => {
      resize.disconnect();
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [children, value, direction, updatePointer, updateArrows]);
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
      ? headers.map((item) => (
          <TabContent key={item.props.value} value={item.props.value}>
            {item.props.children}
          </TabContent>
        ))
      : [];
  const arrow = (direction: 'left' | 'right') => (
    <div
      className={cn(
        'rt-tabs-arrowContainer',
        'relative items-center [box-shadow:inset_0_-1px_var(--tab-navigation-border-color)] cursor-pointer flex outline-none text-(--tab-text-color)',
        "focus-visible:before:content-[''] before:absolute before:inset-0 before:pointer-events-none focus-visible:before:bg-(--tab-focus-color)",
        forcedColorsFocusClasses,
        '[.rt-tabs-inverse_&]:bg-(--tab-inverse-bar-color) [.rt-tabs-inverse_&]:text-(--tab-inverse-text-color)',
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
        )}
        value={`keyboard_arrow_${direction}`}
      />
    </div>
  );
  return (
    <Primitive.Root
      asChild
      ref={rootRef}
      data-react-toolbox="tabs"
      dir={direction}
      value={value === undefined ? '' : `${primitiveValuePrefix}${value}`}
      onValueChange={(next) => {
        const nextValue = next.slice(primitiveValuePrefix.length);
        if (controlledValue === undefined) setValue(nextValue);
        onValueChange?.(nextValue);
      }}
      activationMode={activationMode}
      className={cn(
        'rt-tabs-tabs',
        'flex flex-col',
        materialRoot,
        materialDescendants,
        fixed && 'rt-tabs-fixed',
        inverse && 'rt-tabs-inverse',
        className,
      )}
    >
      <div {...attributes} dir={attributes.dir}>
        <div className={cn('rt-tabs-navigationContainer', 'flex')}>
          {arrows.left && arrow('left')}
          <Primitive.List
            className={cn(
              'rt-tabs-navigation',
              '[box-shadow:inset_0_-1px_var(--tab-navigation-border-color)] flex flex-row overflow-x-hidden relative',
              '[.rt-tabs-navigationContainer_&]:flex-1',
              '[.rt-tabs-inverse_&]:bg-(--tab-inverse-bar-color)',
            )}
            aria-label={attributes['aria-label']}
            aria-labelledby={attributes['aria-labelledby']}
            loop={loop}
            ref={navigation}
            onScroll={updateArrows}
          >
            {headers.map((item) => {
              const panel = contents.find((content) => content.props.value === item.props.value);
              return (
                <Primitive.Trigger
                  key={item.props.value}
                  asChild
                  value={`${primitiveValuePrefix}${item.props.value}`}
                  disabled={item.props.disabled || item.props.hidden}
                >
                  {cloneElement(item, {
                    children: null,
                    active: value === item.props.value,
                    id: item.props.id || `${id}-tab-${encodeURIComponent(item.props.value)}`,
                    'aria-controls':
                      panel && (hideMode === 'display' || value === item.props.value)
                        ? panel.props.id || `${id}-panel-${encodeURIComponent(item.props.value)}`
                        : undefined,
                    onFocus: (event) => {
                      item.props.onFocus?.(event);
                      event.currentTarget.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
                      updateArrows();
                    },
                  })}
                </Primitive.Trigger>
              );
            })}
            <span
              className={cn(
                'rt-tabs-pointer',
                'bg-(--tab-pointer-color) h-(--tab-pointer-height) mt-[calc(-1_*_var(--tab-pointer-height))] absolute [transition-duration:var(--animation-duration)] [transition-timing-function:var(--animation-curve-default)]',
                'left-0 w-px origin-left transform-[scaleX(0)] [transition-property:transform]',
                '[.rt-tabs-inverse_&]:bg-(--tab-inverse-pointer-color)',
              )}
              style={{
                top: pointer.top,
                transform: `translateX(${pointer.left}px) scaleX(${pointer.width})`,
                ...(disableAnimatedBottomBorder ? { transition: 'none' } : {}),
              }}
            />
          </Primitive.List>
          {arrows.right && arrow('right')}
        </div>
        {contents.map((item) => {
          const tab = headers.find((header) => header.props.value === item.props.value);
          return (
            <Primitive.Content
              key={item.props.value}
              asChild
              value={`${primitiveValuePrefix}${item.props.value}`}
              forceMount={hideMode === 'display' || undefined}
            >
              {cloneElement(item, {
                active: value === item.props.value,
                hidden: value !== item.props.value && hideMode === 'display',
                id: item.props.id || `${id}-panel-${encodeURIComponent(item.props.value)}`,
                'aria-labelledby': tab
                  ? tab.props.id || `${id}-tab-${encodeURIComponent(item.props.value)}`
                  : undefined,
                tabIndex: item.props.tabIndex ?? (value === item.props.value ? 0 : -1),
              })}
            </Primitive.Content>
          );
        })}
      </div>
    </Primitive.Root>
  );
}
export default Tabs;
