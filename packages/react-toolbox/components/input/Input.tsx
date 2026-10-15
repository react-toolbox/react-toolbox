'use client';

import React, { useCallback, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import FontIcon from '../font_icon/FontIcon';
import defaults from './theme';
import { isValuePresent } from '../utils/utils';

export type InputTheme = Partial<typeof defaults>;
export type InputElement = HTMLInputElement | HTMLTextAreaElement;
export interface InputHandle {
  focus(): void;
  blur(): void;
  readonly inputElement: InputElement | null;
}
export interface InputProps extends Omit<
  React.InputHTMLAttributes<InputElement>,
  'onChange' | 'size'
> {
  error?: React.ReactNode;
  floating?: boolean;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  onChange?: (value: string, event: React.ChangeEvent<InputElement>) => void;
  ref?: React.Ref<InputHandle>;
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
  theme: overrides,
  type = 'text',
  value,
  onKeyPress,
  rows,
  onChange,
  ref,
  ...others
}: InputProps) {
  const theme = mergeTheme(defaults, overrides);
  const generatedId = useId();
  const id = suppliedId || `input-${generatedId}`;
  const node = useRef<InputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
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
      multiline && maxLength != null
        ? event.target.value.slice(0, Math.max(0, maxLength))
        : event.target.value;
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
    className: classnames(theme.inputElement, { [theme.filled]: present }),
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
      className={classnames(
        theme.input,
        {
          [theme.disabled]: disabled,
          [theme.errored]: error,
          [theme.hidden]: type === 'hidden',
          [theme.withIcon]: icon,
        },
        className,
      )}
    >
      {multiline ? (
        <textarea {...inputProps} rows={rows ?? 1} />
      ) : (
        <input {...inputProps} type={type} />
      )}
      {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
      <span className={theme.bar} />
      {label ? (
        <label className={classnames(theme.label, { [theme.fixed]: !floating })} htmlFor={id}>
          {label}
          {required ? <span className={theme.required}> * </span> : null}
        </label>
      ) : null}
      {hint ? (
        <span id={`${id}-hint`} hidden={Boolean(label)} className={theme.hint}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={`${id}-error`} className={theme.error}>
          {error}
        </span>
      ) : null}
      {maxLength != null ? (
        <span id={`${id}-counter`} className={theme.counter}>{`${length}/${maxLength}`}</span>
      ) : null}
      {children}
    </div>
  );
}
export default Input;
