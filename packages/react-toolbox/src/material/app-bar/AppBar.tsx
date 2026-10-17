'use client';
import './tokens.css';
import '../button/tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialDescendants } from '../foundations/styles/classes';
import type { AppBarClassNames } from './types';
import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cn } from '../foundations/styles/cn';
import { IconButton } from '../button';
import { LayoutContext } from '../foundations/layout/LayoutContext';
export type { AppBarClassNames } from './types';
export interface AppBarProps extends Omit<ComponentPropsWithRef<'header'>, 'title'> {
  fixed?: boolean;
  flat?: boolean;
  leftIcon?: ReactNode;
  leftIconLabel?: string;
  onLeftIconClick?: ComponentPropsWithRef<'button'>['onClick'];
  onRightIconClick?: ComponentPropsWithRef<'button'>['onClick'];
  rightIcon?: ReactNode;
  rightIconLabel?: string;
  scrollHide?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: AppBarClassNames;
  title?: ReactNode;
}
export function AppBar({
  children,
  className = '',
  fixed = false,
  flat = false,
  leftIcon,
  leftIconLabel,
  onLeftIconClick,
  onRightIconClick,
  rightIcon,
  rightIconLabel,
  scrollHide = false,
  classNames: suppliedClassNames,
  title,
  ref,
  ...other
}: AppBarProps) {
  const layout = useContext(LayoutContext);
  const register = layout?.registerAppBar;
  const id = useId();
  useLayoutEffect(() => register?.(id, fixed), [register, id, fixed]);
  const classNames = mergeStyleSlots<AppBarClassNames>(layout?.appBarClasses, suppliedClassNames);
  const root = useRef<HTMLElement | null>(null);
  const [hidden, setHidden] = useState(false);
  const attach = useCallback(
    (node: HTMLElement | null) => {
      root.current = node;
      if (typeof ref === 'function') {
        const cleanup = ref(node);
        return () => {
          root.current = null;
          if (cleanup) cleanup();
          else ref(null);
        };
      }
      if (ref) ref.current = node;
      return () => {
        root.current = null;
        if (ref) ref.current = null;
      };
    },
    [ref],
  );
  useEffect(() => {
    if (!scrollHide) {
      setHidden(false);
      return;
    }
    let previous = window.scrollY;
    const height = root.current?.getBoundingClientRect().height ?? 0;
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(!root.current?.contains(document.activeElement) && current > previous && current > height);
      previous = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollHide]);
  return (
    <header
      {...other}
      ref={attach}
      onFocusCapture={(event) => {
        setHidden(false);
        other.onFocusCapture?.(event);
      }}
      data-react-toolbox="app-bar"
      className={cn(
        'rt-app-bar-appBar',
        '[--appbar-current-h-padding:var(--appbar-h-padding)] [background:var(--appbar-color)] text-(--appbar-contrast) font-(family-name:--preferred-font) h-(--appbar-height) p-[0_var(--appbar-current-h-padding)] duration-500 [transition-property:transform] ease-[cubic-bezier(0.215,0.61,0.355,1)] box-border [-webkit-font-smoothing:antialiased] [font-smoothing:antialiased] [-webkit-text-size-adjust:100%] [-moz-text-size-adjust:100%] [text-size-adjust:100%]',
        materialDescendants,
        '[&:not(.rt-app-bar-flat)]:[box-shadow:var(--shadow-4p)]',
        '[&_a]:text-(--appbar-contrast)',
        '[@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:h-(--appbar-height-m-portrait)',
        '[@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:h-(--appbar-height-m-landscape)',
        '[@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait),_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[--appbar-current-h-padding:var(--appbar-h-padding-mobile,_calc(1.6_*_var(--unit)))]',
        classNames?.appBar,
        fixed &&
          cn(
            'rt-app-bar-fixed',
            '[.rt-app-bar-appBar&]:left-0 [.rt-app-bar-appBar&]:fixed [.rt-app-bar-appBar&]:right-0 [.rt-app-bar-appBar&]:top-0 [.rt-app-bar-appBar&]:z-(--z-index-highest)',
            classNames?.fixed,
          ),
        flat && cn('rt-app-bar-flat', classNames?.flat),
        hidden &&
          cn('rt-app-bar-scrollHide', '[.rt-app-bar-appBar&]:transform-[translateY(-100%)]', classNames?.scrollHide),
        className,
      )}
    >
      <div
        className={cn(
          'rt-app-bar-inner',
          '[.rt-app-bar-appBar_&]:items-center [.rt-app-bar-appBar_&]:flex [.rt-app-bar-appBar_&]:h-full [.rt-app-bar-appBar_&]:relative [.rt-app-bar-appBar_&]:w-full',
          classNames?.inner,
        )}
      >
        {leftIcon && (
          <IconButton
            inverse
            className={cn(
              'rt-app-bar-leftIcon',
              'shrink-0 ms-[calc((var(--button-toggle-font-size)-var(--button-toggle-size))/2)] me-[calc(var(--appbar-title-distance)-(var(--button-toggle-size)+var(--button-toggle-font-size))/2)]',
              classNames?.leftIcon,
            )}
            onClick={onLeftIconClick}
            aria-label={leftIconLabel}
            icon={leftIcon}
          />
        )}
        {typeof title === 'string' ? (
          <h1
            className={cn(
              'rt-app-bar-title',
              'grow m-0 text-(length:--appbar-title-font-size) font-(--appbar-title-font-weight) overflow-x-hidden text-ellipsis whitespace-nowrap',
              classNames?.title,
            )}
          >
            {title}
          </h1>
        ) : (
          title
        )}
        {children}
        {rightIcon && (
          <IconButton
            inverse
            className={cn(
              'rt-app-bar-rightIcon',
              'ms-auto shrink-0 me-[calc((var(--button-toggle-font-size)-var(--button-toggle-size))/2)]',
              classNames?.rightIcon,
            )}
            onClick={onRightIconClick}
            aria-label={rightIconLabel}
            icon={rightIcon}
          />
        )}
      </div>
    </header>
  );
}
export default AppBar;
