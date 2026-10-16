'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { InputTheme } from './types';

import React, { useCallback, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import FontIcon from '../font-icon/FontIcon';
import { isValuePresent } from './value';
import useFormReset from '../foundations/forms/useFormReset';

export type { InputTheme, InputClassNames } from './types';
export type InputElement = HTMLInputElement | HTMLTextAreaElement;
export interface InputHandle {
  focus(): void;
  blur(): void;
  readonly inputElement: InputElement | null;
}
export interface InputProps extends Omit<React.InputHTMLAttributes<InputElement>, 'onChange' | 'size'> {
  error?: React.ReactNode;
  floating?: boolean;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  cols?: number;
  wrap?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['wrap'];
  onChange?: (value: string, event: React.ChangeEvent<InputElement>) => void;
  ref?: React.Ref<InputHandle>;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: InputTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: InputTheme;
}

export function Input({
  children,
  className = '',
  defaultValue,
  disabled = false,
  error,
  floating = true,
  hint = '',
  icon,
  id: suppliedId,
  name,
  label,
  maxLength,
  multiline = false,
  required = false,
  role,
  theme: legacyTheme,
  classNames,
  type = 'text',
  value,
  onKeyPress,
  rows,
  onChange,
  ref,
  ...others
}: InputProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const generatedId = useId();
  const id = suppliedId || `input-${generatedId}`;
  const node = useRef<InputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  useFormReset(node, () => {
    if (value === undefined) setUncontrolledValue(node.current?.value ?? '');
  });
  useImperativeHandle(
    ref,
    () => ({
      focus: () => node.current?.focus(),
      blur: () => node.current?.blur(),
      get inputElement() {
        return node.current;
      },
    }),
    [],
  );
  const resize = useCallback(() => {
    const element = node.current;
    if (!element || !multiline) return;
    if (typeof rows === 'number' && !Number.isNaN(rows)) element.style.height = '';
    else {
      const style = getComputedStyle(element);
      const offset =
        style.boxSizing === 'content-box'
          ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
          : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight + offset}px`;
    }
  }, [multiline, rows]);
  useEffect(() => {
    if (!multiline) return;
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [multiline, resize]);
  useEffect(resize);
  const currentValue = value === undefined ? uncontrolledValue : value;
  const present = isValuePresent(currentValue);
  const length = present ? String(currentValue).length : 0;
  const describedBy =
    [
      ...new Set(
        [
          ...(others['aria-describedby'] || '').split(/\s+/),
          hint && `${id}-hint`,
          error && `${id}-error`,
          maxLength != null && `${id}-counter`,
        ].filter(Boolean),
      ),
    ].join(' ') || undefined;
  const handleChange = (event: React.ChangeEvent<InputElement>) => {
    const next =
      multiline && maxLength != null ? event.target.value.slice(0, Math.max(0, maxLength)) : event.target.value;
    if (event.target.value !== next) event.target.value = next;
    if (value === undefined) setUncontrolledValue(next);
    resize();
    onChange?.(next, event);
  };
  const handleKeyPress = (event: React.KeyboardEvent<InputElement>) => {
    const target = event.currentTarget;
    if (
      multiline &&
      maxLength != null &&
      !(Number(target.selectionEnd) - Number(target.selectionStart)) &&
      target.value.length === maxLength
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onKeyPress?.(event);
  };
  const inputProps = {
    ...others,
    id,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : others['aria-invalid'],
    className: cn(
      'rt-input-inputElement',
      '[.rt-input-errored>&]:border-b-(--input-text-error-color) [.rt-input-errored>&]:[border-bottom-width:2px]',
      '[.rt-input-disabled>&]:[border-bottom-style:dotted] [.rt-input-disabled>&]:border-b-(--input-text-disabled-color) [.rt-input-disabled>&]:text-(--input-text-disabled-text-color)',
      'bg-(--input-text-background-color) [border-bottom:1px_solid_var(--input-text-bottom-border-color)] [border-left:0] rounded-none [border-right:0] [border-top:0] text-(--input-text-input-element-color) block font-[inherit] text-(length:--input-field-font-size) [outline:none] p-[var(--input-field-padding)_0] w-full',
      '[&:required]:[box-shadow:none]',
      '[@media_(hover:_hover)]:[.rt-input-input:not(.rt-input-errored):not(.rt-input-disabled)>&:hover:not(:focus)]:[border-bottom-color:rgb(from_var(--rt-color-black)_r_g_b_/_87%)] [@media_(hover:_hover)]:[.rt-input-input:not(.rt-input-errored):not(.rt-input-disabled)>&:hover:not(:focus)]:[box-shadow:inset_0_-1px_rgb(from_var(--rt-color-black)_r_g_b_/_87%)]',
      theme?.inputElement,
      present && cn('rt-input-filled', theme?.filled),
    ),
    onChange: handleChange,
    ref: (element: InputElement | null) => {
      node.current = element;
    },
    role,
    name,
    defaultValue,
    disabled,
    required,
    value,
    maxLength,
    onKeyPress: multiline ? handleKeyPress : onKeyPress,
  };
  return (
    <div
      data-react-toolbox="input"
      className={cn(
        'rt-input-input',
        'p-[var(--input-padding)_0] relative',
        materialRoot,
        materialDescendants,
        theme?.input,
        disabled && cn('rt-input-disabled', theme?.disabled),
        Boolean(error) && cn('rt-input-errored', 'pb-0', theme?.errored),
        type === 'hidden' && cn('rt-input-hidden', 'hidden', theme?.hidden),
        Boolean(icon) &&
          cn(
            'rt-input-withIcon',
            '[.rt-input-input&]:ml-[calc(var(--input-icon-size)+var(--input-icon-right-space))]',
            theme?.withIcon,
          ),
        className,
      )}
    >
      {multiline ? <textarea {...inputProps} rows={rows ?? 1} /> : <input {...inputProps} type={type} />}
      {icon ? (
        <FontIcon
          className={cn(
            'rt-input-icon',
            'text-(--input-text-label-color) block text-(length:--input-icon-font-size)! h-(--input-icon-size) left-[calc(-1_*_(var(--input-icon-size)_+_var(--input-icon-right-space)))] leading-(--input-icon-size)! absolute text-center top-(--input-icon-offset) [transition:color_var(--animation-duration)_var(--animation-curve-default)] w-(--input-icon-size)',
            '[.rt-input-inputElement:focus:not([disabled]):not([readonly])~&]:text-(--input-text-highlight-color)',
            theme?.icon,
          )}
          value={icon}
        />
      ) : null}
      <span
        className={cn(
          'rt-input-bar',
          'block relative w-full',
          "[&::before]:bg-(--input-text-highlight-color) [&::before]:bottom-0 [&::before]:[content:''] [&::before]:h-[2px] [&::before]:absolute [&::before]:duration-200 [&::before]:[transition-property:width,background-color] [&::before]:[transition-timing-function:var(--animation-curve-default)] [&::before]:w-0 [&::before]:left-[50%]",
          "[&::after]:bg-(--input-text-highlight-color) [&::after]:bottom-0 [&::after]:[content:''] [&::after]:h-[2px] [&::after]:absolute [&::after]:duration-200 [&::after]:[transition-property:width,background-color] [&::after]:[transition-timing-function:var(--animation-curve-default)] [&::after]:w-0 [&::after]:right-[50%]",
          '[.rt-input-inputElement:focus:not([disabled]):not([readonly])~&::before]:w-[50%]',
          '[.rt-input-inputElement:focus:not([disabled]):not([readonly])~&::after]:w-[50%]',
          '[.rt-input-errored>&::before]:bg-(--input-text-error-color)',
          '[.rt-input-errored>&::after]:bg-(--input-text-error-color)',
          theme?.bar,
        )}
      />
      {label ? (
        <label
          className={cn(
            'rt-input-label',
            'text-(--input-text-label-color) text-(length:--input-field-font-size) left-0 leading-(--input-field-font-size) pointer-events-none absolute top-[calc(var(--input-padding)+1.5*var(--input-field-padding))] [transition-duration:var(--animation-duration)] [transition-property:top,font-size,color] [transition-timing-function:var(--animation-curve-default)]',
            '[.rt-input-errored>&]:text-(--input-text-error-color) [.rt-input-errored>&]:text-(length:--input-label-font-size) [.rt-input-errored>&]:top-(--input-focus-label-top)',
            '[.rt-input-disabled>&]:text-(--input-text-disabled-text-color)',
            '[.rt-input-inputElement.rt-input-filled~&:not(.rt-input-fixed)]:text-(length:--input-label-font-size) [.rt-input-inputElement.rt-input-filled~&:not(.rt-input-fixed)]:top-(--input-focus-label-top)',
            "[.rt-input-inputElement[type='date']~&:not(.rt-input-fixed)]:text-(length:--input-label-font-size) [.rt-input-inputElement[type='date']~&:not(.rt-input-fixed)]:top-(--input-focus-label-top)",
            "[.rt-input-inputElement[type='time']~&:not(.rt-input-fixed)]:text-(length:--input-label-font-size) [.rt-input-inputElement[type='time']~&:not(.rt-input-fixed)]:top-(--input-focus-label-top)",
            '[.rt-input-inputElement:focus:not([disabled]):not([readonly])~&:not(.rt-input-fixed)]:text-(length:--input-label-font-size) [.rt-input-inputElement:focus:not([disabled]):not([readonly])~&:not(.rt-input-fixed)]:top-(--input-focus-label-top) [.rt-input-inputElement:focus:not([disabled]):not([readonly])~&:not(.rt-input-fixed)]:text-(--input-text-highlight-color)',
            '[.rt-input-errored>.rt-input-inputElement:focus:not([disabled]):not([readonly])~&:not(.rt-input-fixed)]:text-(--input-text-error-color)',
            theme?.label,
            !floating &&
              cn(
                'rt-input-fixed',
                '[.rt-input-label&]:text-(length:--input-label-font-size) [.rt-input-label&]:top-(--input-focus-label-top)',
                theme?.fixed,
              ),
          )}
          htmlFor={id}
        >
          {label}
          {required ? (
            <span
              className={cn(
                'rt-input-required',
                '[.rt-input-errored>.rt-input-label>&]:text-(--input-text-required-color)',
                '[.rt-input-inputElement:focus:not([disabled]):not([readonly])~.rt-input-label>&]:text-(--input-text-required-color)',
                theme?.required,
              )}
            >
              {' '}
              *{' '}
            </span>
          ) : null}
        </label>
      ) : null}
      {hint ? (
        <span
          id={`${id}-hint`}
          hidden={Boolean(label)}
          className={cn(
            'rt-input-hint',
            'text-(--input-text-label-color) text-(length:--input-field-font-size) left-0 leading-(--input-field-font-size) opacity-(--input-hint-opacity) pointer-events-none absolute top-[calc(var(--input-padding)+1.5*var(--input-field-padding))] [transition-duration:var(--animation-duration)] [transition-property:opacity] [transition-timing-function:var(--animation-curve-default)]',
            '[.rt-input-label.rt-input-fixed~&]:hidden',
            '[.rt-input-inputElement.rt-input-filled~&]:hidden',
            '[.rt-input-inputElement:focus:not([disabled]):not([readonly])~&]:block [.rt-input-inputElement:focus:not([disabled]):not([readonly])~&]:opacity-(--input-hint-opacity)',
            '[.rt-input-inputElement:focus:not([disabled]):not([readonly]).rt-input-filled~&]:opacity-0',
            theme?.hint,
          )}
        >
          {hint}
        </span>
      ) : null}
      {error ? (
        <span
          id={`${id}-error`}
          className={cn(
            'rt-input-error',
            'text-(length:--input-label-font-size) leading-(--input-underline-height) mb-[calc(-1_*_var(--input-underline-height))] text-(--input-text-error-color)',
            theme?.error,
          )}
        >
          {error}
        </span>
      ) : null}
      {maxLength != null ? (
        <span
          id={`${id}-counter`}
          className={cn(
            'rt-input-counter',
            'text-(--input-text-label-color) absolute right-0 text-(length:--input-label-font-size) leading-(--input-underline-height) mb-[calc(-1_*_var(--input-underline-height))]',
            '[.rt-input-errored>&]:text-(--input-text-error-color)',
            theme?.counter,
          )}
        >{`${length}/${maxLength}`}</span>
      ) : null}
      {children}
    </div>
  );
}
export default Input;
