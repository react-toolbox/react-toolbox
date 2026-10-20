import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { useRipple, type RippleOptions } from '../src/material/ripple';

function RippleButton(options: RippleOptions) {
  const { ripple, ...events } = useRipple(options);
  return <button {...events}>Save{ripple}</button>;
}

it.each([
  { name: 'disabled', options: { disabled: true }, enabled: { disabled: false } },
  { name: 'ripple', options: { ripple: false }, enabled: { ripple: true } },
])('updates ink when the $name option changes', ({ options, enabled }) => {
  const { rerender } = render(<RippleButton {...options} />);
  const button = screen.getByRole('button', { name: 'Save' });

  fireEvent.mouseDown(button, { button: 0 });
  expect(button.querySelector('[data-react-toolbox="ripple"]')).toBeNull();

  rerender(<RippleButton {...enabled} />);
  fireEvent.mouseDown(button, { button: 0 });
  expect(button.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
});

it('uses the latest completion callback and removes finished ink', () => {
  const initialEnded = vi.fn();
  const latestEnded = vi.fn();
  const { rerender } = render(<RippleButton onRippleEnded={initialEnded} />);
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
  expect(initialEnded).toHaveBeenCalledOnce();

  rerender(<RippleButton onRippleEnded={latestEnded} />);
  finishRipple();
  expect(latestEnded).toHaveBeenCalledOnce();
  expect(initialEnded).toHaveBeenCalledOnce();
});
