import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Autocomplete from '../src/material/autocomplete/Autocomplete';
import Dropdown from '../src/material/dropdown/Dropdown';
import Input from '../src/material/input/Input';
import DatePicker from '../src/material/date-picker/DatePicker';
import Calendar from '../src/material/date-picker/Calendar';
import TimePicker from '../src/material/time-picker/TimePicker';

const selectedDate = new Date(2026, 9, 15, 9, 30);

describe('picker form validation', () => {
  it.each([DatePicker, TimePicker])('validates empty and populated values in an external form', async (Picker) => {
    const view = render(
      <>
        <form id="appointment" />
        <Picker name="when" form="appointment" label="When" required />
      </>,
    );
    const form = view.container.querySelector('form')!;
    act(() => {
      expect(form.checkValidity()).toBe(false);
    });
    const field = screen.getByRole('combobox', { name: /When/ });
    expect(field).toHaveFocus();
    expect(field).toHaveAttribute('aria-invalid', 'true');
    view.rerender(
      <>
        <form id="appointment" />
        <Picker name="when" form="appointment" label="When" required value={selectedDate} />
      </>,
    );
    expect(form.checkValidity()).toBe(true);
    expect(new FormData(form).getAll('when')).toHaveLength(1);
    view.rerender(
      <>
        <form id="appointment" />
        <Picker name="when" form="appointment" label="When" required disabled />
      </>,
    );
    expect(form.checkValidity()).toBe(true);
    expect(new FormData(form).has('when')).toBe(false);
  });

  it.each([DatePicker, TimePicker])('returns an initially empty picker to required state on reset', async (Picker) => {
    const view = render(
      <form>
        <Picker name="when" label="When" required />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(await screen.findByRole('button', { name: 'Ok' }));
    expect(form.checkValidity()).toBe(true);
    await act(async () => {
      form.reset();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    act(() => {
      expect(form.checkValidity()).toBe(false);
    });
  });
});

it('preserves a closed dropdown typeahead match when opening', () => {
  const change = vi.fn();
  render(<Dropdown source={['Alpha', 'Beta']} onChange={change} />);
  const input = screen.getByRole('combobox');
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'Escape' });
  fireEvent.keyDown(input, { key: 'b' });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(change).toHaveBeenCalledWith('Beta', expect.anything());
});

it('restores an uncontrolled single query on blur without changing its submitted selection', () => {
  const query = vi.fn();
  const view = render(
    <form>
      <Autocomplete
        multiple={false}
        name="choice"
        defaultValue="alpha"
        source={{ alpha: 'Alpha', beta: 'Beta' }}
        onQueryChange={query}
      />
    </form>,
  );
  const input = screen.getByRole('combobox');
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'Be' } });
  fireEvent.blur(input);
  expect(input).toHaveValue('Alpha');
  expect(new FormData(view.container.querySelector('form')!).get('choice')).toBe('alpha');
  expect(query).toHaveBeenLastCalledWith('Alpha');
});

it('preserves controlled queries on blur and uncontrolled typing when remote options change', () => {
  const view = render(<Autocomplete multiple={false} value="alpha" query="Be" source={{ alpha: 'Alpha' }} />);
  const input = screen.getByRole('combobox');
  fireEvent.focus(input);
  fireEvent.blur(input);
  expect(input).toHaveValue('Be');
  view.rerender(<Autocomplete multiple={false} value="alpha" source={{ alpha: 'Alpha' }} />);
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'Be' } });
  view.rerender(<Autocomplete multiple={false} value="alpha" source={{ beta: 'Beta' }} />);
  expect(input).toHaveValue('Be');
});

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

it('localizes time controls without fixed document IDs', async () => {
  const view = render(
    <TimePicker
      defaultValue={selectedDate}
      format="ampm"
      labels={{ dialog: 'Hora', hours: 'Horas', minutes: 'Minutos', am: 'Mañana', pm: 'Tarde' }}
    />,
  );
  await userEvent.click(screen.getByRole('combobox'));
  const dialog = await screen.findByRole('dialog', { name: 'Hora' });
  await userEvent.click(within(dialog).getByRole('spinbutton', { name: 'Minutos' }));
  expect(within(dialog).getByRole('spinbutton', { name: 'Horas' })).toBeInTheDocument();
  expect(within(dialog).getByRole('button', { name: 'Mañana' })).toBeInTheDocument();
  expect(view.container.ownerDocument.getElementById('hours')).toBeNull();
  expect(view.container.ownerDocument.getElementById('minutes')).toBeNull();
});

it('forwards textarea-specific native attributes', () => {
  render(<Input multiline label="Notes" rows={3} cols={40} wrap="hard" />);
  expect(screen.getByRole('textbox')).toHaveAttribute('wrap', 'hard');
  expect(screen.getByRole('textbox')).toHaveAttribute('cols', '40');
});

it('keeps the year chooser reachable when a date bound excludes the selected year', () => {
  render(<Calendar display="years" selectedDate={selectedDate} minDate={new Date(2200, 0, 1)} />);
  expect(screen.getByRole('button', { name: '2200' })).toHaveAttribute('tabindex', '0');
});
