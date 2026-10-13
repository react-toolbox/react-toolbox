import React, { useId } from 'react';
import RadioButton, { type RadioButtonProps, type RadioButtonTheme } from './RadioButton';
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disabled?: boolean;
  name?: string;
  value?: string;
  theme?: RadioButtonTheme;
  onChange?: (value: string | undefined, event: React.MouseEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
}
export function RadioGroup({
  children,
  className = '',
  disabled = false,
  name,
  onChange,
  theme,
  value,
  ...others
}: RadioGroupProps) {
  const id = useId();
  return (
    <div
      {...others}
      role="radiogroup"
      data-react-toolbox="radio-group"
      className={className}
      aria-disabled={disabled || undefined}
    >
      {React.Children.map(children, (child) =>
        !React.isValidElement<RadioButtonProps>(child) || child.type !== RadioButton
          ? child
          : React.cloneElement(child, {
              checked: child.props.value === value,
              disabled: disabled || child.props.disabled,
              name: name || child.props.name || `radio-${id}`,
              theme: { ...theme, ...child.props.theme },
              onChange: (event) => onChange?.(child.props.value, event),
            }),
      )}
    </div>
  );
}
export default RadioGroup;
