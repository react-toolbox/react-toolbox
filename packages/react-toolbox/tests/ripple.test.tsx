import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Ripple } from '../src/material/ripple';

it.each([
  { name: 'disabled', options: { disabled: true }, override: { disabled: false } },
  { name: 'ripple', options: { ripple: false }, override: { ripple: true } },
])('preserves the factory $name setting until an instance overrides it', ({ options, override }) => {
  const RippleButton = Ripple(options)('button');
  const { rerender } = render(<RippleButton>Save</RippleButton>);
  const button = screen.getByRole('button', { name: 'Save' });

  fireEvent.mouseDown(button, { button: 0 });
  expect(button.querySelector('[data-react-toolbox="ripple"]')).toBeNull();

  rerender(<RippleButton {...override}>Save</RippleButton>);
  fireEvent.mouseDown(button, { button: 0 });
  expect(button.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
});

it('uses the factory completion callback unless an instance supplies one', () => {
  const factoryEnded = vi.fn();
  const instanceEnded = vi.fn();
  const RippleButton = Ripple({ onRippleEnded: factoryEnded })('button');
  const { rerender } = render(<RippleButton>Save</RippleButton>);
  const button = screen.getByRole('button', { name: 'Save' });

  const finishRipple = () => {
    fireEvent.mouseDown(button, { button: 0 });
    fireEvent.mouseUp(document);
    const ink = button.querySelector('[data-react-toolbox="ripple"] > span');
    expect(ink).not.toBeNull();
    const transition = new Event('transitionend', { bubbles: true });
    Object.defineProperty(transition, 'propertyName', { value: 'opacity' });
    fireEvent(ink!, transition);
    expect(button.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
  };

  finishRipple();
  expect(factoryEnded).toHaveBeenCalledOnce();

  rerender(<RippleButton onRippleEnded={instanceEnded}>Save</RippleButton>);
  finishRipple();
  expect(instanceEnded).toHaveBeenCalledOnce();
  expect(factoryEnded).toHaveBeenCalledOnce();
});
