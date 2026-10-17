import { StrictMode, useState } from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Dialog from '../src/material/dialog';
import Drawer from '../src/material/drawer';

describe('background accessibility', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('hides background content from assistive technology and restores it when a modal closes', () => {
    const view = render(
      <StrictMode>
        <button>Outside</button>
        <Dialog active title="Confirm">
          <button>Inside</button>
        </Dialog>
      </StrictMode>,
    );
    expect(screen.queryByRole('button', { name: 'Outside' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Inside' })).toBeInTheDocument();
    view.rerender(
      <StrictMode>
        <button>Outside</button>
        <Dialog active={false} title="Confirm" />
      </StrictMode>,
    );
    expect(screen.getByRole('button', { name: 'Outside' })).toBeInTheDocument();
  });
});

describe('focus management', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it.each([Dialog, Drawer])('supports custom autofocus and return-focus targets', async (Modal) => {
    const open = vi.fn((event: Event) => {
      event.preventDefault();
      document.getElementById('field')?.focus();
    });
    const close = vi.fn((event: Event) => {
      event.preventDefault();
      document.getElementById('next')?.focus();
    });
    const Example = () => {
      const [active, setActive] = useState(false);
      return (
        <>
          <button id="next">Next task</button>
          <button onClick={() => setActive(true)}>Open</button>
          <Modal active={active} onOpenAutoFocus={open} onCloseAutoFocus={close} aria-label="Editor">
            <input id="field" aria-label="Name" />
            <button onClick={() => setActive(false)}>Done</button>
          </Modal>
        </>
      );
    };
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus());
    await userEvent.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Next task' })).toHaveFocus());
    expect(open).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(1);
  });
});
