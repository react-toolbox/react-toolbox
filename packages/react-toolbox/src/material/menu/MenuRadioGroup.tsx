'use client';

import { createContext, useContext, useState, type HTMLAttributes } from 'react';
import MenuItem, { type MenuItemProps } from './MenuItem';
import { cn } from '../foundations/styles/cn';

const RadioContext = createContext<{ value?: string; change: (value: string) => void } | null>(null);
export interface MenuRadioGroupProps extends Omit<HTMLAttributes<HTMLUListElement>, 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export function MenuRadioGroup({
  value: controlled,
  defaultValue,
  onValueChange,
  children,
  className,
  ...props
}: MenuRadioGroupProps) {
  const [internal, setValue] = useState(defaultValue);
  const value = controlled ?? internal;
  return (
    <li role="presentation">
      <ul {...props} role="group" className={cn('list-none m-0 p-0', className)}>
        <RadioContext.Provider
          value={{
            value,
            change: (next) => {
              if (next === value) return;
              if (controlled === undefined) setValue(next);
              onValueChange?.(next);
            },
          }}
        >
          {children}
        </RadioContext.Provider>
      </ul>
    </li>
  );
}
export interface MenuRadioItemProps extends MenuItemProps<string> {
  value: string;
}
export function MenuRadioItem({ value, onClick, icon, closeOnSelect = false, ...props }: MenuRadioItemProps) {
  const group = useContext(RadioContext);
  const selected = group?.value === value;
  return (
    <MenuItem
      {...props}
      value={value}
      role="menuitemradio"
      selected={selected}
      closeOnSelect={closeOnSelect}
      icon={
        icon ?? (
          <span className="material-icons" style={{ visibility: selected ? undefined : 'hidden' }}>
            check
          </span>
        )
      }
      onClick={(event, item) => {
        onClick?.(event, item);
        if (!event.defaultPrevented) group?.change(value);
      }}
    />
  );
}
