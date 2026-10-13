import React, { useEffect, useId, useRef, useState } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Input, { type InputProps, type InputHandle } from '../input/Input';
import defaults from './theme';

export type DropdownValue = string | number;
export interface DropdownItem {
  value: DropdownValue;
  label: React.ReactNode;
  disabled?: boolean;
}
export type DropdownTheme = Partial<typeof defaults>;
export type DropdownEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
export interface DropdownProps<T extends object = DropdownItem> extends Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus' | 'onKeyDown' | 'onClick' | 'theme'
> {
  allowBlank?: boolean;
  auto?: boolean;
  source: readonly (T | DropdownValue)[];
  labelKey?: keyof T;
  valueKey?: keyof T;
  value?: DropdownValue;
  template?: (item: T) => React.ReactNode;
  onChange?: (value: DropdownValue, event: DropdownEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement> | DropdownEvent) => void;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  theme?: DropdownTheme;
}
export function Dropdown<T extends object = DropdownItem>({
  allowBlank = true,
  auto = true,
  className = '',
  disabled = false,
  error,
  label,
  labelKey = 'label' as keyof T,
  valueKey = 'value' as keyof T,
  name,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onClick,
  required = false,
  source,
  template,
  theme: overrides,
  value,
  id: suppliedId,
  ref,
  ...others
}: DropdownProps<T>) {
  const theme = mergeTheme(defaults, overrides);
  const generatedId = useId();
  const id = suppliedId || `dropdown-${generatedId}`;
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<InputHandle>(null);
  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => input.current?.focus(),
      blur: () => input.current?.blur(),
      get inputElement() {
        return input.current?.inputElement ?? null;
      },
    }),
    [],
  );
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [up, setUp] = useState(false);
  const search = useRef({ text: '', time: 0 });
  const items = source.map((item) => {
    if (typeof item !== 'object')
      return {
        value: item,
        label: item,
        disabled: false,
        original: { [valueKey]: item, [labelKey]: item } as T,
      };
    const itemValue = item[valueKey];
    return {
      value: typeof itemValue === 'number' || typeof itemValue === 'string' ? itemValue : '',
      label: item[labelKey] as React.ReactNode,
      disabled: 'disabled' in item && Boolean(item.disabled),
      original: item,
    };
  });
  const selected =
    items.find((item) => item.value === value) ||
    (!allowBlank ? items.find((item) => !item.disabled) : undefined);
  useEffect(() => {
    if (disabled) setActive(false);
  }, [disabled]);
  useEffect(() => {
    if (!active) return;
    const outside = (event: Event) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setActive(false);
    };
    document.addEventListener('click', outside);
    document.addEventListener('touchend', outside);
    return () => {
      document.removeEventListener('click', outside);
      document.removeEventListener('touchend', outside);
    };
  }, [active]);
  useEffect(() => {
    if (active)
      root.current
        ?.querySelectorAll<HTMLElement>('[role="option"]')
        [activeIndex]?.scrollIntoView?.({ block: 'nearest' });
  }, [active, activeIndex]);
  const open = () => {
    if (active || disabled || !root.current) return;
    const rect = root.current.getBoundingClientRect();
    setUp(
      auto &&
        rect.top > (window.innerHeight || document.documentElement.offsetHeight) / 2 + rect.height,
    );
    const selectedIndex = items.findIndex(
      (item) => !item.disabled && selected && item.value === selected.value,
    );
    setActiveIndex(selectedIndex < 0 ? items.findIndex((item) => !item.disabled) : selectedIndex);
    setActive(true);
  };
  const select = (next: DropdownValue, event: DropdownEvent) => {
    if (disabled) return;
    onBlur?.(event);
    if (name) Object.assign(event.target, { name });
    onChange?.(next, event);
    setActive(false);
  };
  const click: React.MouseEventHandler<HTMLElement> = (event) => {
    open();
    event.preventDefault();
    event.stopPropagation();
    onClick?.(event);
  };
  const keyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;
    const available = items.flatMap((item, index) => (item.disabled ? [] : [index]));
    if (event.key === 'Escape') {
      if (active) {
        event.preventDefault();
        event.stopPropagation();
        setActive(false);
      }
    } else if (event.key === 'Tab') setActive(false);
    else if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      if (!active) {
        open();
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        const item = items[activeIndex];
        if (item && !item.disabled) select(item.value, event);
        return;
      }
      const current = available.indexOf(activeIndex);
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? available.length - 1
            : (current + (event.key === 'ArrowDown' ? 1 : -1) + available.length) %
              available.length;
      setActiveIndex(available[next] ?? -1);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
      const now = Date.now();
      search.current = {
        text: now - search.current.time < 500 ? search.current.text + event.key : event.key,
        time: now,
      };
      const index = items.findIndex(
        (item) =>
          !item.disabled &&
          String(item.label).toLowerCase().startsWith(search.current.text.toLowerCase()),
      );
      if (index >= 0) {
        open();
        setActiveIndex(index);
      }
    }
  };
  const combo = {
    id,
    role: 'combobox',
    'aria-label': others['aria-label'] || (typeof label === 'string' ? label : undefined),
    'aria-labelledby': others['aria-labelledby'],
    'aria-expanded': active,
    'aria-controls': `${id}-listbox`,
    'aria-haspopup': 'listbox',
    'aria-activedescendant': active && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined,
    'aria-disabled': disabled || undefined,
    'aria-required': required || undefined,
    'aria-invalid': error ? true : others['aria-invalid'],
    'aria-describedby':
      [others['aria-describedby'], error && `${id}-error`].filter(Boolean).join(' ') || undefined,
    onKeyDown: keyDown,
  } satisfies React.HTMLAttributes<HTMLElement>;
  return (
    <div
      data-react-toolbox="dropdown"
      ref={root}
      tabIndex={-1}
      className={classnames(
        theme.dropdown,
        {
          [theme.up]: up,
          [theme.active]: active,
          [theme.disabled]: disabled,
          [theme.required]: required,
        },
        className,
      )}
      onFocus={(event) => {
        event.stopPropagation();
        open();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && root.current?.contains(event.relatedTarget))
          return;
        event.stopPropagation();
        setActive(false);
        onBlur?.(event);
      }}
    >
      <Input
        {...others}
        {...(template && selected ? { id: `${id}-input` } : combo)}
        ref={input}
        tabIndex={0}
        disabled={disabled}
        className={theme.value}
        onClick={click}
        required={required}
        readOnly
        type={template && selected ? 'hidden' : 'text'}
        error={error}
        label={label}
        value={
          typeof selected?.label === 'string' || typeof selected?.label === 'number'
            ? selected.label
            : ''
        }
      />
      {template && selected ? (
        <div
          {...combo}
          tabIndex={disabled ? -1 : 0}
          onClick={click}
          className={classnames(theme.field, {
            [theme.errored]: error,
            [theme.disabled]: disabled,
            [theme.required]: required,
          })}
        >
          <div className={`${theme.templateValue} ${theme.value}`}>
            {template(selected.original)}
          </div>
          {label ? (
            <label className={theme.label}>
              {label}
              {required ? <span className={theme.required}> * </span> : null}
            </label>
          ) : null}
          {error ? (
            <span id={`${id}-error`} className={theme.error}>
              {error}
            </span>
          ) : null}
        </div>
      ) : null}
      {name ? (
        <input type="hidden" name={name} disabled={disabled} value={selected?.value ?? ''} />
      ) : null}
      <ul
        id={`${id}-listbox`}
        role="listbox"
        aria-label={typeof label === 'string' ? label : undefined}
        aria-hidden={!active}
        className={theme.values}
      >
        {items.map((item, index) => (
          <li
            key={index}
            id={`${id}-option-${index}`}
            role="option"
            aria-selected={item.value === value}
            aria-disabled={item.disabled || undefined}
            data-active={(active && index === activeIndex) || undefined}
            className={classnames({
              [theme.selected]: item.value === value,
              [theme.disabled]: item.disabled,
            })}
            onMouseDown={(event) => event.preventDefault()}
            onClick={item.disabled ? undefined : (event) => select(item.value, event)}
          >
            {template ? template(item.original) : item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Dropdown;
