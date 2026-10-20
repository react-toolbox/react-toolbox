import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Slider from '../src/material/slider';
import Dropdown from '../src/material/dropdown';
import Autocomplete from '../src/material/autocomplete';

const reset = async (form: HTMLFormElement) =>
  act(async () => {
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 5));
  });

it('honors cancelled slider resets and keeps controlled values without emitting reset changes', async () => {
  const change = vi.fn();
  const view = render(
    <form onReset={(event) => event.preventDefault()}>
      <Slider defaultValue={20} step={5} name="volume" aria-label="Volume" onChange={change} />
    </form>,
  );
  fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
  change.mockClear();
  await reset(view.container.querySelector('form')!);
  expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '25');
  expect(change).not.toHaveBeenCalled();
  view.rerender(
    <form>
      <Slider value={40} step={5} name="volume" aria-label="Volume" onChange={change} />
    </form>,
  );
  await reset(view.container.querySelector('form')!);
  expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
  expect(new FormData(view.container.querySelector('form')!).get('volume')).toBe('40');
  expect(change).not.toHaveBeenCalled();
});

it('keeps slider offsets internal and lets callers cancel rail interactions', () => {
  const nativeInput = vi.fn();
  const change = vi.fn();
  const pointer = vi.fn((event: React.PointerEvent) => event.preventDefault());
  const click = vi.fn();
  const view = render(
    <form onInput={nativeInput}>
      <Slider
        min={0.1}
        max={2.1}
        step={1}
        defaultValue={0.1}
        name="dose"
        aria-label="Dose"
        onChange={change}
        onPointerDown={pointer}
        onClick={click}
      />
    </form>,
  );
  const rail = view.container.querySelector<HTMLElement>('.rt-slider-container')!;
  vi.spyOn(rail, 'getBoundingClientRect').mockReturnValue({ left: 0, width: 100 } as DOMRect);
  fireEvent.pointerDown(rail, { button: 0, clientX: 100 });
  expect(pointer).toHaveBeenCalledOnce();
  expect(change).not.toHaveBeenCalled();
  fireEvent.click(rail);
  expect(click).toHaveBeenCalledOnce();
  fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
  expect(change).toHaveBeenLastCalledWith(1.1);
  expect(nativeInput).not.toHaveBeenCalled();
  expect(new FormData(view.container.querySelector('form')!).get('dose')).toBe('1.1');
});

it('keeps Dropdown IDs internal and restores background focus without suppressing live announcements', async () => {
  const change = vi.fn();
  const view = render(
    <form onChange={change}>
      <button type="button">Outside</button>
      <div aria-live="polite">Saved</div>
      <div inert data-testid="authored-inert">
        Unavailable
      </div>
      <Dropdown
        label="City"
        name="city"
        source={[
          { value: 'Tokyo', label: 'Tokyo' },
          { value: 'London', label: 'London' },
        ]}
      />
    </form>,
  );
  const trigger = screen.getByRole('combobox');
  await userEvent.click(trigger);
  expect(screen.getByText('Saved').closest('[inert]')).toBeNull();
  expect(view.container.querySelector('button')!.closest('[inert]')).not.toBeNull();
  await userEvent.keyboard('{End}{Enter}');
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(view.container.querySelector('form')!).get('city')).toBe('London');
  expect(screen.getByRole('button', { name: 'Outside' }).closest('[inert]')).toBeNull();
  expect(screen.getByTestId('authored-inert')).toHaveAttribute('inert');
});

it('does not clear selected autocomplete values with Escape or expose an empty popup', async () => {
  const change = vi.fn();
  const view = render(<Autocomplete label="People" source={['Ada']} defaultValue={['Ada']} onChange={change} />);
  const input = screen.getByRole('combobox');
  await userEvent.click(input);
  expect(input).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByRole('listbox')).toBeNull();
  await userEvent.keyboard('{Escape}');
  expect(change).not.toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'Remove Ada' })).toBeInTheDocument();
  view.rerender(<Autocomplete label="People" source={[]} emptyMessage="No people" />);
  await userEvent.click(input);
  expect(input).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('No people', { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
});
