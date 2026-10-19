import { act, render, screen, cleanup, within, fireEvent, waitFor } from '@testing-library/react';
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
  it.each([DatePicker, TimePicker])('keeps readonly values focusable and submitted without opening', async (Picker) => {
    const view = render(
      <form>
        <Picker name="when" label="When" value={selectedDate} readonly required />
      </form>,
    );
    const field = screen.getByRole('textbox');
    expect(field).not.toHaveAttribute('aria-haspopup');
    await userEvent.tab();
    expect(field).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(field).not.toBeDisabled();
    const form = view.container.querySelector('form')!;
    expect(new FormData(form).get('when')).toBe((field as HTMLInputElement).value);
    expect(form.checkValidity()).toBe(true);
    view.rerender(
      <form>
        <Picker name="when" label="When" readonly required />
      </form>,
    );
    expect(form.checkValidity()).toBe(true);
  });

  it('preserves legacy display strings without guessing their locale', () => {
    const view = render(
      <form>
        <DatePicker name="date" label="Date" value="15/10/2026" />
      </form>,
    );
    expect(screen.getByRole('combobox')).toHaveValue('15/10/2026');
    expect(new FormData(view.container.querySelector('form')!).get('date')).toBe('15/10/2026');
  });
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
          <Picker
            label="When"
            name="when"
            defaultValue={new Date(2026, 9, 15, 9, 30)}
            open={false}
            onOpenChange={open}
          />
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

  it.each([DatePicker, TimePicker])('keeps a controlled picker open until dismissal is accepted', async (Picker) => {
    const change = vi.fn();
    const view = render(<Picker open onOpenChange={change} defaultValue={selectedDate} />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(change).toHaveBeenCalledExactlyOnceWith(false);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    view.rerender(<Picker open={false} onOpenChange={change} defaultValue={selectedDate} />);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it.each([DatePicker, TimePicker])(
    'opens once from the keyboard and forwards native keypress handlers',
    async (Picker) => {
      const change = vi.fn();
      const keyPress = vi.fn();
      render(<Picker onOpenChange={change} onKeyPress={keyPress} defaultValue={selectedDate} />);
      const field = screen.getByRole('combobox');
      fireEvent.keyPress(field, { key: 'a', charCode: 97 });
      expect(keyPress).toHaveBeenCalledOnce();
      expect(change).not.toHaveBeenCalled();
      field.focus();
      await userEvent.keyboard('{Enter}');
      expect(change).toHaveBeenCalledExactlyOnceWith(true);
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(change).toHaveBeenLastCalledWith(false);
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      await waitFor(() => expect(field).toHaveFocus());
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
