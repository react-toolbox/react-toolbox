import React, { useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Thumb from './Thumb';
import defaults from './theme';
export type SwitchTheme = Partial<typeof defaults>;
export interface SwitchHandle {
  focus(): void;
  blur(): void;
  readonly inputElement: HTMLInputElement | null;
}
export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'type' | 'size' | 'onMouseEnter' | 'onMouseLeave'
> {
  label?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  ripple?: boolean;
  theme?: SwitchTheme;
  ref?: React.Ref<SwitchHandle>;
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLInputElement>) => void;
}
export function Switch({
  checked = false,
  children,
  className = '',
  disabled = false,
  label,
  name,
  onChange,
  onMouseEnter,
  onMouseLeave,
  theme: overrides,
  ripple,
  ref,
  style,
  ...others
}: SwitchProps) {
  const theme = mergeTheme(defaults, overrides);
  const input = useRef<HTMLInputElement>(null);
  const handle = {
    focus: () => input.current?.focus(),
    blur: () => input.current?.blur(),
    get inputElement() {
      return input.current;
    },
  };
  useImperativeHandle(ref, () => handle);
  const toggle = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.pageX !== 0 && event.pageY !== 0) input.current?.blur();
    if (!disabled) onChange?.(!checked, event);
  };
  return (
    <label
      data-react-toolbox="switch"
      className={classnames(theme[disabled ? 'disabled' : 'field'], className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        {...others}
        style={style}
        checked={checked}
        className={theme.input}
        disabled={disabled}
        name={name}
        role="switch"
        readOnly
        onClick={toggle}
        ref={input}
        type="checkbox"
      />
      <span className={theme[checked ? 'on' : 'off']}>
        {' '}
        <Thumb disabled={disabled} ripple={ripple} theme={theme} />{' '}
      </span>
      {label ? <span className={theme.text}>{label}</span> : null}
      {children}
    </label>
  );
}
export default Switch;
