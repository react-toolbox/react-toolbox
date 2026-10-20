import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSnackbarQueue } from '../src/examples/snackbar-queue';

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
const advance = (time: number) => act(() => vi.advanceTimersByTime(time));

describe('snackbar queue recipe', () => {
  it('shows each message sequentially and waits for exit before announcing the next', () => {
    function Example() {
      const queue = useSnackbarQueue();
      return (
        <>
          <button
            onClick={() => {
              queue.enqueue({ label: 'First', timeout: 1000 });
              queue.enqueue({ label: 'Second', timeout: 1000 });
            }}
          >
            Notify
          </button>
          {queue.snackbar}
        </>
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(screen.getByRole('status')).toHaveTextContent('First');
    advance(1000);
    expect(screen.queryByRole('status')).toBeNull();
    advance(500);
    expect(screen.getByRole('status')).toHaveTextContent('Second');
    advance(1500);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('replaces a pending message with a timed result without changing queue order', async () => {
    let resolve!: (value: string) => void;
    const saved = new Promise<string>((done) => {
      resolve = done;
    });
    function Example() {
      const queue = useSnackbarQueue();
      return (
        <>
          <button
            onClick={() => {
              void queue.track(saved, { pending: 'Saving', success: (value) => value, error: () => 'Failed' });
              queue.enqueue({ label: 'Next', timeout: 1000 });
            }}
          >
            Save
          </button>
          {queue.snackbar}
        </>
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    advance(5000);
    expect(screen.getByRole('status')).toHaveTextContent('Saving');
    await act(async () => resolve('Saved'));
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    advance(4000);
    advance(500);
    expect(screen.getByRole('status')).toHaveTextContent('Next');
  });
});
