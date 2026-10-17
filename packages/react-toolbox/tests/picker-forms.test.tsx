import { act, render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, afterEach, vi, describe } from 'vitest';
import DatePicker from '../src/material/date-picker/DatePicker';
import TimePicker from '../src/material/time-picker/TimePicker';

const selectedDate = new Date(2026, 9, 15, 9, 30);

const reset = async (form: HTMLFormElement) =>
  act(async () => {
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 5));
  });

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

describe('picker drafts and form reset', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it.each([DatePicker, TimePicker])(
    'initializes picker drafts from defaultValue and honors controlled visibility',
    async (Picker) => {
      const open = vi.fn();
      const view = render(
        <form>
          <Picker label="When" name="when" defaultValue={new Date(2026, 9, 15, 9, 30)} open={false} onOpenChange={open} />
        </form>,
      );
      const field = screen.getByRole('combobox');
      const initial = (field as HTMLInputElement).value;
      expect(initial).not.toBe('');
      await userEvent.click(field);
      expect(open).toHaveBeenCalledWith(true);
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(new FormData(view.container.querySelector('form')!).get('when')).toBe(initial);
      await reset(view.container.querySelector('form')!);
      expect(field).toHaveValue(initial);
    },
  );

  it('retains an uncontrolled date after confirmation and restores its initial value on reset', async () => {
    const view = render(
      <form>
        <DatePicker label="Date" defaultValue={new Date(2026, 9, 15)} />
      </form>,
    );
    const field = screen.getByRole('combobox');
    await userEvent.click(field);
    const dialog = await screen.findByRole('dialog');
    const day = within(dialog).getByText('20', { selector: '[role="button"]' });
    await userEvent.click(day);
    await userEvent.click(within(dialog).getByRole('button', { name: 'Ok' }));
    expect(field).toHaveValue('20 October 2026');
    await reset(view.container.querySelector('form')!);
    expect(field).toHaveValue('15 October 2026');
  });
});
