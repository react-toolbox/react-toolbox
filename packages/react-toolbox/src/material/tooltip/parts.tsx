'use client';
import * as Primitive from '@radix-ui/react-tooltip';
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type ComponentProps,
} from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';

const ProviderContext = createContext(false);
const TouchContext = createContext<{ setOpen: (open: boolean) => void; delay: number; duration: number } | null>(null);
export type TooltipProviderProps = ComponentProps<typeof Primitive.Provider>;
export function TooltipProvider({ children, ...props }: TooltipProviderProps) {
  return (
    <ProviderContext value={true}>
      <Primitive.Provider {...props}>{children}</Primitive.Provider>
    </ProviderContext>
  );
}
export type TooltipRootProps = ComponentProps<typeof Primitive.Root> & {
  /** Long-press delay in milliseconds. */
  touchDelay?: number;
  /** Time to remain visible after releasing a long press. */
  touchDuration?: number;
};
export function TooltipRoot({
  children,
  open: controlled,
  defaultOpen = false,
  onOpenChange,
  touchDelay = 500,
  touchDuration = 1500,
  ...props
}: TooltipRootProps) {
  const provider = useContext(ProviderContext);
  const [internal, setInternal] = useState(defaultOpen);
  const setOpen = useCallback(
    (open: boolean) => {
      if (controlled === undefined) setInternal(open);
      onOpenChange?.(open);
    },
    [controlled, onOpenChange],
  );
  const touch = useMemo(
    () => ({ setOpen, delay: touchDelay, duration: touchDuration }),
    [setOpen, touchDelay, touchDuration],
  );
  const content = (
    <TouchContext value={touch}>
      <Primitive.Root {...props} open={controlled ?? internal} onOpenChange={setOpen}>
        {children}
      </Primitive.Root>
    </TouchContext>
  );
  return provider ? content : <TooltipProvider>{content}</TooltipProvider>;
}
export type TooltipTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export function TooltipTrigger({
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClickCapture,
  onContextMenu,
  ...props
}: TooltipTriggerProps) {
  const touch = useContext(TouchContext);
  const state = useRef<{
    timer?: ReturnType<typeof setTimeout>;
    release?: ReturnType<typeof setTimeout>;
    x: number;
    y: number;
    held: boolean;
  }>({ x: 0, y: 0, held: false });
  const cancel = useCallback(() => {
    clearTimeout(state.current.timer);
    clearTimeout(state.current.release);
    state.current.timer = undefined;
    state.current.release = undefined;
  }, []);
  const touchRef = useRef(touch);
  touchRef.current = touch;
  useEffect(() => {
    const scroll = () => {
      if (state.current.timer || state.current.held) {
        cancel();
        touchRef.current?.setOpen(false);
        state.current.held = false;
      }
    };
    window.addEventListener('scroll', scroll, true);
    return () => {
      cancel();
      window.removeEventListener('scroll', scroll, true);
    };
  }, [cancel]);
  return (
    <Primitive.Trigger
      data-slot="TooltipTrigger"
      {...props}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || event.pointerType !== 'touch' || !touch) return;
        cancel();
        state.current = {
          x: event.clientX,
          y: event.clientY,
          held: false,
          timer: setTimeout(() => {
            state.current.timer = undefined;
            state.current.held = true;
            touch.setOpen(true);
          }, touch.delay),
        };
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (
          event.pointerType === 'touch' &&
          Math.hypot(event.clientX - state.current.x, event.clientY - state.current.y) > 10
        ) {
          cancel();
          if (state.current.held) touch?.setOpen(false);
          state.current.held = false;
        }
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        cancel();
        if (state.current.held)
          state.current.release = setTimeout(() => {
            touch?.setOpen(false);
            state.current.held = false;
          }, touch?.duration);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        cancel();
        if (state.current.held) touch?.setOpen(false);
        state.current.held = false;
      }}
      onContextMenu={(event) => {
        onContextMenu?.(event);
        if (state.current.timer || state.current.held) event.preventDefault();
      }}
      onClickCapture={(event) => {
        onClickCapture?.(event);
        if (state.current.held) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    />
  );
}
export type TooltipPortalProps = ComponentProps<typeof Primitive.Portal>;
export function TooltipPortal(props: TooltipPortalProps) {
  return <Primitive.Portal {...props} />;
}
export type TooltipContentProps = ComponentProps<typeof Primitive.Content>;
export function TooltipContent({ className, style, ...props }: TooltipContentProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Content
      side="bottom"
      sideOffset={14}
      collisionPadding={8}
      data-slot="TooltipContent"
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        'box-border z-500 max-w-[calc(100vw-32px)] rounded-[2px] bg-(--tooltip-background) px-[8px] py-[4px] font-(family-name:--preferred-font) text-[10px] leading-[14px] font-medium text-(--tooltip-color) shadow-none data-[state=delayed-open]:animate-[toolbox-enter_var(--tooltip-animation-duration)_var(--animation-curve-default)] data-[state=instant-open]:animate-[toolbox-enter_var(--tooltip-animation-duration)_var(--animation-curve-default)] data-[state=closed]:animate-[toolbox-exit_var(--tooltip-animation-duration)_var(--animation-curve-default)] [@media(pointer:coarse)]:px-[16px] [@media(pointer:coarse)]:py-[8px] [@media(pointer:coarse)]:text-[14px] [@media(pointer:coarse)]:leading-[16px] motion-reduce:animate-none!',
        className,
      )}
    />
  );
}
