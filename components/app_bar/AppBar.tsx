'use client';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import classnames from 'classnames';
import { IconButton } from '../button';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export type AppBarTheme = Partial<typeof defaultTheme>;
export interface AppBarProps extends Omit<ComponentPropsWithRef<'header'>, 'title'> {
  fixed?: boolean;
  flat?: boolean;
  leftIcon?: ReactNode;
  onLeftIconClick?: ComponentPropsWithRef<'button'>['onClick'];
  onRightIconClick?: ComponentPropsWithRef<'button'>['onClick'];
  rightIcon?: ReactNode;
  scrollHide?: boolean;
  theme?: AppBarTheme;
  title?: ReactNode;
}
export function AppBar({
  children,
  className = '',
  fixed = false,
  flat = false,
  leftIcon,
  onLeftIconClick,
  onRightIconClick,
  rightIcon,
  scrollHide = false,
  theme: suppliedTheme,
  title,
  ref,
  ...other
}: AppBarProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
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
      setHidden(current > previous && current > height);
      previous = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollHide]);
  return (
    <header
      {...other}
      ref={attach}
      data-react-toolbox="app-bar"
      className={classnames(
        theme.appBar,
        { [theme.fixed]: fixed, [theme.flat]: flat, [theme.scrollHide]: hidden },
        className,
      )}
    >
      <div className={theme.inner}>
        {leftIcon && (
          <IconButton
            inverse
            className={theme.leftIcon}
            onClick={onLeftIconClick}
            icon={leftIcon}
          />
        )}
        {typeof title === 'string' ? <h1 className={theme.title}>{title}</h1> : title}
        {children}
        {rightIcon && (
          <IconButton
            inverse
            className={theme.rightIcon}
            onClick={onRightIconClick}
            icon={rightIcon}
          />
        )}
      </div>
    </header>
  );
}
export default AppBar;
