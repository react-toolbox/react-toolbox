import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import Slider, { SliderRoot, SliderThumb } from '../src/material/slider';

/** Radix's captured pointer can move outside the rail during a drag. */
beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, 'hasPointerCapture').mockReturnValue(true);
});
const rail = () => document.querySelector<HTMLElement>('.rt-slider-container')!;

it.each(['disabled', 'cancelled', 'secondary'] as const)(
  'does not focus the thumb after a %s pointer press',
  (reason) => {
    const onPointerDown = vi.fn((event) => {
      if (reason === 'cancelled') event.preventDefault();
    });
    const onDragStart = vi.fn();
    const onChange = vi.fn();
    render(
      <>
        <button type="button">Before slider</button>
        <Slider
          aria-label="Volume"
          defaultValue={40}
          step={5}
          disabled={reason === 'disabled'}
          onPointerDown={onPointerDown}
          onDragStart={onDragStart}
          onChange={onChange}
        />
      </>,
    );
    const before = screen.getByRole('button', { name: 'Before slider' });
    act(() => before.focus());
    vi.spyOn(rail(), 'getBoundingClientRect').mockReturnValue({ left: 0, width: 100 } as DOMRect);
    fireEvent.pointerDown(document.querySelector('.rt-slider-innerknob')!, {
      button: reason === 'secondary' ? 2 : 0,
      clientX: 40,
    });
    expect(onPointerDown).toHaveBeenCalledOnce();
    expect(onDragStart).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(before).toHaveFocus();
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
  },
);

it('orders drag callbacks around Radix value changes and shows the pressed state only while dragging', () => {
  const calls: string[] = [];
  render(
    <Slider
      aria-label="Volume"
      defaultValue={10}
      step={1}
      onDragStart={() => calls.push('start')}
      onChange={(value) => calls.push(`change:${value}`)}
      onDragStop={() => calls.push('stop')}
      onValueCommit={(value) => calls.push(`commit:${value}`)}
    />,
  );
  const slider = document.querySelector('.rt-slider-slider')!;
  vi.spyOn(rail(), 'getBoundingClientRect').mockReturnValue({ left: 0, width: 100 } as DOMRect);
  fireEvent.pointerDown(rail(), { button: 0, clientX: 25 });
  expect(slider).toHaveClass('rt-slider-pressed');
  fireEvent.pointerMove(rail(), { clientX: 40 });
  fireEvent.pointerUp(rail());
  expect(slider).not.toHaveClass('rt-slider-pressed');
  expect(calls).toEqual(['start', 'change:25', 'change:40', 'stop', 'commit:40']);
  expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
});

it('keeps fractional minimum offsets in keyboard, aria and submitted values', () => {
  const { container } = render(
    <form>
      <Slider aria-label="Dose" name="dose" min={0.1} max={2.1} step={1} defaultValue={0.1} />
    </form>,
  );
  const slider = screen.getByRole('slider');
  fireEvent.keyDown(slider, { key: 'ArrowRight' });
  expect(slider).toHaveAttribute('aria-valuenow', '1.1');
  expect(slider).toHaveAttribute('aria-valuemin', '0.1');
  expect(slider).toHaveAttribute('aria-valuemax', '2.1');
  expect(new FormData(container.querySelector('form')!).get('dose')).toBe('1.1');
  fireEvent.keyDown(slider, { key: 'End' });
  expect(slider).toHaveAttribute('aria-valuenow', '2.1');
});

it('commits a pending edited value before a drag moves the thumb', () => {
  const change = vi.fn();
  render(<Slider editable aria-label="Brightness" defaultValue={20} step={1} onChange={change} />);
  const input = screen.getByRole('textbox', { name: 'Brightness value' });
  act(() => input.focus());
  fireEvent.change(input, { target: { value: '75' } });
  vi.spyOn(rail(), 'getBoundingClientRect').mockReturnValue({ left: 0, width: 100 } as DOMRect);
  fireEvent.pointerDown(rail(), { button: 0, clientX: 30 });
  expect(change.mock.calls.map(([value]) => value)).toEqual([75, 30]);
  expect(input).toHaveValue('30');
});

