import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Input, { type InputProps, type InputElement } from '../input/Input';
import time, { type TimeFormat } from '../utils/time';
import TimePickerDialog, {
  type TimePickerDialogProps,
  type TimePickerSelectEvent,
} from './TimePickerDialog';
import defaults from './theme';
export type TimePickerTheme = Partial<typeof defaults> & { container?: string };
export interface TimePickerProps extends Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange' | 'theme'
> {
  active?: boolean;
  cancelLabel?: string;
  format?: TimeFormat;
  inputClassName?: string;
  okLabel?: string;
  onChange?: (time: Date, event?: TimePickerSelectEvent) => void;
  onDismiss?: () => void;
  onEscKeyDown?: TimePickerDialogProps['onEscKeyDown'];
  onOverlayClick?: TimePickerDialogProps['onOverlayClick'];
  readonly?: boolean;
  theme?: TimePickerTheme;
  value?: Date;
}
export function TimePicker({
  active: controlledActive = false,
  cancelLabel,
  className = '',
  disabled,
  format = '24hr',
  inputClassName,
  okLabel,
  onChange,
  onClick,
  onDismiss,
  onEscKeyDown,
  onKeyDown,
  onKeyPress,
  onOverlayClick,
  readonly,
  theme: overrides,
  value,
  ref,
  ...others
}: TimePickerProps) {
  const theme = mergeTheme(defaults, overrides);
  const [active, setActive] = useState(controlledActive);
  useEffect(() => setActive(controlledActive), [controlledActive]);
  const dismiss = () => {
    setActive(false);
    onDismiss?.();
  };
  const open = (event: React.SyntheticEvent<InputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setActive(true);
  };
  return (
    <div data-react-toolbox="time-picker" className={overrides?.container}>
      <Input
        {...others}
        ref={ref}
        className={classnames(theme.input, inputClassName)}
        disabled={readonly || disabled}
        aria-haspopup="dialog"
        aria-expanded={active}
        onKeyPress={(event) => {
          if (event.charCode === 13 && !disabled && !readonly) open(event);
          onKeyPress?.(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            !event.defaultPrevented &&
            !disabled &&
            !readonly &&
            (event.key === 'Enter' || event.key === ' ')
          )
            open(event);
        }}
        onClick={(event) => {
          if (!disabled && !readonly) {
            open(event);
            onClick?.(event);
          }
        }}
        theme={{ input: theme.input, inputElement: theme.inputElement }}
        readOnly
        type="text"
        value={value ? time.formatTime(value, format) : ''}
      />
      <TimePickerDialog
        active={active}
        cancelLabel={cancelLabel}
        className={className}
        format={format}
        name={others.name}
        okLabel={okLabel}
        onDismiss={dismiss}
        onEscKeyDown={onEscKeyDown || dismiss}
        onOverlayClick={onOverlayClick || dismiss}
        onSelect={(next, event) => {
          onChange?.(next, event);
          setActive(false);
        }}
        theme={theme}
        value={value}
      />
    </div>
  );
}
export default TimePicker;
