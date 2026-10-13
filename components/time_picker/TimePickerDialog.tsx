import { mergeTheme } from '../theming';
import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Dialog, { type DialogProps } from '../dialog/Dialog';
import time, { type TimeFormat } from '../utils/time';
import Clock, { type ClockHandle } from './Clock';
import defaults from './theme';
export type TimePickerSelectEvent = React.MouseEvent<HTMLElement>;
export interface TimePickerDialogProps {
  active?: boolean;
  cancelLabel?: string;
  className?: string;
  format?: TimeFormat;
  name?: string;
  okLabel?: string;
  onDismiss?: () => void;
  onEscKeyDown?: DialogProps['onEscKeyDown'];
  onOverlayClick?: DialogProps['onOverlayClick'];
  onSelect?: (value: Date, event?: TimePickerSelectEvent) => void;
  theme?: Partial<typeof defaults>;
  value?: Date;
}
export default function TimePickerDialog({
  active = false,
  cancelLabel = 'Cancel',
  className,
  format = '24hr',
  name,
  okLabel = 'Ok',
  onDismiss,
  onEscKeyDown,
  onOverlayClick,
  onSelect,
  theme: overrides,
  value,
}: TimePickerDialogProps) {
  const theme = mergeTheme(defaults, overrides);
  const [initialTime] = useState(() => new Date());
  const sourceTime = value ?? initialTime;
  const [displayTime, setTime] = useState(() => new Date(sourceTime.getTime()));
  const [display, setDisplay] = useState<'hours' | 'minutes'>('hours');
  const clock = useRef<ClockHandle>(null);
  useEffect(() => setTime(new Date(sourceTime.getTime())), [sourceTime.getTime(), active]);
  useEffect(() => {
    if (active) clock.current?.calculateShape();
  }, [active]);
  const toggleMode = (mode: 'am' | 'pm') =>
    setTime((previous) => {
      const next = new Date(previous.getTime());
      next.setHours((next.getHours() % 12) + (mode === 'pm' ? 12 : 0));
      return next;
    });
  const switchDisplay = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
    setDisplay(event.currentTarget.id === 'hours' ? 'hours' : 'minutes');
  const keyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchDisplay(event);
      return;
    }
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
      return;
    event.preventDefault();
    const nextDisplay = event.currentTarget.id === 'hours' ? 'hours' : 'minutes';
    const key = event.key;
    setDisplay(nextDisplay);
    setTime((previous) => {
      const next = new Date(previous.getTime());
      const hours = nextDisplay === 'hours',
        twelveHour = hours && format === 'ampm';
      const minimum = twelveHour ? 1 : 0,
        maximum = hours ? (twelveHour ? 12 : 23) : 59;
      const current = hours
        ? twelveHour
          ? next.getHours() % 12 || 12
          : next.getHours()
        : next.getMinutes();
      const step = key === 'ArrowUp' || key === 'ArrowRight' ? 1 : -1;
      const number =
        key === 'Home'
          ? minimum
          : key === 'End'
            ? maximum
            : minimum +
              ((current - minimum + step + maximum - minimum + 1) % (maximum - minimum + 1));
      if (hours)
        next.setHours(twelveHour ? (number % 12) + (next.getHours() >= 12 ? 12 : 0) : number);
      else next.setMinutes(number);
      return next;
    });
  };
  const hours = format === 'ampm' ? displayTime.getHours() % 12 || 12 : displayTime.getHours();
  return (
    <Dialog
      actions={[
        { label: cancelLabel, className: theme.button, onClick: onDismiss },
        {
          label: okLabel,
          className: theme.button,
          name,
          onClick: (event) => onSelect?.(displayTime, event),
        },
      ]}
      active={active}
      className={classnames(
        theme.dialog,
        theme[`${display}Display`],
        theme[`${time.getTimeMode(displayTime)}Format`],
        className,
      )}
      onEscKeyDown={onEscKeyDown}
      onOverlayClick={onOverlayClick}
      aria-label="Choose time"
    >
      <header className={theme.header}>
        <span
          id="hours"
          role="spinbutton"
          tabIndex={0}
          aria-label="Hours"
          aria-valuemin={format === 'ampm' ? 1 : 0}
          aria-valuemax={format === 'ampm' ? 12 : 23}
          aria-valuenow={hours}
          className={theme.hours}
          onClick={switchDisplay}
          onKeyDown={keyDown}
        >
          {`0${hours}`.slice(-2)}
        </span>
        <span className={theme.separator}>:</span>
        <span
          id="minutes"
          role="spinbutton"
          tabIndex={0}
          aria-label="Minutes"
          aria-valuemin={0}
          aria-valuemax={59}
          aria-valuenow={displayTime.getMinutes()}
          className={theme.minutes}
          onClick={switchDisplay}
          onKeyDown={keyDown}
        >
          {`0${displayTime.getMinutes()}`.slice(-2)}
        </span>
        {format === 'ampm' ? (
          <div className={theme.ampm}>
            {(['am', 'pm'] as const).map((mode) => (
              <span
                key={mode}
                role="button"
                tabIndex={0}
                aria-pressed={time.getTimeMode(displayTime) === mode}
                className={theme[mode]}
                onClick={() => toggleMode(mode)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleMode(mode);
                  }
                }}
              >
                {mode.toUpperCase()}
              </span>
            ))}
          </div>
        ) : null}
      </header>
      <Clock
        ref={clock}
        display={display}
        format={format}
        onChange={setTime}
        onHandMoved={() => setDisplay('minutes')}
        theme={theme}
        time={displayTime}
      />
    </Dialog>
  );
}
