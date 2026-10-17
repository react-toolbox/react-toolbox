import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ClockHours from '../src/material/time-picker/ClockHours';
import TimePicker from '../src/material/time-picker/TimePicker';

const selectedDate = new Date(2026, 9, 15, 9, 30);

describe('clock pointer interactions', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('ignores secondary clock presses and cancels touch without advancing the dial', () => {
    const change = vi.fn(),
      moved = vi.fn();
    const view = render(
      <ClockHours format="ampm" selected={9} spacing={14} radius={100} onChange={change} onHandMoved={moved} />,
    );
    const face = view.container.querySelector<HTMLElement>('.rt-time-picker-face')!;
    vi.spyOn(face, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 200,
      bottom: 200,
      width: 200,
      height: 200,
      toJSON() {},
    });
    fireEvent.mouseDown(face, { button: 2, clientX: 100, clientY: 0 });
    fireEvent.mouseUp(document);
    expect(change).not.toHaveBeenCalled();
    expect(moved).not.toHaveBeenCalled();
    fireEvent.touchStart(face, { touches: [{ clientX: 100, clientY: 0 }] });
    expect(change).toHaveBeenCalledOnce();
    fireEvent.touchCancel(document);
    fireEvent.touchEnd(document);
    fireEvent.touchMove(document, { touches: [{ clientX: 200, clientY: 100 }] });
    expect(change).toHaveBeenCalledOnce();
    expect(moved).not.toHaveBeenCalled();
  });
});

it('localizes time controls without fixed document IDs', async () => {
  const view = render(
    <TimePicker
      defaultValue={selectedDate}
      format="ampm"
      labels={{ dialog: 'Hora', hours: 'Horas', minutes: 'Minutos', am: 'Mañana', pm: 'Tarde' }}
    />,
  );
  await userEvent.click(screen.getByRole('combobox'));
  const dialog = await screen.findByRole('dialog', { name: 'Hora' });
  await userEvent.click(within(dialog).getByRole('spinbutton', { name: 'Minutos' }));
  expect(within(dialog).getByRole('spinbutton', { name: 'Horas' })).toBeInTheDocument();
  expect(within(dialog).getByRole('button', { name: 'Mañana' })).toBeInTheDocument();
  expect(view.container.ownerDocument.getElementById('hours')).toBeNull();
  expect(view.container.ownerDocument.getElementById('minutes')).toBeNull();
});

describe('minute step constraints', () => {
  afterEach(cleanup);

  it.each([7, 45])('wraps minute marks for a %i-minute step without skipping or stalling', (step) => {
    const last = Math.floor(59 / step) * step;
    render(<TimePicker defaultOpen defaultValue={new Date(2026, 9, 16, 9, last)} minuteStep={step} />);
    const minutes = screen.getByRole('spinbutton', { name: 'Minutes' });
    fireEvent.keyDown(minutes, { key: 'ArrowUp' });
    expect(minutes).toHaveAttribute('aria-valuenow', '0');
    fireEvent.keyDown(minutes, { key: 'ArrowDown' });
    expect(minutes).toHaveAttribute('aria-valuenow', String(last));
  });
});
