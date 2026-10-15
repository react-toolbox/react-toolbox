'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { DropdownTheme } from './types';

import React, { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import Input, { type InputProps, type InputHandle } from '../input/Input';

const disabledClasses = [
  'rt-dropdown-disabled',
  '[.rt-dropdown-values>*&]:text-(--dropdown-color-disabled) [.rt-dropdown-values>*&]:cursor-not-allowed',
  '[.rt-dropdown-dropdown&]:cursor-[normal] [.rt-dropdown-dropdown&]:pointer-events-none',
  '[.rt-dropdown-field&]:cursor-[normal] [.rt-dropdown-field&]:pointer-events-none',
].join(' ');

const requiredClasses = [
  'rt-dropdown-required',
  '[.rt-dropdown-label_&]:text-(--input-text-error-color)',
  '[.rt-dropdown-field.rt-dropdown-errored>.rt-dropdown-label>&]:text-(--input-text-error-color)',
].join(' ');

const valueClasses = [
  'rt-dropdown-value',
  '[&>input]:cursor-pointer',
  "[&::after]:[border-left:var(--dropdown-value-border-size)_solid_transparent] [&::after]:[border-right:var(--dropdown-value-border-size)_solid_transparent] [&::after]:[border-top:var(--dropdown-value-border-size)_solid_var(--input-chevron-color)] [&::after]:[content:''] [&::after]:h-0 [&::after]:pointer-events-none [&::after]:absolute [&::after]:right-(--input-chevron-offset) [&::after]:top-[50%] [&::after]:[transition:transform_var(--animation-duration)_var(--animation-curve-default)] [&::after]:w-0",
  '[.rt-dropdown-dropdown:focus-within:not(.rt-dropdown-disabled)_&::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_87%)]',
  '[.rt-dropdown-disabled_&::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_38%)]',
  '[.rt-dropdown-dropdown.rt-dropdown-active>&]:opacity-[0.5]',
].join(' ');

export type DropdownValue = string | number;
export interface DropdownItem {
  value: DropdownValue;
  label: React.ReactNode;
  disabled?: boolean;
}
export type { DropdownTheme, DropdownClassNames } from './types';
export type DropdownEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
export interface DropdownProps<T extends object = DropdownItem>
  extends Omit<
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
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DropdownTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
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
  theme: legacyTheme,
  classNames,
  value,
  id: suppliedId,
  ref,
  ...others
}: DropdownProps<T>) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
    items.find((item) => item.value === value) || (!allowBlank ? items.find((item) => !item.disabled) : undefined);
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
    setUp(auto && rect.top > (window.innerHeight || document.documentElement.offsetHeight) / 2 + rect.height);
    const selectedIndex = items.findIndex((item) => !item.disabled && selected && item.value === selected.value);
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
            : (current + (event.key === 'ArrowDown' ? 1 : -1) + available.length) % available.length;
      setActiveIndex(available[next] ?? -1);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
      const now = Date.now();
      search.current = {
        text: now - search.current.time < 500 ? search.current.text + event.key : event.key,
        time: now,
      };
      const index = items.findIndex(
        (item) => !item.disabled && String(item.label).toLowerCase().startsWith(search.current.text.toLowerCase()),
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
    'aria-describedby': [others['aria-describedby'], error && `${id}-error`].filter(Boolean).join(' ') || undefined,
    onKeyDown: keyDown,
  } satisfies React.HTMLAttributes<HTMLElement>;
  return (
    <div
      data-react-toolbox="dropdown"
      ref={root}
      tabIndex={-1}
      className={cn(
        'rt-dropdown-dropdown',
        'relative',
        materialRoot,
        materialDescendants,
        theme?.dropdown,
        up && cn('rt-dropdown-up', theme?.up),
        active && cn('rt-dropdown-active', theme?.active),
        disabled && cn(disabledClasses, theme?.disabled),
        required && cn(requiredClasses, theme?.required),
        className,
      )}
      onFocus={(event) => {
        event.stopPropagation();
        open();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && root.current?.contains(event.relatedTarget)) return;
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
        className={cn(valueClasses, theme?.value)}
        onClick={click}
        required={required}
        readOnly
        type={template && selected ? 'hidden' : 'text'}
        error={error}
        label={label}
        value={typeof selected?.label === 'string' || typeof selected?.label === 'number' ? selected.label : ''}
      />
      {template && selected ? (
        <div
          {...combo}
          tabIndex={disabled ? -1 : 0}
          onClick={click}
          className={cn(
            'rt-dropdown-field',
            'cursor-pointer p-[var(--input-padding)_0] relative',
            '[&:focus-visible]:[outline:2px_solid_var(--input-text-highlight-color)] [&:focus-visible]:-outline-offset-2',
            theme?.field,
            Boolean(error) && cn('rt-dropdown-errored', '[.rt-dropdown-field&]:pb-0', theme?.errored),
            disabled && cn(disabledClasses, theme?.disabled),
            required && cn(requiredClasses, theme?.required),
          )}
        >
          <div
            className={`${cn(
              'rt-dropdown-templateValue',
              'bg-(--input-text-background-color) [border-bottom:1px_solid_var(--input-text-bottom-border-color)] text-(--rt-color-text) min-h-(--input-field-height) p-[var(--input-field-padding)_0] relative',
              '[.rt-dropdown-field.rt-dropdown-errored>&]:[border-bottom:2px_solid_var(--input-text-error-color)]',
              '[.rt-dropdown-field.rt-dropdown-disabled>&]:[border-bottom-style:dotted] [.rt-dropdown-field.rt-dropdown-disabled>&]:text-(--input-text-disabled-text-color)',
              theme?.templateValue,
            )} ${cn(valueClasses, theme?.value)}`}
          >
            {template(selected.original)}
          </div>
          {label ? (
            <label
              className={cn(
                'rt-dropdown-label',
                'text-(--input-text-label-color) text-(length:--input-label-font-size) left-0 leading-(--input-field-font-size) absolute top-(--input-focus-label-top)',
                '[.rt-dropdown-dropdown.rt-dropdown-active>&]:opacity-[0.5]',
                '[.rt-dropdown-field.rt-dropdown-errored>&]:text-(--input-text-error-color)',
                theme?.label,
              )}
            >
              {label}
              {required ? <span className={cn(requiredClasses, theme?.required)}> * </span> : null}
            </label>
          ) : null}
          {error ? (
            <span
              id={`${id}-error`}
              className={cn(
                'rt-dropdown-error',
                'text-(--input-text-error-color) text-(length:--input-label-font-size) leading-(--input-underline-height) mb-[calc(-1_*_var(--input-underline-height))]',
                theme?.error,
              )}
            >
              {error}
            </span>
          ) : null}
        </div>
      ) : null}
      {name ? <input type="hidden" name={name} disabled={disabled} value={selected?.value ?? ''} /> : null}
      <ul
        id={`${id}-listbox`}
        role="listbox"
        aria-label={typeof label === 'string' ? label : undefined}
        aria-hidden={!active}
        className={cn(
          'rt-dropdown-values',
          'bg-(--dropdown-color-white) rounded-(--dropdown-value-border-radius) [list-style:none] m-0 overflow-y-auto p-0 absolute [transition-duration:var(--animation-duration)] [transition-property:max-height,box-shadow] [transition-timing-function:var(--animation-curve-default)] w-full z-(--z-index-high)',
          '[&>*]:cursor-pointer [&>*]:overflow-hidden [&>*]:p-(--unit) [&>*]:relative',
          '[&>*:hover:not(.rt-dropdown-disabled)]:bg-(--dropdown-value-hover-background)',
          "[&>*[data-active='true']:not(.rt-dropdown-disabled)]:bg-(--dropdown-value-hover-background)",
          '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
          '[.rt-dropdown-dropdown:not(.rt-dropdown-active)>&]:max-h-0 [.rt-dropdown-dropdown:not(.rt-dropdown-active)>&]:invisible',
          '[.rt-dropdown-dropdown.rt-dropdown-active>&]:[box-shadow:var(--zdepth-shadow-1)] [.rt-dropdown-dropdown.rt-dropdown-active>&]:max-h-(--dropdown-overflow-max-height) [.rt-dropdown-dropdown.rt-dropdown-active>&]:visible',
          '[.rt-dropdown-dropdown:not(.rt-dropdown-up)>&]:bottom-auto [.rt-dropdown-dropdown:not(.rt-dropdown-up)>&]:top-0',
          '[.rt-dropdown-dropdown.rt-dropdown-up>&]:bottom-0 [.rt-dropdown-dropdown.rt-dropdown-up>&]:top-auto',
          theme?.values,
        )}
      >
        {items.map((item, index) => (
          <li
            key={index}
            id={`${id}-option-${index}`}
            role="option"
            aria-selected={item.value === value}
            aria-disabled={item.disabled || undefined}
            data-active={(active && index === activeIndex) || undefined}
            className={cn(
              item.value === value &&
                cn('rt-dropdown-selected', '[.rt-dropdown-values>*&]:text-(--dropdown-color-primary)', theme?.selected),
              item.disabled && cn(disabledClasses, theme?.disabled),
            )}
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
