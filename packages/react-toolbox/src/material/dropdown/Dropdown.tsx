'use client';
import './tokens.css';
import '../input/tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import React, { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import Input, { type InputProps, type InputHandle, type InputElement } from '../input/Input';
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  DropdownViewport,
  DropdownOption,
  DropdownOptionText,
  DropdownGroup,
  DropdownLabel,
} from './parts';
import useFormReset from '../foundations/forms/useFormReset';

const disabledClasses = [
  'rt-dropdown-disabled',
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
  '[&>input]:cursor-pointer [&>input]:pe-[calc(2*var(--input-chevron-offset)+2*var(--dropdown-value-border-size))]',
  "[&::after]:[border-left:var(--dropdown-value-border-size)_solid_transparent] [&::after]:[border-right:var(--dropdown-value-border-size)_solid_transparent] [&::after]:[border-top:var(--dropdown-value-border-size)_solid_var(--input-chevron-color)] [&::after]:[content:''] [&::after]:h-0 [&::after]:pointer-events-none [&::after]:absolute [&::after]:inset-e-(--input-chevron-offset) [&::after]:top-[50%] [&::after]:[transition:transform_var(--animation-duration)_var(--animation-curve-default)] [&::after]:w-0",
  '[.rt-dropdown-dropdown:focus-within:not(.rt-dropdown-disabled)_&::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_87%)]',
  '[.rt-dropdown-disabled_&::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_38%)]',
].join(' ');

/** Radix needs the native trigger element, while Input exposes its public handle. */
function DropdownInputTrigger({
  ref,
  inputRef,
  className: _className,
  rootClassName,
  ...props
}: Omit<InputProps, 'ref'> & {
  ref?: React.Ref<InputElement>;
  inputRef: React.RefObject<InputHandle | null>;
  rootClassName?: string;
}) {
  React.useImperativeHandle(ref, () => inputRef.current!.inputElement!, [inputRef]);
  return <Input {...props} ref={inputRef} type="text" readOnly className={rootClassName} />;
}

