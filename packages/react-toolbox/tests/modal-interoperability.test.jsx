import React, { StrictMode, createRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Dialog, {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../src/material/dialog';
import Drawer from '../src/material/drawer';
import { IconMenu, MenuItem } from '../src/material/menu';

const advance = (milliseconds = 30) => act(() => vi.advanceTimersByTime(milliseconds));
beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

function CompoundDialog({ active, title, onClose, children, trigger }) {
  return (
    <DialogRoot open={active} onOpenChange={(open) => !open && onClose()}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>{title}</DialogTitle>
          {children}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
function ConvenienceDialog({ active, title, onClose, children, trigger }) {
  return (
    <>
      {trigger}
      <Dialog active={active} title={title} onEscKeyDown={onClose}>
        {children}
      </Dialog>
    </>
  );
}
function ConvenienceDrawer({ active, title, onClose, children, trigger }) {
  return (
    <>
      {trigger}
      <Drawer active={active} aria-label={title} onEscKeyDown={onClose}>
        {children}
      </Drawer>
    </>
  );
}

describe('mixed modal ownership', () => {
  for (const [name, Outer, Inner] of [
    ['compound dialog inside convenience dialog', ConvenienceDialog, CompoundDialog],
    ['convenience dialog inside compound dialog', CompoundDialog, ConvenienceDialog],
    ['compound dialog inside convenience drawer', ConvenienceDrawer, CompoundDialog],
    ['convenience drawer inside compound dialog', CompoundDialog, ConvenienceDrawer],
  ]) {
    it(`contains focus and dismisses one layer for ${name}`, () => {
      const opener = document.createElement('button');
      document.body.append(opener);
      opener.focus();
      function Example() {
        const [outer, setOuter] = useState(true);
        const [inner, setInner] = useState(false);
        return (
          <Outer active={outer} title="Outer" onClose={() => setOuter(false)}>
            <Inner
              active={inner}
              title="Inner"
              onClose={() => setInner(false)}
              trigger={<button onClick={() => setInner(true)}>Open inner</button>}
            >
              <button>Inner field</button>
            </Inner>
          </Outer>
        );
      }
      const view = render(
        <StrictMode>
          <Example />
        </StrictMode>,
      );
      advance();
      const trigger = screen.getByRole('button', { name: 'Open inner' });
      act(() => trigger.focus());
      fireEvent.click(trigger);
      advance();
      const inner = screen.getByRole('dialog', { name: 'Inner' });
      expect(inner.contains(document.activeElement)).toBe(true);
      act(() => opener.focus());
      expect(inner.contains(document.activeElement)).toBe(true);
      expect(document.body).toHaveAttribute('data-scroll-locked');
      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
      advance(600);
      advance();
      expect(screen.queryByRole('dialog', { name: 'Inner' })).toBeNull();
      expect(screen.getByRole('dialog', { name: 'Outer' })).toBeInTheDocument();
      expect(trigger).toHaveFocus();
      expect(document.body).toHaveAttribute('data-scroll-locked');
      fireEvent.keyDown(trigger, { key: 'Escape' });
      advance(600);
      advance();
      expect(screen.queryByRole('dialog', { name: 'Outer' })).toBeNull();
      expect(document.body).not.toHaveAttribute('data-scroll-locked');
      view.unmount();
      expect(opener).not.toHaveAttribute('aria-hidden');
      opener.remove();
    });
  }

  it('honors child autofocus when a convenience dialog opens within a compound dialog', () => {
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <CompoundDialog active title="Outer" onClose={() => undefined}>
          <button onClick={() => setOpen(true)}>Rename</button>
          <Dialog active={open} title="Rename draft">
            <input aria-label="Draft name" autoFocus />
          </Dialog>
        </CompoundDialog>
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole('button', { name: 'Rename' }));
    expect(screen.getByRole('textbox', { name: 'Draft name' })).toHaveFocus();
    advance();
    expect(screen.getByRole('textbox', { name: 'Draft name' })).toHaveFocus();
  });

  it('preserves the surface, child state and ref when an exit is cancelled', () => {
    const ref = createRef();
    function Counter() {
      const [count, setCount] = useState(0);
      return <button onClick={() => setCount(count + 1)}>Count {count}</button>;
    }
    const content = (active) => (
      <Dialog ref={ref} active={active} title="Draft" delay={200}>
        <Counter />
      </Dialog>
    );
    const view = render(content(true));
    const node = ref.current;
    fireEvent.click(screen.getByRole('button', { name: 'Count 0' }));
    view.rerender(content(false));
    expect(node).toHaveAttribute('inert');
    expect(document.body).toHaveAttribute('data-scroll-locked');
    advance(100);
    view.rerender(content(true));
    advance(30);
    expect(ref.current).toBe(node);
    expect(screen.getByRole('button', { name: 'Count 1' })).toBeInTheDocument();
    expect(node.contains(document.activeElement)).toBe(true);
  });

  it('lets a convenience popup consume Escape before its containing modal', () => {
    const onEscape = vi.fn();
    render(
      <Dialog active title="Settings" onEscKeyDown={onEscape}>
        <IconMenu icon="more_vert" aria-label="Actions">
          <MenuItem caption="Archive" />
        </IconMenu>
      </Dialog>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    advance();
    expect(screen.getByRole('menu')).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(onEscape).not.toHaveBeenCalled();
    fireEvent.keyDown(document.activeElement, { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledOnce();
  });
});
