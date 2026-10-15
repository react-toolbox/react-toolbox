'use client';
import { itemClasses, disabledClasses } from './styles';
import type { ListTheme } from './types';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../utils/cn';
import Checkbox, { type CheckboxProps } from '../checkbox';
import ListItemContent from './ListItemContent';
export interface ListCheckboxProps extends Omit<ComponentPropsWithRef<'li'>, 'onBlur' | 'onChange' | 'onFocus'> {
  caption?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  legend?: ReactNode;
  name?: string;
  onBlur?: CheckboxProps['onBlur'];
  onChange?: CheckboxProps['onChange'];
  onFocus?: CheckboxProps['onFocus'];
  theme?: ListTheme;
}
export function ListCheckbox({
  caption,
  checked = false,
  className,
  disabled = false,
  legend,
  name,
  onBlur,
  onChange,
  onFocus,
  theme,
  ...other
}: ListCheckboxProps) {
  return (
    <li
      {...other}
      className={cn(
        itemClasses,
        theme?.item,
        'rt-list-checkboxItem',
        theme?.checkboxItem,
        disabled && cn(disabledClasses, theme?.disabled),
        className,
      )}
    >
      <Checkbox
        checked={checked}
        className={cn(
          'rt-list-checkbox',
          'items-center cursor-pointer flex h-full m-0 min-h-(--list-item-min-height) w-full',
          "[&>[data-react-toolbox='check']]:mr-(--list-item-right-checkbox-margin)",
          "[&>[data-react-toolbox='label']]:pl-0",
          "[.rt-list-item.rt-list-disabled>&>[data-react-toolbox='label']]:opacity-[0.5]",
          theme?.checkbox,
        )}
        disabled={disabled}
        label={<ListItemContent caption={caption} legend={legend} />}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
    </li>
  );
}
export default ListCheckbox;