export type DropdownValue = string | number;
export interface DropdownItem {
  value: DropdownValue;
  label: React.ReactNode;
  disabled?: boolean;
  group?: string;
  textValue?: string;
}
export type DropdownEvent =
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.ChangeEvent<HTMLSelectElement>;
export interface DropdownProps<T extends object = DropdownItem>
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus' | 'onKeyDown' | 'onClick'> {
  allowBlank?: boolean;
  /** Keep the selected value focusable and submitted while preventing edits and validation. */
  readOnly?: boolean;
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
  readOnly = false,
  source,
  template,
  value: controlledValue,
  defaultValue,
  id: suppliedId,
  ref,
  ...others
}: DropdownProps<T>) {
  const generatedId = useId();
  const id = suppliedId || `dropdown-${generatedId}`;
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const restoreTriggerFocus = useRef(false);
  const setTrigger = React.useCallback((node: HTMLElement | null) => {
    /** A first template selection replaces the Input trigger with the template field. */
    if (!node) restoreTriggerFocus.current = trigger.current === document.activeElement;
    trigger.current = node;
    if (node && restoreTriggerFocus.current) {
      restoreTriggerFocus.current = false;
      node.focus();
    }
  }, []);
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
      focus: () => trigger.current?.focus(),
      blur: () => trigger.current?.blur(),
      get inputElement() {
        return input.current?.inputElement ?? null;
      },
    }),
    [],
  );
  const [internalOpen, setOpen] = useState(defaultOpen);
  const active = !disabled && !readOnly && (controlledOpen ?? internalOpen);
  const setActive = (next: boolean) => {
    if (next && (disabled || readOnly)) return;
    if (controlledOpen === undefined) setOpen(next);
    if (next !== active) onOpenChange?.(next);
  };
  const content = useRef<HTMLDivElement>(null);
  const isWithinDropdown = (target: EventTarget | null) =>
    target instanceof Node && (root.current?.contains(target) || content.current?.contains(target));
  const selectionEvent = useRef<DropdownEvent | null>(null);
  const [placement, setPlacement] = useState({ up: false, sideOffset: 0 });
  const { up } = placement;
  /** Radix reports a value only; preserve the initiating event, not native reset notifications. */
  const captureSelection = (event: DropdownEvent) => {
    selectionEvent.current = event;
    queueMicrotask(() => {
      if (selectionEvent.current === event) selectionEvent.current = null;
    });
  };
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
  const optionId = (value: DropdownValue) => `${typeof value}:${value}`;
  const selected =
    items.find((item) => item.value === value) || (!allowBlank ? items.find((item) => !item.disabled) : undefined);
  useEffect(() => {
    if (disabled || readOnly) setActive(false);
  }, [disabled, readOnly]);
  useEffect(() => {
    if (!active || !root.current || !trigger.current) return;
    const rect = root.current.getBoundingClientRect();
    const triggerRect = trigger.current.getBoundingClientRect();
    const up = auto && rect.top > window.innerHeight / 2 + rect.height;
    setPlacement({ up, sideOffset: up ? triggerRect.top - rect.bottom : rect.top - triggerRect.bottom });
  }, [active, auto]);
  const select = (next: DropdownValue, event: DropdownEvent) => {
    if (disabled || readOnly) return;
    onBlur?.(event);
    if (name) Object.assign(event.target, { name });
    if (controlledValue === undefined) setValue(next);
    setValidationMessage('');
    onChange?.(next, event);
  };
  const combo = {
    id,
    'aria-label': others['aria-label'] || (typeof label === 'string' ? label : undefined),
    'aria-labelledby':
      others['aria-labelledby'] ?? (template && selected && label && !others['aria-label'] ? `${id}-label` : undefined),
    'aria-disabled': disabled || undefined,
    'aria-readonly': readOnly || undefined,
    'aria-required': required || undefined,
    'aria-invalid': fieldError ? true : others['aria-invalid'],
    'aria-describedby':
      [others['aria-describedby'], fieldError && `${id}-error`].filter(Boolean).join(' ') || undefined,
  } satisfies React.HTMLAttributes<HTMLElement>;
  const renderOption = (item: (typeof items)[number], index: number) => (
    <DropdownOption
      key={index}
      value={optionId(item.value)}
      textValue={item.text}
      disabled={item.disabled}
      id={`${id}-option-${index}`}
      onKeyDown={captureSelection}
      onPointerUp={captureSelection}
      onClick={captureSelection}
      className={cn(
        'cursor-pointer',
        item.value === selected?.value && cn('rt-dropdown-selected', 'text-(--dropdown-color-primary)'),
        item.disabled && cn(disabledClasses, 'text-(--dropdown-color-disabled) cursor-not-allowed'),
      )}
    >
      <DropdownOptionText>{template ? template(item.original) : item.label}</DropdownOptionText>
    </DropdownOption>
  );
  const groups = new Map<string | undefined, number[]>();
  items.forEach((item, index) => groups.set(item.group, [...(groups.get(item.group) ?? []), index]));
  return (
    <div
      data-react-toolbox="dropdown"
      onChange={(event) => {
        /** The primitive’s nameless select contains internal option IDs, not domain values. */
        if (event.target instanceof HTMLSelectElement && event.target !== native.current && !event.target.name)
          event.stopPropagation();
      }}
      ref={root}
      tabIndex={-1}
      className={cn(
        'rt-dropdown-dropdown',
        'relative',
        materialRoot,
        materialDescendants,
        up && 'rt-dropdown-up',
        active && 'rt-dropdown-active',
        disabled && disabledClasses,
        required && requiredClasses,
        className,
      )}
      onKeyDownCapture={onKeyDown}
      onFocus={(event) => {
        if (!isWithinDropdown(event.relatedTarget)) onFocus?.(event);
      }}
      onBlur={(event) => {
        if (!isWithinDropdown(event.relatedTarget)) onBlur?.(event);
      }}
    >
      {/** Only the domain-value select is named; primitive IDs stay inside this event boundary. */}
      <DropdownRoot
        value={selected ? optionId(selected.value) : ''}
        open={active}
        onOpenChange={setActive}
        disabled={disabled}
        onValueChange={(key) => {
          const item = items.find((item) => optionId(item.value) === key);
          if (item && !item.disabled && selectionEvent.current) select(item.value, selectionEvent.current);
        }}
      >
        {template && selected ? (
          <Input
            {...others}
            id={`${id}-input`}
            ref={input}
            disabled={disabled}
            required={required}
            type="hidden"
            label={label}
            value={selected.text}
          />
        ) : (
          <DropdownTrigger
            ref={setTrigger}
            asChild
            className="min-h-0 block border-b border-b-(--input-text-bottom-border-color) [box-shadow:none] focus:[box-shadow:none] disabled:opacity-100"
            onClick={onClick}
            onKeyDown={captureSelection}
          >
            <DropdownInputTrigger
              {...others}
              {...combo}
              inputRef={input}
              tabIndex={0}
              disabled={disabled}
              rootClassName={valueClasses}
              required={required}
              error={fieldError}
              label={label}
              value={selected?.text ?? ''}
            />
          </DropdownTrigger>
        )}
        {template && selected ? (
          <DropdownTrigger
            ref={setTrigger}
            asChild
            className="block min-h-0 py-(--input-padding) bg-transparent [box-shadow:none] focus:[box-shadow:none] disabled:opacity-100"
            onClick={onClick}
            onKeyDown={captureSelection}
          >
            <div
              {...combo}
              tabIndex={disabled ? -1 : 0}
              className={cn(
                'rt-dropdown-field',
                'cursor-pointer p-[var(--input-padding)_0] relative',
                '[&:focus-visible]:[outline:2px_solid_var(--input-text-highlight-color)] [&:focus-visible]:-outline-offset-2',
                Boolean(fieldError) && cn('rt-dropdown-errored', '[.rt-dropdown-field&]:pb-0'),
                disabled && disabledClasses,
                required && requiredClasses,
              )}
            >
              <div
                className={`${cn(
                  'rt-dropdown-templateValue',
                  'bg-(--input-text-background-color) [border-bottom:1px_solid_var(--input-text-bottom-border-color)] text-(--rt-color-text) min-h-(--input-field-height) p-[var(--input-field-padding)_0] pe-[calc(2*var(--input-chevron-offset)+2*var(--dropdown-value-border-size))] relative',
                  '[.rt-dropdown-field.rt-dropdown-errored>&]:[border-bottom:2px_solid_var(--input-text-error-color)]',
                  '[.rt-dropdown-field.rt-dropdown-disabled>&]:[border-bottom-style:dotted] [.rt-dropdown-field.rt-dropdown-disabled>&]:text-(--input-text-disabled-text-color)',
                )} ${valueClasses}`}
              >
                {template(selected.original)}
              </div>
              {label ? (
                <label
                  id={`${id}-label`}
                  className={cn(
                    'rt-dropdown-label',
                    'text-(--input-text-label-color) text-(length:--input-label-font-size) left-0 leading-(--input-field-font-size) absolute top-(--input-focus-label-top)',
                    '[.rt-dropdown-field.rt-dropdown-errored>&]:text-(--input-text-error-color)',
                  )}
                >
                  {label}
                  {required ? (
                    <span aria-hidden="true" className={requiredClasses}>
                      {' '}
                      *{' '}
                    </span>
                  ) : null}
                </label>
              ) : null}
              {fieldError ? (
                <span
                  id={`${id}-error`}
                  className={cn(
                    'rt-dropdown-error',
                    'text-(--input-text-error-color) text-(length:--input-label-font-size) leading-(--input-underline-height) mb-[calc(-1_*_var(--input-underline-height))]',
                  )}
                >
                  {fieldError}
                </span>
              ) : null}
            </div>
          </DropdownTrigger>
        ) : null}
        <select
          ref={native}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          name={name}
          form={others.form}
          disabled={disabled}
          required={required && !readOnly}
          value={selected?.value ?? ''}
          onChange={(event) => {
            const item = items[event.currentTarget.selectedIndex - 1];
            if (item && !item.disabled) {
              select(item.value, event);
              setActive(false);
            }
          }}
          onInvalid={(event) => {
            event.preventDefault();
            setValidationMessage(event.currentTarget.validationMessage);
            trigger.current?.focus();
          }}
        >
          <option value="" />
          {items.map((item, index) => (
            <option key={index} value={item.value} disabled={item.disabled}>
              {item.text}
            </option>
          ))}
        </select>
        <DropdownPortal>
          <DropdownContent
            ref={content}
            onCloseAutoFocus={
              template
                ? (event) => {
                    if (event.defaultPrevented || !trigger.current) return;
                    event.preventDefault();
                    trigger.current.focus();
                  }
                : undefined
            }
            position="popper"
            side={up ? 'top' : 'bottom'}
            align="start"
            sideOffset={placement.sideOffset}
            avoidCollisions={auto}
            aria-label={typeof label === 'string' ? label : undefined}
            className="rt-dropdown-values max-h-(--dropdown-overflow-max-height) w-(--radix-select-trigger-width)"
          >
            <DropdownViewport>
              {[...groups].map(([group, entries]) =>
                group ? (
                  <DropdownGroup key={group}>
                    <DropdownLabel className="text-sm p-(--unit)">{group}</DropdownLabel>
                    {entries.map((index) => renderOption(items[index], index))}
                  </DropdownGroup>
                ) : (
                  entries.map((index) => renderOption(items[index], index))
                ),
              )}
            </DropdownViewport>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
    </div>
  );
}
export default Dropdown;
