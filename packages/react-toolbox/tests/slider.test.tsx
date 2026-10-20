import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Slider from '../src/material/slider';

/** Radix's captured pointer can move outside the rail during a drag. */
beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, 'hasPointerCapture').mockReturnValue(true);
});

const reset = async (form: HTMLFormElement) =>
  act(async () => {
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 5));
  });

describe('keyboard navigation', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('uses ten slider steps for page keys, clamps bounds, and preserves modifier shortcuts', () => {
    const change = vi.fn();
    render(<Slider aria-label="Volume" value={0.5} min={0} max={1} step={0.1} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'PageUp' });
    expect(change).toHaveBeenLastCalledWith(1);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'PageDown' });
    expect(change).toHaveBeenLastCalledWith(0);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight', ctrlKey: true });
    expect(change).toHaveBeenCalledTimes(2);
  });
});

describe('value commits and form submission', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('submits and resets an uncontrolled slider, committing keyboard and edited values', async () => {
    const commit = vi.fn();
    const view = render(
      <form id="settings">
        <Slider defaultValue={20} name="volume" step={5} editable aria-label="Volume" onValueCommit={commit} />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveAttribute('aria-valuenow', '25');
    expect(new FormData(form).get('volume')).toBe('25');
    expect(commit).toHaveBeenLastCalledWith(25);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    // The real input needs browser focus for its imperative blur to fire.
    fireEvent.blur(input);
    expect(new FormData(form).get('volume')).toBe('42');
    await reset(form);
    expect(slider).toHaveAttribute('aria-valuenow', '20');
    expect(new FormData(form).get('volume')).toBe('20');
  });

  it('uses RTL keyboard direction and commits a drag once at release', () => {
    const commit = vi.fn();
    render(<Slider defaultValue={50} step={1} dir="rtl" onValueCommit={commit} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider).toHaveAttribute('aria-valuenow', '51');
    const rail = document.querySelector('.rt-slider-container')!;
    vi.spyOn(rail, 'getBoundingClientRect').mockReturnValue({ left: 0, width: 100 } as DOMRect);
    fireEvent.pointerDown(rail, { button: 0, clientX: 25 });
    expect(commit).toHaveBeenCalledTimes(1);
    fireEvent.pointerMove(rail, { clientX: 20 });
    fireEvent.pointerUp(rail);
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenLastCalledWith(80);
  });

  it('keeps controlled sliders authoritative through change and form reset', async () => {
    const change = vi.fn();
    const view = render(
      <form>
        <Slider value={30} defaultValue={5} name="volume" onChange={change} step={1} />
      </form>,
    );
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'End' });
    expect(change).toHaveBeenLastCalledWith(100);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30');
    await reset(view.container.querySelector('form')!);
    expect(new FormData(view.container.querySelector('form')!).get('volume')).toBe('30');
  });
});
