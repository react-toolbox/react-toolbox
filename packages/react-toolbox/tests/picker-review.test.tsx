import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import DatePicker from '../src/material/date-picker/DatePicker';
import TimePicker from '../src/material/time-picker/TimePicker';

afterEach(cleanup);

describe('picker constraint consistency', () => {
  it('rejects a supplied unavailable date and revalidates when constraints change', () => {
    const date = new Date(2026, 9, 16);
    const view = render(
      <form>
        <DatePicker
          value={date}
          name="date"
          label="Date"
          isDateUnavailable={() => true}
          labels={{ unavailable: 'Select another date' }}
        />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    act(() => {
      expect(form.checkValidity()).toBe(false);
    });
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Select another date')).toBeInTheDocument();
    view.rerender(
      <form>
        <DatePicker value={date} name="date" label="Date" isDateUnavailable={() => false} />
      </form>,
    );
    expect(form.checkValidity()).toBe(true);
    expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid');
  });

  it.each([7, 45])('wraps minute marks for a %i-minute step without skipping or stalling', (step) => {
    const last = Math.floor(59 / step) * step;
    render(<TimePicker defaultOpen defaultValue={new Date(2026, 9, 16, 9, last)} minuteStep={step} />);
    const minutes = screen.getByRole('spinbutton', { name: 'Minutes' });
    fireEvent.keyDown(minutes, { key: 'ArrowUp' });
    expect(minutes).toHaveAttribute('aria-valuenow', '0');
    fireEvent.keyDown(minutes, { key: 'ArrowDown' });
    expect(minutes).toHaveAttribute('aria-valuenow', String(last));
  });
});
