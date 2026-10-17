import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Checkbox from '../src/material/checkbox';
import Input from '../src/material/input';
import RadioButton, { RadioGroup } from '../src/material/radio';
import Switch from '../src/material/switch';

const reset = async (form: HTMLFormElement) =>
  act(async () => {
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 5));
  });

describe('native form controls', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('leaves control values and derived visuals alone when a form reset is cancelled', async () => {
    const view = render(
      <form onReset={(event) => event.preventDefault()}>
        <Input label="Name" defaultValue="Ada" maxLength={10} />
        <Checkbox label="Alerts" defaultChecked />
      </form>,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Grace' } });
    await userEvent.click(screen.getByRole('checkbox'));
    await act(async () => {
      view.container.querySelector('form')!.reset();
      await new Promise((resolve) => setTimeout(resolve, 5));
    });
    expect(screen.getByRole('textbox')).toHaveValue('Grace');
    expect(screen.getByText('5/10')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it.each([
    ['checkbox', Checkbox],
    ['switch', Switch],
  ] as const)('%s supports defaults, native submission, cancellation, and reset', async (role, Control) => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <form>
        <Control name="alerts" label="Alerts" defaultChecked onChange={change} />
      </form>,
    );
    const input = screen.getByRole(role, { name: 'Alerts' });
    const form = view.container.querySelector('form')!;
    expect(input).toBeChecked();
    expect(new FormData(form).get('alerts')).toBe('on');
    await user.click(input);
    expect(input).not.toBeChecked();
    expect(new FormData(form).has('alerts')).toBe(false);
    view.rerender(
      <form>
        <Control name="alerts" label="Alerts" defaultChecked onChange={change} />
      </form>,
    );
    expect(input).not.toBeChecked();
    await act(async () => form.reset());
    expect(input).toBeChecked();
    expect(change).toHaveBeenCalledTimes(1);
    view.rerender(
      <form>
        <Control
          name="alerts"
          label="Alerts"
          defaultChecked
          onChange={change}
          onClick={(event) => event.preventDefault()}
        />
      </form>,
    );
    await user.click(input);
    expect(input).toBeChecked();
    expect(change).toHaveBeenCalledTimes(1);
  });

  it('keeps uncontrolled radio visuals in sync with native peer selection', async () => {
    const user = userEvent.setup();
    render(
      <form>
        <RadioButton name="size" label="Small" defaultChecked />
        <RadioButton name="size" label="Large" />
      </form>,
    );
    await user.click(screen.getByRole('radio', { name: 'Large' }));
    const small = screen.getByRole('radio', { name: 'Small' });
    expect(small).not.toBeChecked();
    expect(small.parentElement?.querySelector('.rt-radio-radioChecked')).toBeNull();
    expect(screen.getByRole('radio', { name: 'Large' })).toBeChecked();
  });

  it('resets a text counter and filled label with its externally associated form', async () => {
    const view = render(
      <>
        <form id="profile" />
        <Input form="profile" label="Name" maxLength={10} defaultValue="Ada" />
      </>,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Grace' } });
    expect(screen.getByText('5/10')).toBeInTheDocument();
    await act(async () => view.container.querySelector('form')!.reset());
    expect(screen.getByRole('textbox')).toHaveValue('Ada');
    await waitFor(() => expect(screen.getByText('3/10')).toBeInTheDocument());
  });

  it('announces a mixed checkbox and exposes the native indeterminate state', () => {
    render(<Checkbox label="All" checked={false} indeterminate />);
    const control = screen.getByRole('checkbox');
    expect(control).toBePartiallyChecked();
    expect((control as HTMLInputElement).indeterminate).toBe(true);
    fireEvent.click(control);
    expect((control as HTMLInputElement).indeterminate).toBe(true);
  });

  it('composes radio groups through wrappers, resets defaults, and invokes both callbacks', async () => {
    const child = vi.fn(),
      group = vi.fn();
    const view = render(
      <form>
        <RadioGroup name="size" defaultValue="s" onChange={group}>
          <div>
            <RadioButton value="s" label="Small" />
          </div>
          <>
            <RadioButton value="l" label="Large" onChange={child} />
          </>
        </RadioGroup>
      </form>,
    );
    await userEvent.click(screen.getByRole('radio', { name: 'Large' }));
    expect(child).toHaveBeenCalledOnce();
    expect(group).toHaveBeenCalledWith('l', expect.anything());
    expect(screen.getByRole('radio', { name: 'Small' })).not.toBeChecked();
    await act(async () => view.container.querySelector('form')!.reset());
    expect(screen.getByRole('radio', { name: 'Small' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Large' })).not.toBeChecked();
    await waitFor(() => expect(view.container.querySelectorAll('.rt-radio-radioChecked')).toHaveLength(1));
  });
});

it('forwards textarea-specific native attributes', () => {
  render(<Input multiline label="Notes" rows={3} cols={40} wrap="hard" />);
  expect(screen.getByRole('textbox')).toHaveAttribute('wrap', 'hard');
  expect(screen.getByRole('textbox')).toHaveAttribute('cols', '40');
});

describe('radio group validation', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('supports required radio groups associated with an external form', async () => {
    const view = render(
      <>
        <form id="delivery" />
        <RadioGroup name="delivery" form="delivery" required aria-label="Delivery">
          <RadioButton label="Daily" value="daily" />
          <RadioButton label="Weekly" value="weekly" />
        </RadioGroup>
      </>,
    );
    const form = view.container.querySelector('form')!;
    expect(form.checkValidity()).toBe(false);
    await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
    expect(form.checkValidity()).toBe(true);
    expect(new FormData(form).get('delivery')).toBe('weekly');
    await reset(form);
    expect(form.checkValidity()).toBe(false);
  });
});
