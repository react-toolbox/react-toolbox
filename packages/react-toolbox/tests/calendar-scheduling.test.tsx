import React, { useState } from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { CalendarSelection, type DateRange } from '../src/material/date-picker';
import DatePicker from '../src/material/date-picker/DatePicker';
import TimePicker from '../src/material/time-picker/TimePicker';

const date = (day: number, hour = 0, minute = 0) => new Date(2026, 9, day, hour, minute);

it('selects and clears a controlled range across two months', async () => {
  const change = vi.fn();
  function Booking() {
    const [range, setRange] = useState<DateRange>({ from: undefined, to: undefined });
    return (
      <CalendarSelection
        mode="range"
        defaultMonth={date(1)}
        value={range}
        onValueChange={(value) => {
          setRange(value);
          change(value);
        }}
        numberOfMonths={2}
        clearable
        showWeekNumbers
      />
    );
  }
  render(<Booking />);
  expect(screen.getAllByRole('table')).toHaveLength(2);
  expect(screen.getAllByRole('columnheader', { name: 'Week' })).toHaveLength(2);
  await userEvent.click(screen.getByRole('button', { name: '30 October 2026' }));
  await userEvent.click(screen.getByRole('button', { name: '2 November 2026' }));
  expect(change).toHaveBeenLastCalledWith({ from: date(30), to: new Date(2026, 10, 2) });
  expect(screen.getByRole('button', { name: '31 October 2026' })).toHaveAttribute('aria-pressed', 'true');
  await userEvent.click(screen.getByRole('button', { name: 'Clear dates' }));
  expect(change).toHaveBeenLastCalledWith({ from: undefined, to: undefined });
});

it('toggles multiple days and rejects unavailable days', async () => {
  const change = vi.fn();
  render(
    <CalendarSelection
      mode="multiple"
      defaultMonth={date(1)}
      defaultValue={[date(15)]}
      onValueChange={change}
      isDateUnavailable={(day) => day.getDay() === 0}
    />,
  );
  await userEvent.click(screen.getByRole('button', { name: '16 October 2026' }));
  expect(change).toHaveBeenLastCalledWith([date(15), date(16)]);
  await userEvent.click(screen.getByRole('button', { name: '15 October 2026' }));
  expect(change).toHaveBeenLastCalledWith([date(16)]);
  await userEvent.click(screen.getByRole('button', { name: '18 October 2026' }));
  expect(change).toHaveBeenCalledTimes(2);
});

it('can restart ranges crossing unavailable days', async () => {
  const change = vi.fn();
  render(
    <CalendarSelection
      mode="range"
      defaultMonth={date(1)}
      excludeUnavailable
      isDateUnavailable={(day) => day.getDate() === 16}
      onValueChange={change}
    />,
  );
  await userEvent.click(screen.getByRole('button', { name: '15 October 2026' }));
  await userEvent.click(screen.getByRole('button', { name: '17 October 2026' }));
  expect(change).toHaveBeenLastCalledWith({ from: date(17), to: undefined });
});

it('moves keyboard focus across disabled days and months without selecting', async () => {
  const change = vi.fn();
  render(
    <CalendarSelection
      defaultValue={date(30)}
      onValueChange={change}
      isDateUnavailable={(day) => day.getDate() === 31}
    />,
  );
  screen.getByRole('button', { name: '30 October 2026' }).focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getByRole('button', { name: '31 October 2026' })).toHaveFocus();
  await userEvent.keyboard('{Enter}');
  expect(change).not.toHaveBeenCalled();
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getByRole('button', { name: '1 November 2026' })).toHaveFocus();
  expect(change).not.toHaveBeenCalled();
  await userEvent.keyboard('{Enter}');
  expect(change).toHaveBeenLastCalledWith(new Date(2026, 10, 1));
});

it.each([DatePicker, TimePicker])(
  'clears an uncontrolled picker while preserving the Date-only change callback',
  async (Picker) => {
    const onChange = vi.fn(),
      onClear = vi.fn();
    const view = render(
      <form>
        <Picker defaultValue={date(15, 9)} required clearable name="when" onChange={onChange} onClear={onClear} />
      </form>,
    );
    expect(screen.getByRole('combobox')).not.toHaveValue('');
    await userEvent.click(screen.getByRole('button', { name: /Clear/ }));
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(onClear).toHaveBeenCalledOnce();
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      expect(view.container.querySelector('form')!.checkValidity()).toBe(false);
    });
    view.rerender(
      <form>
        <Picker value={null} defaultValue={date(15, 9)} />
      </form>,
    );
    expect(screen.getByRole('combobox')).toHaveValue('');
  },
);

it('constrains time drafts to clock bounds and minute marks and submits the accepted time', async () => {
  const change = vi.fn();
  render(
    <TimePicker
      defaultValue={date(15, 8, 59)}
      minTime={date(1, 9)}
      maxTime={date(1, 17)}
      minuteStep={15}
      onChange={change}
    />,
  );
  await userEvent.click(screen.getByRole('combobox'));
  const dialog = await screen.findByRole('dialog');
  const hours = within(dialog).getByRole('spinbutton', { name: 'Hours' });
  const minutes = within(dialog).getByRole('spinbutton', { name: 'Minutes' });
  expect(hours).toHaveAttribute('aria-valuenow', '9');
  expect(minutes).toHaveAttribute('aria-valuenow', '0');
  fireEvent.keyDown(minutes, { key: 'ArrowUp' });
  expect(minutes).toHaveAttribute('aria-valuenow', '15');
  fireEvent.keyDown(hours, { key: 'End' });
  expect(hours).toHaveAttribute('aria-valuenow', '17');
  expect(minutes).toHaveAttribute('aria-valuenow', '0');
  await userEvent.click(within(dialog).getByRole('button', { name: 'Ok' }));
  expect(change).toHaveBeenLastCalledWith(date(15, 17), expect.anything());
});

it('validates overnight clock ranges independently of the date part', () => {
  const view = render(
    <form>
      <TimePicker value={date(15, 23, 30)} minTime={date(1, 22)} maxTime={date(1, 2)} minuteStep={30} />
    </form>,
  );
  const form = view.container.querySelector('form')!;
  expect(form.checkValidity()).toBe(true);
  view.rerender(
    <form>
      <TimePicker
        value={date(15, 12)}
        minTime={date(1, 22)}
        maxTime={date(1, 2)}
        minuteStep={30}
        labels={{ unavailable: 'Outside shift' }}
      />
    </form>,
  );
  act(() => {
    expect(form.checkValidity()).toBe(false);
  });
  expect(screen.getByText('Outside shift')).toBeInTheDocument();
});

it('disables confirmation when no minute marks satisfy the time bounds', async () => {
  render(<TimePicker defaultValue={date(15, 9, 2)} minTime={date(1, 9, 1)} maxTime={date(1, 9, 4)} minuteStep={15} />);
  await userEvent.click(screen.getByRole('combobox'));
  expect(await screen.findByRole('button', { name: 'Ok' })).toBeDisabled();
});