it('preserves the displayed edit when hydration replays focus before blur', () => {
  const change = vi.fn();
  render(<Slider editable aria-label="Brightness" value={40} step={1} onChange={change} />);
  const input = screen.getByRole('textbox', { name: 'Brightness value' });
  fireEvent.input(input, { target: { value: '72' } });
  fireEvent.focus(input);
  expect(input).toHaveValue('72');
  fireEvent.blur(input);
  expect(change).toHaveBeenLastCalledWith(72, expect.anything());
});

it('leaves modifier shortcuts to the platform and secondary buttons to context menus in compound sliders', () => {
  const change = vi.fn();
  render(
    <SliderRoot defaultValue={[50]} onValueChange={change}>
      <SliderThumb aria-label="Volume" />
    </SliderRoot>,
  );
  const thumb = screen.getByRole('slider');
  fireEvent.keyDown(thumb, { key: 'ArrowRight', altKey: true });
  fireEvent.keyDown(thumb, { key: 'ArrowRight', metaKey: true });
  vi.spyOn(thumb.closest('[data-slot="SliderRoot"]')!, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    width: 100,
  } as DOMRect);
  fireEvent.pointerDown(thumb.closest('[data-slot="SliderRoot"]')!, { button: 2, clientX: 10 });
  expect(change).not.toHaveBeenCalled();
  fireEvent.keyDown(thumb, { key: 'ArrowRight', shiftKey: true });
  expect(change).toHaveBeenLastCalledWith([60]);
});

it('marks the reachable endpoint even when End rounds down to the last full step', () => {
  render(<Slider aria-label="Level" snaps min={0} max={10} step={3} defaultValue={0} />);
  expect([...rail().querySelectorAll<HTMLElement>('.rt-slider-snap')].map((stop) => stop.style.left)).toEqual([
    '0%',
    '30%',
    '60%',
    '90%',
    '100%',
  ]);
  const slider = screen.getByRole('slider');
  fireEvent.keyDown(slider, { key: 'End' });
  expect(slider).toHaveAttribute('aria-valuenow', '9');
  expect(slider).toHaveAttribute('aria-valuemax', '10');
  fireEvent.keyDown(slider, { key: 'ArrowRight' });
  expect(slider).toHaveAttribute('aria-valuenow', '10');
});

it('updates snap markers when the range, step, or visibility changes', () => {
  const { rerender } = render(<Slider aria-label="Level" snaps min={0} max={10} step={5} value={5} />);
  const positions = () => [...rail().querySelectorAll<HTMLElement>('.rt-slider-snap')].map((stop) => stop.style.left);
  expect(positions()).toEqual(['0%', '50%', '100%']);

  rerender(<Slider aria-label="Level" snaps min={0} max={20} step={5} value={10} />);
  expect(positions()).toEqual(['0%', '25%', '50%', '75%', '100%']);
  rerender(<Slider aria-label="Level" snaps min={0} max={20} step={10} value={10} />);
  expect(positions()).toEqual(['0%', '50%', '100%']);
  rerender(<Slider aria-label="Level" snaps min={10} max={30} step={10} value={20} />);
  expect(positions()).toEqual(['0%', '50%', '100%']);

  rerender(<Slider aria-label="Level" min={10} max={30} step={10} value={20} />);
  expect(rail().querySelector('.rt-slider-snaps')).toBeNull();
  rerender(<Slider aria-label="Level" snaps min={10} max={30} step={10} value={20} />);
  expect(positions()).toEqual(['0%', '50%', '100%']);
});

it('bounds dense snap grids while keeping both track endpoints', () => {
  render(<Slider aria-label="Level" snaps min={0} max={10000} step={1} />);
  const markers = [...rail().querySelectorAll<HTMLElement>('.rt-slider-snap')];
  expect(markers.length).toBeLessThanOrEqual(1002);
  expect(markers[0].style.left).toBe('0%');
  expect(markers.at(-1)?.style.left).toBe('100%');
});
