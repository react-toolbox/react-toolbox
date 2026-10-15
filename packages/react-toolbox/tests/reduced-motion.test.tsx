import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import usePresence from '../src/material/foundations/motion/usePresence';
import useReducedMotion from '../src/material/foundations/motion/useReducedMotion';
import { useRipple } from '../src/material/ripple/Ripple';
import { useTooltip } from '../src/material/tooltip/Tooltip';

function preference(initial: boolean) {
  let matches = initial;
  const listeners = new Set<() => void>();
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return matches;
    },
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  }));
  return (value: boolean) =>
    act(() => {
      matches = value;
      for (const listener of listeners) listener();
    });
}

function Presence({ active }: { active: boolean }) {
  const { present, visible } = usePresence(active, 500);
  return present ? <div data-testid="presence" data-visible={visible} /> : null;
}

function RippleButton() {
  const { ripple, ...events } = useRipple();
  return <button {...events}>Ripple{ripple}</button>;
}

function TooltipButton() {
  const { tooltip, triggerProps } = useTooltip({ tooltip: 'More information' });
  return (
    <>
      <button {...triggerProps}>Information</button>
      {tooltip}
    </>
  );
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('reduced motion', () => {
  it('keeps the original entrance and retained exit timing without a preference', () => {
    preference(false);
    const { rerender } = render(<Presence active={false} />);
    rerender(<Presence active />);
    expect(screen.getByTestId('presence')).toHaveAttribute('data-visible', 'false');
    act(() => vi.advanceTimersByTime(20));
    expect(screen.getByTestId('presence')).toHaveAttribute('data-visible', 'true');
    rerender(<Presence active={false} />);
    act(() => vi.advanceTimersByTime(499));
    expect(screen.getByTestId('presence')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByTestId('presence')).not.toBeInTheDocument();
  });

  it('shows and unmounts presence immediately when less motion is requested', () => {
    preference(true);
    const { rerender } = render(<Presence active={false} />);
    rerender(<Presence active />);
    expect(screen.getByTestId('presence')).toHaveAttribute('data-visible', 'true');
    rerender(<Presence active={false} />);
    expect(screen.queryByTestId('presence')).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('finishes a pending exit when the preference changes and resumes normal timing when disabled', () => {
    const setPreference = preference(false);
    const { rerender } = render(<Presence active />);
    rerender(<Presence active={false} />);
    expect(screen.getByTestId('presence')).toBeInTheDocument();
    setPreference(true);
    expect(screen.queryByTestId('presence')).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
    setPreference(false);
    rerender(<Presence active />);
    expect(screen.getByTestId('presence')).toHaveAttribute('data-visible', 'false');
    act(() => vi.advanceTimersByTime(20));
    expect(screen.getByTestId('presence')).toHaveAttribute('data-visible', 'true');
  });

  it('works when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    function Indicator() {
      return <output>{String(useReducedMotion())}</output>;
    }
    render(<Indicator />);
    expect(screen.getByRole('status')).toHaveTextContent('false');
  });

  it('omits decorative ripple ink and cleans up ink already pressed when the preference changes', () => {
    const setPreference = preference(false);
    const { container } = render(<RippleButton />);
    fireEvent.mouseDown(screen.getByRole('button'), { button: 0 });
    expect(container.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
    setPreference(true);
    expect(container.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
    fireEvent.mouseUp(document);
    fireEvent.mouseDown(screen.getByRole('button'), { button: 0 });
    expect(container.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
    setPreference(false);
    fireEvent.mouseDown(screen.getByRole('button'), { button: 0 });
    expect(container.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
  });

  it('dismisses a keyboard tooltip without waiting for a transition event', () => {
    preference(true);
    render(<TooltipButton />);
    fireEvent.focus(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
  });

  it('finishes a tooltip exit on preference changes but keeps an active tooltip available', () => {
    const setPreference = preference(false);
    render(<TooltipButton />);
    const trigger = screen.getByRole('button');
    fireEvent.focus(trigger);
    act(() => vi.advanceTimersByTime(0));
    fireEvent.blur(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    setPreference(true);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    setPreference(false);
    fireEvent.focus(trigger);
    act(() => vi.advanceTimersByTime(0));
    fireEvent.blur(trigger);
    fireEvent.focus(trigger);
    act(() => vi.advanceTimersByTime(0));
    setPreference(true);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
