'use client';

import { useState } from 'react';
import MenuItem, { type MenuItemProps } from './MenuItem';

export interface MenuCheckboxItemProps extends Omit<MenuItemProps, 'selected'> {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function MenuCheckboxItem({
  checked: controlled,
  defaultChecked = false,
  onCheckedChange,
  onClick,
  icon,
  closeOnSelect = false,
  ...props
}: MenuCheckboxItemProps) {
  const [internal, setChecked] = useState(defaultChecked);
  const checked = controlled ?? internal;
  return (
    <MenuItem
      {...props}
      role="menuitemcheckbox"
      aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
      selected={checked !== false}
      closeOnSelect={closeOnSelect}
      icon={
        icon ??
        (checked === 'indeterminate' ? (
          'remove'
        ) : (
          <span className="material-icons" style={{ visibility: checked ? undefined : 'hidden' }}>
            check
          </span>
        ))
      }
      onClick={(event, item) => {
        onClick?.(event, item);
        if (event.defaultPrevented) return;
        const next = checked === 'indeterminate' || !checked;
        if (controlled === undefined) setChecked(next);
        onCheckedChange?.(next);
      }}
    />
  );
}
