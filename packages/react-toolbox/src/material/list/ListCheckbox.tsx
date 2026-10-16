'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { itemClasses, disabledClasses } from './styles';
import type { ListTheme } from './types';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
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
  /** Native checkbox state, form attributes, input events, and imperative ref. */
  checkboxProps?: Omit<CheckboxProps, 'label' | 'children'>;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ListTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: ListTheme;
}
export function ListCheckbox({
  caption,
  checked,
  className,
  disabled: suppliedDisabled,
  checkboxProps,
  legend,
  name,
  onBlur,
  onChange,
  onFocus,
  theme: legacyTheme,
  classNames,
  ...other
}: ListCheckboxProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const disabled = suppliedDisabled ?? checkboxProps?.disabled ?? false;
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
        {...checkboxProps}
        checked={checked ?? checkboxProps?.checked}
        className={cn(
          'rt-list-checkbox',
          'items-center cursor-pointer flex h-full m-0 min-h-(--list-item-min-height) w-full',
          "[&>[data-react-toolbox='check']]:me-(--list-item-right-checkbox-margin)",
          "[&>[data-react-toolbox='label']]:ps-0",
          "[.rt-list-item.rt-list-disabled>&>[data-react-toolbox='label']]:opacity-[0.5]",
          theme?.checkbox,
          checkboxProps?.className,
        )}
        disabled={disabled}
        label={<ListItemContent caption={caption} legend={legend} />}
        name={name ?? checkboxProps?.name}
        onBlur={(event) => {
          checkboxProps?.onBlur?.(event);
          onBlur?.(event);
        }}
        onChange={(checked, event) => {
          checkboxProps?.onChange?.(checked, event);
          if (!event.defaultPrevented) onChange?.(checked, event);
        }}
        onFocus={(event) => {
          checkboxProps?.onFocus?.(event);
          onFocus?.(event);
        }}
      />
    </li>
  );
}
export default ListCheckbox;
