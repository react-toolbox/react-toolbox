'use client';

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  type SyntheticEvent,
  type TouchEvent,
} from 'react';
import classnames from 'classnames';
import Input, { type InputHandle } from '../input';
import ProgressBar from '../progress_bar';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';

export type SliderTheme = Partial<typeof defaultTheme>;
export interface SliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'onDragStart'
> {
  buffer?: number;
  disabled?: boolean;
  editable?: boolean;
  max?: number;
  min?: number;
  onChange?: (
    value: number,
    event?: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onDragStart?: () => void;
  onDragStop?: () => void;
  pinned?: boolean;
  snaps?: boolean;
  step?: number;
  theme?: SliderTheme;
  value?: number;
  ref?: Ref<HTMLDivElement>;
}
const decimalPlaces = (number: number) => {
  const [coefficient, exponent = '0'] = number.toString().split('e');
  return Math.max(0, (coefficient.split('.')[1] || '').length - Number(exponent));
};

export function Slider({
  buffer = 0,
  className = '',
  disabled = false,
  editable = false,
  max = 100,
  min = 0,
  onChange,
  onDragStart,
  onDragStop,
  onKeyDown,
  onMouseDown,
  onTouchStart,
  pinned = false,
  snaps = false,
  step = 0.01,
  style,
  tabIndex,
  theme: suppliedTheme,
  value = 0,
  ref,
  ...other
}: SliderProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  const container = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const input = useRef<InputHandle>(null);
  const cancelled = useRef(false);
  const drag = useRef<{ start: number; length: number; touch: boolean } | null>(null);
  const [pressed, setPressed] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const stepSize = Number.isFinite(step) && step > 0 ? step : 1;
  const decimals = Math.min(
    20,
    Math.max(decimalPlaces(stepSize), decimalPlaces(min), decimalPlaces(max)),
  );
  const forInput = (number: number) =>
    decimals > 0 ? number.toFixed(decimals) : number.toString();
  function trim(number: number) {
    if (!Number.isFinite(number) || number <= min) return min;
    if (number >= max) return max;
    const precision = 10 ** decimals;
    return Math.round(number * precision) / precision;
  }
  useEffect(() => {
    setInputValue((current) =>
      current === null ? null : decimals > 0 ? value.toFixed(decimals) : value.toString(),
    );
  }, [value, decimals]);

  function positionToValue(x: number) {
    const bounds = drag.current;
    if (!bounds || bounds.length <= 0 || max <= min) return trim(value);
    if (x <= bounds.start) return min;
    if (x >= bounds.start + bounds.length) return max;
    return trim(
      Math.round((((x - bounds.start) / bounds.length) * (max - min)) / stepSize) * stepSize + min,
    );
  }
  function end() {
    if (!drag.current) return;
    drag.current = null;
    setPressed(false);
    onDragStop?.();
  }
  useEffect(() => {
    if (disabled) {
      container.current?.blur();
      end();
    }
  }, [disabled]);
  useEffect(() => {
    if (!pressed || disabled) return;
    function move(x: number) {
      const next = positionToValue(x);
      if (next !== value) onChange?.(next);
    }
    const mouseMove = (event: globalThis.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      move(event.clientX);
    };
    const touchMove = (event: globalThis.TouchEvent) => {
      if (event.cancelable) event.preventDefault();
      if (event.touches[0]) move(event.touches[0].pageX - window.scrollX);
    };
    if (drag.current?.touch) {
      document.addEventListener('touchmove', touchMove, { passive: false });
      document.addEventListener('touchend', end);
      document.addEventListener('touchcancel', end);
    } else {
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', end);
    }
    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', end);
      document.removeEventListener('touchmove', touchMove);
      document.removeEventListener('touchend', end);
      document.removeEventListener('touchcancel', end);
    };
  }, [pressed, disabled, value, min, max, stepSize, decimals, onChange, onDragStop]);

  function start(x: number, touch: boolean) {
    if (!container.current || !knob.current) return;
    if (inputValue !== null) input.current?.blur();
    const { left, width } = container.current.getBoundingClientRect();
    drag.current = {
      start: left + knob.current.getBoundingClientRect().width / 2,
      length: width,
      touch,
    };
    setPressed(true);
    onDragStart?.();
    onChange?.(positionToValue(x));
  }
  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    onMouseDown?.(event);
    if (disabled || event.defaultPrevented || event.button !== 0) return;
    container.current?.focus({ preventScroll: true });
    start(event.clientX, false);
    event.preventDefault();
    event.stopPropagation();
  }
  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    onTouchStart?.(event);
    if (disabled || event.defaultPrevented || !event.touches[0]) return;
    start(event.touches[0].pageX - window.scrollX, true);
    event.preventDefault();
    event.stopPropagation();
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (disabled || event.defaultPrevented) return;
    const key = event.key || event.code;
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;
    event.preventDefault();
    const position = (value - min) / stepSize;
    const stop =
      key === 'ArrowUp' || key === 'ArrowRight'
        ? Math.floor(position + 1e-9) + 1
        : Math.ceil(position - 1e-9) - 1;
    const next = key === 'Home' ? min : key === 'End' ? max : trim(min + stop * stepSize);
    if (next !== value) onChange?.(next);
  }
  const span = max - min;
  const count = span > 0 ? Math.ceil(span / stepSize) : 0;
  const stride = Math.max(1, Math.ceil(count / 1000));
  const stops =
    snaps && span > 0
      ? [
          ...Array.from({ length: Math.ceil(count / stride) }, (_, i) => i * stride * stepSize),
          span,
        ]
      : [];
  return (
    <div
      className={classnames(
        theme.slider,
        {
          [theme.editable]: editable,
          [theme.pinned]: pinned,
          [theme.pressed]: pressed,
          [theme.ring]: value === min,
        },
        className,
      )}
      {...{ disabled }}
      data-react-toolbox="slider"
      style={style}
      ref={ref}
    >
      <div
        {...other}
        ref={container}
        role="slider"
        aria-orientation="horizontal"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={trim(value)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : (tabIndex ?? 0)}
        className={theme.container}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          ref={knob}
          className={theme.knob}
          style={{ left: `${span > 0 ? (100 * (trim(value) - min)) / span : 0}%` }}
        >
          <div className={theme.innerknob} data-value={trim(value)} />
        </div>
        <div className={theme.progress}>
          <ProgressBar
            aria-hidden="true"
            disabled={disabled}
            className={theme.innerprogress}
            max={max}
            min={min}
            mode="determinate"
            value={value}
            buffer={buffer}
          />
          {stops.length > 0 && (
            <div className={theme.snaps}>
              {stops.map((stop) => (
                <div
                  key={stop}
                  className={theme.snap}
                  style={{ left: `${(100 * stop) / span}%` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {editable && (
        <Input
          ref={input}
          className={theme.input}
          disabled={disabled}
          aria-label={other['aria-label'] ? `${other['aria-label']} value` : undefined}
          aria-labelledby={other['aria-labelledby']}
          inputMode="decimal"
          onFocus={() => setInputValue(forInput(value))}
          onChange={setInputValue}
          onBlur={(event) => {
            const parsed = parseFloat(inputValue ?? '');
            setInputValue(null);
            if (!cancelled.current)
              onChange?.(trim(Number.isFinite(parsed) ? parsed : value), event);
            cancelled.current = false;
          }}
          onKeyDown={(event) => {
            const key = event.key || event.code;
            if (key === 'Escape') cancelled.current = true;
            if (key === 'Enter' || key === 'Escape') {
              event.preventDefault();
              input.current?.blur();
            }
          }}
          value={inputValue ?? forInput(value)}
        />
      )}
    </div>
  );
}
export default Slider;
