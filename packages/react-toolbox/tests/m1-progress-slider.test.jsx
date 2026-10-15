import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Slider from '../src/material/slider';
import ProgressBar from '../src/material/progress-bar';
import Button from '../src/material/button';

function ControlledSlider(props) {
  const [value, setValue] = useState(props.value ?? 20);
  return <Slider {...props} value={value} onChange={setValue} />;
}

describe('M1 slider interaction', () => {
  it('calls a cancelled knob gesture handler once without starting a drag', () => {
    const onMouseDown = vi.fn(event => event.preventDefault());
    const onTouchStart = vi.fn(event => event.preventDefault());
    const onDragStart = vi.fn();
    const onChange = vi.fn();
    render(<Slider onMouseDown={onMouseDown} onTouchStart={onTouchStart} onDragStart={onDragStart} onChange={onChange} />);
    const knob = screen.getByRole('slider').querySelector('.rt-slider-knob');
    fireEvent.mouseDown(knob, { button: 0, clientX: 40 });
    fireEvent.touchStart(knob, { touches: [{ pageX: 40, pageY: 0 }] });
    expect(onMouseDown).toHaveBeenCalledOnce();
    expect(onTouchStart).toHaveBeenCalledOnce();
    expect(onDragStart).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });
  it('supports keyboard range selection without scrolling or capturing unrelated keys', () => {
    render(<><ControlledSlider aria-label="Volume" step={5} /><input aria-label="Other field" /></>);
    const slider = screen.getByRole('slider', { name: 'Volume' });
    act(() => slider.focus());
    expect(fireEvent.keyDown(slider, { key: 'ArrowRight' })).toBe(false);
    expect(slider).toHaveAttribute('aria-valuenow', '25');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    fireEvent.keyDown(slider, { key: 'ArrowDown' });
    expect(slider).toHaveAttribute('aria-valuenow', '15');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(slider).toHaveAttribute('aria-valuenow', '100');
    fireEvent.keyDown(slider, { key: 'Home' });
    fireEvent.keyDown(slider, { key: 'ArrowDown' });
    expect(slider).toHaveAttribute('aria-valuenow', '0');
    expect(() => fireEvent.keyDown(slider, { key: 'Enter' })).not.toThrow();
    const input = screen.getByLabelText('Other field');
    act(() => input.focus());
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });

  it('keeps editable text navigation separate and allows cancelling a numeric edit', () => {
    const onChange = vi.fn();
    render(<Slider editable aria-label="Brightness" value={20} step={1} onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Brightness value' });
    act(() => input.focus());
    fireEvent.change(input, { target: { value: '75' } });
    fireEvent.keyDown(input, { key: 'ArrowLeft' });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('20');
    act(() => input.focus());
    fireEvent.change(input, { target: { value: '35' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenLastCalledWith(35, expect.anything());
  });

  it('blocks disabled pointer and keyboard changes and cleans up cancelled touch drags', () => {
    const onChange = vi.fn();
    const onDragStop = vi.fn();
    const view = render(<Slider disabled aria-label="Volume" onChange={onChange} onDragStop={onDragStop} />);
    const slider = screen.getByRole('slider');
    fireEvent.mouseDown(slider, { button: 0, clientX: 40 });
    fireEvent.touchStart(slider, { touches: [{ pageX: 40, pageY: 0 }] });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
    expect(slider).toHaveAttribute('tabindex', '-1');
    view.rerender(<Slider aria-label="Volume" onChange={onChange} onDragStop={onDragStop} />);
    fireEvent.touchStart(slider, { touches: [{ pageX: 40, pageY: 0 }] });
    fireEvent.touchCancel(document);
    expect(onDragStop).toHaveBeenCalledOnce();
    onChange.mockClear();
    fireEvent.touchMove(document, { touches: [{ pageX: 80, pageY: 0 }] });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('uses a stable range origin even when the hollow minimum thumb shortens the painted rail', () => {
    const onChange = vi.fn();
    render(<Slider min={0} max={100} value={0} step={1} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    vi.spyOn(slider, 'getBoundingClientRect').mockReturnValue({ left: 10, width: 200 });
    vi.spyOn(slider.querySelector('.rt-slider-knob'), 'getBoundingClientRect').mockReturnValue({ width: 32 });
    fireEvent.mouseDown(slider, { button: 0, clientX: 126 });
    expect(onChange).toHaveBeenLastCalledWith(50);
    fireEvent.mouseUp(document);
  });

  it('preserves fractional labels and min offsets, including scientific-notation steps', () => {
    const view = render(<ControlledSlider pinned min={0.1} value={0.1} max={2.1} step={1} />);
    let slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveAttribute('aria-valuenow', '1.1');
    expect(slider.querySelector('[data-value]')).toHaveAttribute('data-value', '1.1');
    view.unmount();
    render(<ControlledSlider pinned value={0} max={1} step={0.0000001} />);
    slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(Number(slider.getAttribute('aria-valuenow'))).toBe(0.0000001);
  });

  it('aligns discrete stops to their values when the step does not divide the range', () => {
    const onChange = vi.fn();
    render(<Slider snaps min={0} max={10} step={3} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    expect([...slider.querySelectorAll('.rt-slider-snap')].map(stop => stop.style.left)).toEqual(['0%', '30%', '60%', '90%', '100%']);
    vi.spyOn(slider, 'getBoundingClientRect').mockReturnValue({ left: 0, width: 200 });
    vi.spyOn(slider.querySelector('.rt-slider-knob'), 'getBoundingClientRect').mockReturnValue({ width: 32 });
    fireEvent.mouseDown(slider, { button: 0, clientX: 216 });
    expect(onChange).toHaveBeenLastCalledWith(10);
    fireEvent.mouseUp(document);
  });

  it('returns from an uneven maximum through the same discrete keyboard stops', () => {
    render(<ControlledSlider snaps min={0} max={10} value={10} step={3} />);
    const slider = screen.getByRole('slider');
    for (const value of [9, 6, 3, 0]) {
      fireEvent.keyDown(slider, { key: 'ArrowLeft' });
      expect(slider).toHaveAttribute('aria-valuenow', String(value));
    }
    for (const value of [3, 6, 9, 10]) {
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(slider).toHaveAttribute('aria-valuenow', String(value));
    }
  });

  it('preserves a fractional maximum with a whole-number step', () => {
    render(<ControlledSlider pinned editable min={0} max={2.5} value={1} step={1} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(slider).toHaveAttribute('aria-valuenow', '2.5');
    expect(slider.querySelector('[data-value]')).toHaveAttribute('data-value', '2.5');
    expect(slider.querySelector('.rt-slider-knob').style.left).toBe('100%');
    expect(screen.getByRole('textbox')).toHaveValue('2.5');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider).toHaveAttribute('aria-valuenow', '2');
  });
});

describe('M1 progress meaning', () => {
  it('announces known progress and does not invent a percentage for an unknown wait', () => {
    const view = render(<ProgressBar mode="determinate" min={10} max={50} value={75} aria-label="Uploading" />);
    const progress = screen.getByRole('progressbar', { name: 'Uploading' });
    expect(progress).toHaveAttribute('aria-valuenow', '50');
    expect(progress.querySelector('[data-ref="value"]')).toHaveStyle({ transform: 'scaleX(1)' });
    view.rerender(<ProgressBar mode="indeterminate" aria-label="Uploading" />);
    expect(progress).not.toHaveAttribute('aria-valuenow');
  });

  it('renders genuinely empty circular progress at zero and handles a collapsed range', () => {
    const view = render(<ProgressBar type="circular" mode="determinate" value={0} />);
    expect(document.querySelector('circle')).toHaveStyle({ opacity: '0' });
    view.rerender(<ProgressBar type="circular" mode="determinate" min={5} max={5} value={5} />);
    expect(document.querySelector('circle').style.strokeDasharray).not.toMatch(/NaN|Infinity/);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '5');
  });
});

it('ends ink feedback when a touch is cancelled and ignores secondary mouse buttons', () => {
  render(<Button label="Press" />);
  const button = screen.getByRole('button', { name: 'Press' });
  vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 88, height: 36 });
  fireEvent.mouseDown(button, { button: 2 });
  expect(button.querySelector('.rt-ripple-ripple')).toBeNull();
  fireEvent.touchStart(button, { touches: [{ pageX: 40, pageY: 18 }] });
  const ink = button.querySelector('.rt-ripple-ripple');
  expect(ink).toHaveClass('rt-ripple-rippleActive');
  fireEvent.touchCancel(document);
  expect(ink).not.toHaveClass('rt-ripple-rippleActive');
  const transition = new Event('transitionend', { bubbles: true });
  Object.defineProperty(transition, 'propertyName', { value: 'opacity' });
  fireEvent(ink, transition);
  expect(ink).not.toBeInTheDocument();
  fireEvent.mouseDown(button, { button: 0, clientX: 40, clientY: 18 });
  expect(button.querySelector('.rt-ripple-ripple')).toHaveClass('rt-ripple-rippleActive');
  fireEvent.mouseUp(document);
});
