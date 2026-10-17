import { cleanup, fireEvent, render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Calendar from '../src/material/date-picker/Calendar';
import DatePicker from '../src/material/date-picker/DatePicker';

const selectedDate = new Date(2026, 9, 15, 9, 30);

describe('calendar keyboard navigation', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('clamps calendar page navigation and year selection at the end of February', () => {
    const change = vi.fn();
    const view = render(<Calendar selectedDate={new Date(2024, 0, 31)} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('group', { name: 'Calendar' }), { key: 'PageDown' });
    expect(change).toHaveBeenLastCalledWith(new Date(2024, 1, 29), false);
    view.rerender(<Calendar selectedDate={new Date(2024, 1, 29)} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('group', { name: 'Calendar' }), { key: 'PageDown', shiftKey: true });
    expect(change).toHaveBeenLastCalledWith(new Date(2025, 1, 28), false);
    view.rerender(<Calendar display="years" selectedDate={new Date(2024, 1, 29)} onChange={change} />);
    fireEvent.click(screen.getByRole('button', { name: '2025' }));
    expect(change).toHaveBeenLastCalledWith(new Date(2025, 1, 28), false);
  });

  it('does not intercept calendar navigation-button arrows or bypass date limits', () => {
    const change = vi.fn();
    render(<Calendar selectedDate={new Date(2024, 1, 15)} minDate={new Date(2024, 1, 1)} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Next month' }), { key: 'ArrowLeft' });
    fireEvent.keyDown(screen.getByRole('group', { name: 'Calendar' }), { key: 'PageUp' });
    expect(change).not.toHaveBeenCalled();
  });
});

describe('calendar focus, labels, and year bounds', () => {
  it('enters the displayed calendar month by keyboard without committing a date on month navigation', async () => {
    const change = vi.fn();
    render(<Calendar selectedDate={selectedDate} onChange={change} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(change).not.toHaveBeenCalled();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: '15 November 2026' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(change).toHaveBeenCalledWith(new Date(2026, 10, 16, 9, 30), false);
  });

  it('localizes picker controls and permits dates beyond the historical year list', async () => {
    render(
      <DatePicker
        defaultValue={new Date(2125, 0, 1)}
        labels={{
          dialog: 'Fecha',
          chooseYear: 'Año',
          calendar: 'Calendario',
          previousMonth: 'Anterior',
          nextMonth: 'Siguiente',
        }}
        startYear={2120}
        endYear={2130}
      />,
    );
    await userEvent.click(screen.getByRole('combobox'));
    const dialog = await screen.findByRole('dialog', { name: 'Fecha' });
    expect(within(dialog).getByRole('group', { name: 'Calendario' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Siguiente' })).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole('button', { name: 'Año' }));
    expect(within(dialog).getByRole('button', { name: '2125' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(dialog).queryByRole('button', { name: '2119' })).toBeNull();
    expect(within(dialog).queryByRole('button', { name: '2131' })).toBeNull();
  });

  it('keeps the year chooser reachable when a date bound excludes the selected year', () => {
    render(<Calendar display="years" selectedDate={selectedDate} minDate={new Date(2200, 0, 1)} />);
    expect(screen.getByRole('button', { name: '2200' })).toHaveAttribute('tabindex', '0');
  });
});

describe('date constraints', () => {
  afterEach(cleanup);

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
});
