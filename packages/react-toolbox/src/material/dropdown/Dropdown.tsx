'use client';
import './tokens.css';
import '../input/tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { DropdownTheme } from './types';

import React, { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import Input, { type InputProps, type InputHandle } from '../input/Input';
import useFormReset from '../foundations/forms/useFormReset';

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
  group?: string;
  textValue?: string;
}
export type { DropdownTheme, DropdownClassNames } from './types';
export type DropdownEvent =
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.ChangeEvent<HTMLSelectElement>;
export interface DropdownProps<T extends object = DropdownItem>
  extends Omit<
    InputProps,
    'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus' | 'onKeyDown' | 'onClick' | 'theme'
  > {
  allowBlank?: boolean;
  auto?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  groupKey?: keyof T;
  textKey?: keyof T;
  source: readonly (T | DropdownValue)[];
  labelKey?: keyof T;
  valueKey?: keyof T;
  value?: DropdownValue;
  defaultValue?: DropdownValue;
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
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  groupKey = 'group' as keyof T,
  textKey = 'textValue' as keyof T,
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
  value: controlledValue,
  defaultValue,
  id: suppliedId,
  ref,
  ...others
}: DropdownProps<T>) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const generatedId = useId();
  const id = suppliedId || `dropdown-${generatedId}`;
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<InputHandle>(null);
  const native = useRef<HTMLSelectElement>(null);
  const [internalValue, setValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const [validationMessage, setValidationMessage] = useState('');
  const fieldError = error || validationMessage;
  useFormReset(native, () => {
    if (controlledValue === undefined) setValue(defaultValue);
    const resetValue = controlledValue ?? defaultValue;
    const resetSelection =
      items.find((item) => item.value === resetValue) ||
      (!allowBlank ? items.find((item) => !item.disabled) : undefined);
    if (native.current) native.current.value = String(resetSelection?.value ?? '');
    setValidationMessage('');
    setActive(false);
  });
  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => root.current?.querySelector<HTMLElement>('[role="combobox"]')?.focus(),
      blur: () => root.current?.querySelector<HTMLElement>('[role="combobox"]')?.blur(),
      get inputElement() {
        return input.current?.inputElement ?? null;
      },
    }),
    [],
  );
  const [internalOpen, setOpen] = useState(defaultOpen);
  const active = !disabled && (controlledOpen ?? internalOpen);
  const setActive = (next: boolean) => {
    if (controlledOpen === undefined) setOpen(next);
    if (next !== active) onOpenChange?.(next);
  };
  const [activeIndex, setActiveIndex] = useState(-1);
  const [up, setUp] = useState(false);
  const search = useRef({ text: '', time: 0 });
  const openingIndex = useRef<number | null>(null);
  const items = source.map((item) => {
    if (typeof item !== 'object')
      return {
        value: item,
        label: item,
        disabled: false,
        group: undefined,
        text: String(item),
        original: { [valueKey]: item, [labelKey]: item } as T,
      };
    const itemValue = item[valueKey];
    return {
      value: typeof itemValue === 'number' || typeof itemValue === 'string' ? itemValue : '',
      label: item[labelKey] as React.ReactNode,
      text: String(
        item[textKey] ??
          (typeof item[labelKey] === 'string' || typeof item[labelKey] === 'number' ? item[labelKey] : itemValue),
      ),
      group: typeof item[groupKey] === 'string' ? (item[groupKey] as string) : undefined,
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
  }, [active, controlledOpen, onOpenChange]);
  useEffect(() => {
    if (active)
      root.current
        ?.querySelectorAll<HTMLElement>('[role="option"]')
        [activeIndex]?.scrollIntoView?.({ block: 'nearest' });
  }, [active, activeIndex]);
  useEffect(() => {
    if (!active || !root.current) return;
    const rect = root.current.getBoundingClientRect();
    setUp(auto && rect.top > (window.innerHeight || document.documentElement.offsetHeight) / 2 + rect.height);
    const selectedIndex = items.findIndex((item) => !item.disabled && selected && item.value === selected.value);
    setActiveIndex(
      openingIndex.current ?? (selectedIndex < 0 ? items.findIndex((item) => !item.disabled) : selectedIndex),
    );
    openingIndex.current = null;
  }, [active]);
  const open = () => {
    if (!active && !disabled) setActive(true);
  };
  const select = (next: DropdownValue, event: DropdownEvent) => {
    if (disabled) return;
    onBlur?.(event);
    if (name) Object.assign(event.target, { name });
    if (controlledValue === undefined) setValue(next);
    setValidationMessage('');
    onChange?.(next, event);
    setActive(false);
  };
  const click: React.MouseEventHandler<HTMLElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    open();
    event.preventDefault();
    event.stopPropagation();
  };
  const keyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled || event.nativeEvent.isComposing) return;
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
        (item) => !item.disabled && item.text.toLowerCase().startsWith(search.current.text.toLowerCase()),
      );
      if (index >= 0) {
        if (!active) openingIndex.current = index;
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
    'aria-invalid': fieldError ? true : others['aria-invalid'],
    'aria-describedby':
      [others['aria-describedby'], fieldError && `${id}-error`].filter(Boolean).join(' ') || undefined,
    onKeyDown: keyDown,
  } satisfies React.HTMLAttributes<HTMLElement>;
  const renderOption = (item: (typeof items)[number], index: number) => (
    <li
      key={index}
      id={`${id}-option-${index}`}
      role="option"
      aria-selected={item.value === selected?.value}
      aria-disabled={item.disabled || undefined}
      data-active={(active && index === activeIndex) || undefined}
      className={cn(
        item.value === selected?.value &&
          cn(
            'rt-dropdown-selected',
            '[.rt-dropdown-values>*&]:text-(--dropdown-color-primary)',
            item.group && '[&&]:text-(--dropdown-color-primary)',
            theme?.selected,
          ),
        item.disabled &&
          cn(
            disabledClasses,
            item.group && '[&&]:text-(--dropdown-color-disabled) [&&]:cursor-not-allowed',
            theme?.disabled,
          ),
      )}
      onMouseDown={(event) => event.preventDefault()}
      onClick={item.disabled ? undefined : (event) => select(item.value, event)}
    >
      {template ? template(item.original) : item.label}
    </li>
  );
  const groups = new Map<string | undefined, number[]>();
  items.forEach((item, index) => groups.set(item.group, [...(groups.get(item.group) ?? []), index]));
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
        error={template && selected ? undefined : fieldError}
        label={label}
        value={selected?.text ?? ''}
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
            Boolean(fieldError) && cn('rt-dropdown-errored', '[.rt-dropdown-field&]:pb-0', theme?.errored),
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
          {fieldError ? (
            <span
              id={`${id}-error`}
              className={cn(
                'rt-dropdown-error',
                'text-(--input-text-error-color) text-(length:--input-label-font-size) leading-(--input-underline-height) mb-[calc(-1_*_var(--input-underline-height))]',
                theme?.error,
              )}
            >
              {fieldError}
            </span>
          ) : null}
        </div>
      ) : null}
      <select
        ref={native}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        form={others.form}
        disabled={disabled}
        required={required}
        value={selected?.value ?? ''}
        onChange={(event) => {
          const item = items[event.currentTarget.selectedIndex - 1];
          if (item && !item.disabled) select(item.value, event);
        }}
        onInvalid={(event) => {
          event.preventDefault();
          setValidationMessage(event.currentTarget.validationMessage);
          root.current?.querySelector<HTMLElement>('[role="combobox"]')?.focus();
        }}
      >
        <option value="" />
        {items.map((item, index) => (
          <option key={index} value={item.value} disabled={item.disabled}>
            {item.text}
          </option>
        ))}
      </select>
      <ul
        id={`${id}-listbox`}
        role="listbox"
        aria-label={typeof label === 'string' ? label : undefined}
        aria-hidden={!active}
        className={cn(
          'rt-dropdown-values',
          'bg-(--dropdown-color-white) text-(length:--input-field-font-size) rounded-(--dropdown-value-border-radius) [list-style:none] m-0 overflow-y-auto p-0 absolute [transition-duration:var(--animation-duration)] [transition-property:max-height,box-shadow] [transition-timing-function:var(--animation-curve-default)] w-full z-(--z-index-high)',
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
        {[...groups].map(([group, entries], groupIndex) =>
          group ? (
            <li
              role="group"
              aria-labelledby={`${id}-group-${groupIndex}`}
              key={group}
              className="[&&]:p-0 [&&]:cursor-default [&&]:bg-transparent"
            >
              <div id={`${id}-group-${groupIndex}`} className="text-(--rt-color-text-secondary) text-sm p-(--unit)">
                {group}
              </div>
              <ul
                role="presentation"
                className="list-none m-0 p-0 [&>*]:p-(--unit) [&>*]:cursor-pointer [&>*:hover:not(.rt-dropdown-disabled)]:bg-(--dropdown-value-hover-background) [&>*[data-active='true']:not(.rt-dropdown-disabled)]:bg-(--dropdown-value-hover-background)"
              >
                {entries.map((index) => renderOption(items[index], index))}
              </ul>
            </li>
          ) : (
            entries.map((index) => renderOption(items[index], index))
          ),
        )}
      </ul>
    </div>
  );
}
export default Dropdown;
