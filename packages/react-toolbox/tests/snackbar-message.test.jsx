import React, { useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Snackbar from '../src/material/snackbar';

const advance = (milliseconds) => act(() => vi.advanceTimersByTime(milliseconds));
beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('snackbar message lifetime', () => {
  it('expires once when unrelated rerenders recreate identical JSX', () => {
    const timeout = vi.fn();
    const message = () => (
      <Snackbar active timeout={1000} onTimeout={timeout} label={<strong>Saved</strong>}>
        <span> successfully</span>
      </Snackbar>
    );
    const view = render(message());
    for (let i = 0; i < 9; i++) {
      advance(100);
      view.rerender(message());
    }
    expect(timeout).not.toHaveBeenCalled();
    advance(100);
    expect(timeout).toHaveBeenCalledOnce();
    view.rerender(message());
    advance(1000);
    expect(timeout).toHaveBeenCalledOnce();
  });

  it('gives a changed message its full timeout even when a descendant owns the text', async () => {
    const timeout = vi.fn();
    function Message() {
      const [message, setMessage] = useState('Saved');
      return <span onClick={() => setMessage('Uploaded')}>{message}</span>;
    }
    render(
      <Snackbar active timeout={1000} onTimeout={timeout}>
        <Message />
      </Snackbar>,
    );
    advance(800);
    await act(async () => fireEvent.click(screen.getByText('Saved')));
    advance(999);
    expect(timeout).not.toHaveBeenCalled();
    advance(1);
    expect(timeout).toHaveBeenCalledOnce();
  });
});
