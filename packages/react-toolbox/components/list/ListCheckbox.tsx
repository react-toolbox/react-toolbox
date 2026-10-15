'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from 'classnames';
import Checkbox, { type CheckboxProps } from '../checkbox';
import { mergeTheme } from '../theming';
import ListItemContent from './ListItemContent';
import defaultTheme from './theme';
export interface ListCheckboxProps extends Omit<
  ComponentPropsWithRef<'li'>,
  'onBlur' | 'onChange' | 'onFocus'
> {
  caption?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  legend?: ReactNode;
  name?: string;
  onBlur?: CheckboxProps['onBlur'];
  onChange?: CheckboxProps['onChange'];
  onFocus?: CheckboxProps['onFocus'];
  theme?: Partial<typeof defaultTheme>;
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
  theme: suppliedTheme,
  ...other
}: ListCheckboxProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <li
      {...other}
      className={classnames(
        theme.item,
        theme.checkboxItem,
        { [theme.disabled]: disabled },
        className,
      )}
    >
      <Checkbox
        checked={checked}
        className={theme.checkbox}
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
