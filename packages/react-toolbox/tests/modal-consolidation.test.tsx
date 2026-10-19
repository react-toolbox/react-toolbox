import { StrictMode, createRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Dialog, { DialogContent, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '../src/material/dialog';
import Drawer, { DrawerContent, DrawerRoot, DrawerTitle } from '../src/material/drawer';
import { ThemeProvider } from '../src/material/foundations/theme/ThemeProvider';

/** Convenience Dialog and Drawer compose the Radix-backed parts; Radix owns modality until the delayed exit unmounts. */
const advance = (milliseconds: number) => act(() => vi.advanceTimersByTime(milliseconds));
/** Radix FocusScope returns focus in a timeout after the delayed exit unmounts the parts. */
const settle = () => {
  advance(600);
  advance(0);
};
let opener: HTMLButtonElement;
beforeEach(() => {
  vi.useFakeTimers();
  opener = document.createElement('button');
  opener.textContent = 'Opener';
  document.body.append(opener);
  opener.focus();
});
afterEach(() => {
  cleanup();
  opener.remove();
  if (vi.isFakeTimers()) vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('convenience modals on compound parts', () => {
  it('renders Dialog through DialogContent with its title, className, ref and initial focus', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <StrictMode>
        <Dialog ref={ref} active title="Discard draft?" className="custom-dialog">
          <button>Keep editing</button>
          <button>Discard</button>
        </Dialog>
      </StrictMode>,
    );
    advance(20);
    const dialog = screen.getByRole('dialog', { name: 'Discard draft?' });
    expect(ref.current).toBe(dialog);
    expect(dialog).toHaveAttribute('data-slot', 'DialogContent');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveClass('rt-dialog-dialog', 'rt-dialog-normal', 'rt-dialog-active', 'static', 'w-[50vw]');
    expect(dialog).not.toHaveClass('fixed', '-translate-x-1/2', 'w-[560px]');
    expect(dialog).toHaveClass('custom-dialog');
    const title = screen.getByText('Discard draft?');
    expect(title.tagName).toBe('H6');
    expect(title).toHaveClass('rt-dialog-title', 'm-[0_0_calc(2*var(--unit))]', 'leading-[calc(2.8*var(--unit))]');
    expect(title).not.toHaveClass('m-0');
    expect(dialog.querySelector(':scope > section.rt-dialog-body')).toContainElement(title);
    /** Radix places initial focus on the first tabbable control. */
    expect(screen.getByRole('button', { name: 'Keep editing' })).toHaveFocus();
    expect(document.querySelector('.rt-overlay-overlay')).toHaveClass('rt-overlay-active', 'z-auto');
  });

  it('keeps modality through the delayed exit, then restores the opener and releases the page', () => {
    function Example({ active }: { active: boolean }) {
      return (
        <>
          <button>Outside</button>
          <Dialog active={active} title="Confirm">
            <button>Inside</button>
          </Dialog>
        </>
      );
    }
    const view = render(<Example active />);
    advance(20);
    expect(document.body).toHaveAttribute('data-scroll-locked');
    expect(screen.queryByRole('button', { name: 'Outside' })).toBeNull();
    view.rerender(<Example active={false} />);
    const dialog = document.querySelector('[data-react-toolbox="dialog"]');
    expect(dialog).toHaveAttribute('inert');
    expect(dialog).toHaveAttribute('data-state', 'closed');
    expect(document.body).toHaveAttribute('data-scroll-locked');
    settle();
    expect(dialog).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body).not.toHaveAttribute('data-scroll-locked');
    expect(screen.getByRole('button', { name: 'Outside' })).toBeInTheDocument();
  });

  it('keeps surface identity and child state when an exit is cancelled', () => {
    const ref = createRef<HTMLDivElement>();
    function Counter() {
      const [count, setCount] = useState(0);
      return <button onClick={() => setCount(count + 1)}>Count {count}</button>;
    }
    const content = (active: boolean) => (
      <Dialog ref={ref} active={active} title="Draft" delay={200}>
        <Counter />
      </Dialog>
    );
    const view = render(content(true));
    const node = ref.current;
    fireEvent.click(screen.getByRole('button', { name: 'Count 0' }));
    view.rerender(content(false));
    advance(100);
    view.rerender(content(true));
    advance(30);
    expect(ref.current).toBe(node);
    expect(node).not.toHaveAttribute('inert');
    expect(screen.getByRole('button', { name: 'Count 1' })).toBeInTheDocument();
  });

  it('routes Escape and overlay clicks to the active convenience callbacks without closing itself', () => {
    const escape = vi.fn();
    const overlay = vi.fn();
    render(
      <Dialog active title="Protected" onEscKeyDown={escape} onOverlayClick={overlay}>
        <button>Field</button>
      </Dialog>,
    );
    advance(20);
    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
    fireEvent.click(document.querySelector('.rt-overlay-overlay') as Element);
    expect(escape).toHaveBeenCalledOnce();
    expect(overlay).toHaveBeenCalledOnce();
    settle();
    expect(screen.getByRole('dialog', { name: 'Protected' })).toBeInTheDocument();
  });

  it('honors a cancelled return focus', () => {
    const close = vi.fn((event: Event) => event.preventDefault());
    const view = render(<Dialog active title="Editor" onCloseAutoFocus={close} />);
    advance(20);
    view.rerender(<Dialog active={false} title="Editor" onCloseAutoFocus={close} />);
    settle();
    expect(close).toHaveBeenCalledOnce();
    expect(opener).not.toHaveFocus();
  });

  it('restores the opener after child autofocus and after a whole nested tree unmounts', () => {
    const autofocus = render(
      <Dialog active title="Rename">
        <input aria-label="Name" autoFocus />
      </Dialog>,
    );
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus();
    autofocus.unmount();
    advance(0);
    expect(opener).toHaveFocus();
    const nested = render(
      <StrictMode>
        <Dialog active title="Outer">
          <Dialog active title="Inner">
            <button>Pick</button>
          </Dialog>
        </Dialog>
      </StrictMode>,
    );
    advance(20);
    nested.unmount();
    advance(0);
    expect(opener).toHaveFocus();
  });

  it('falls back to the containing dialog when a nested opener disappears', () => {
    function Example() {
      const [nested, setNested] = useState(false);
      return (
        <Dialog active title="Outer">
          {!nested && <button onClick={() => setNested(true)}>Open picker</button>}
          <Dialog active={nested} title="Inner" onEscKeyDown={() => setNested(false)}>
            <button>Pick</button>
          </Dialog>
        </Dialog>
      );
    }
    render(<Example />);
    advance(20);
    fireEvent.click(screen.getByRole('button', { name: 'Open picker' }));
    advance(20);
    expect(screen.getByRole('button', { name: 'Pick' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
    settle();
    expect(screen.getByRole('dialog', { name: 'Outer' })).toHaveFocus();
  });

  it('falls back across Drawer and Dialog parts when the opener is removed or inert', () => {
    function Example() {
      const [nested, setNested] = useState(false);
      const [locked, setLocked] = useState(false);
      return (
        <Drawer active aria-label="Account">
          <div inert={locked || undefined}>
            <button
              onClick={() => {
                setNested(true);
                setLocked(true);
              }}
            >
              Edit
            </button>
          </div>
          <DialogRoot open={nested} onOpenChange={setNested}>
            <DialogContent aria-describedby={undefined}>
              <DialogTitle>Details</DialogTitle>
              <button>Save</button>
            </DialogContent>
          </DialogRoot>
        </Drawer>
      );
    }
    render(<Example />);
    advance(20);
    const edit = screen.getByRole('button', { name: 'Edit' });
    act(() => edit.focus());
    fireEvent.click(edit);
    advance(20);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
    expect(edit.parentElement).toHaveAttribute('inert');
    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
    settle();
    expect(document.querySelector('[data-react-toolbox="drawer"]')).toHaveFocus();
  });

  it('lets a genuine Trigger win over the fallback opener', () => {
    render(
      <DialogRoot>
        <DialogTrigger>Open details</DialogTrigger>
        <DialogPortal>
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>Details</DialogTitle>
            <button>Save</button>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>,
    );
    // fireEvent does not move focus, so the captured opener differs from the trigger.
    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));
    advance(20);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
    settle();
    expect(screen.getByRole('button', { name: 'Open details' })).toHaveFocus();
  });

  it('keeps permanent drawers nonmodal and contained, without moving focus on mount or unmount', () => {
    const escape = vi.fn();
    const view = render(
      <div>
        <Drawer active insideTree withOverlay={false} aria-label="Sections" onEscKeyDown={escape}>
          <button>Home</button>
        </Drawer>
      </div>,
    );
    advance(20);
    const drawer = screen.getByRole('complementary', { name: 'Sections' });
    expect(view.container).toContainElement(drawer);
    expect(drawer.tagName).toBe('ASIDE');
    expect(drawer).toHaveClass('rt-drawer-drawer', 'rt-drawer-left', 'rt-drawer-active');
    expect(drawer).not.toHaveAttribute('aria-modal');
    expect(drawer).not.toHaveAttribute('tabindex');
    expect(document.querySelector('.rt-overlay-overlay')).toBeNull();
    expect(document.body).not.toHaveAttribute('data-scroll-locked');
    expect(opener).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('button', { name: 'Home' }), {
      key: 'Escape',
    });
    expect(escape).not.toHaveBeenCalled();
    act(() => screen.getByRole('button', { name: 'Home' }).focus());
    view.unmount();
    advance(20);
    expect(opener).not.toHaveFocus();
  });

  it('lets Tab and Shift+Tab leave a permanent drawer', async () => {
    // user-event awaits real timers; Radix FocusScope handles Tab synchronously.
    vi.useRealTimers();
    const user = userEvent.setup();
    render(
      <div>
        <button>Before</button>
        <Drawer active insideTree withOverlay={false} aria-label="Sections">
          <button>Home</button>
        </Drawer>
        <button>After</button>
      </div>,
    );
    act(() => screen.getByRole('button', { name: 'Home' }).focus());
    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    await user.tab({ shift: true });
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
  });

  it('keeps Tab inside a temporary drawer', async () => {
    // user-event awaits real timers; Radix FocusScope handles Tab synchronously.
    vi.useRealTimers();
    const user = userEvent.setup();
    render(
      <div>
        <button>Before</button>
        <Drawer active aria-label="Filters">
          <button>Apply</button>
          <button>Reset</button>
        </Drawer>
      </div>,
    );
    await act(() => new Promise((resolve) => setTimeout(resolve, 20)));
    act(() => screen.getByRole('button', { name: 'Reset' }).focus());
    await user.tab();
    expect(screen.getByRole('button', { name: 'Apply' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Reset' })).toHaveFocus();
  });

  it.each([
    ['Dialog', DialogRoot, DialogContent, DialogTitle],
    ['Drawer', DrawerRoot, DrawerContent, DrawerTitle],
  ] as const)('leaves focus on the outside control that dismissed a nonmodal %s', (_, Root, Content, Title) => {
    render(
      <div>
        <Root modal={false} defaultOpen>
          <Content aria-describedby={undefined}>
            <Title>Panel</Title>
            <button>Inside</button>
          </Content>
        </Root>
        <button>Outside</button>
      </div>,
    );
    advance(20);
    expect(screen.getByRole('button', { name: 'Inside' })).toHaveFocus();
    const outside = screen.getByRole('button', { name: 'Outside' });
    act(() => outside.focus());
    settle();
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(outside).toHaveFocus();
  });

  it('routes Escape only to the top layer of mixed convenience and compound modals', () => {
    const escape = vi.fn();
    function Example() {
      const [nested, setNested] = useState(false);
      return (
        <Dialog active title="Outer" onEscKeyDown={escape}>
          <button onClick={() => setNested(true)}>Edit</button>
          <DialogRoot open={nested} onOpenChange={setNested}>
            <DialogContent aria-describedby={undefined}>
              <DialogTitle>Inner</DialogTitle>
              <button>Save</button>
            </DialogContent>
          </DialogRoot>
        </Dialog>
      );
    }
    render(<Example />);
    advance(20);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    advance(20);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
    settle();
    expect(screen.queryByRole('dialog', { name: 'Inner' })).toBeNull();
    expect(escape).not.toHaveBeenCalled();
    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
    expect(escape).toHaveBeenCalledTimes(1);
  });

  it('renders a temporary drawer with its Material geometry and scoped portal theme', () => {
    const view = render(
      <ThemeProvider variables={{ '--rt-color-primary': 'rebeccapurple' }}>
        <Drawer active type="right" aria-label="Filters">
          <button>Apply</button>
        </Drawer>
      </ThemeProvider>,
    );
    advance(20);
    const drawer = screen.getByRole('dialog', { name: 'Filters' });
    expect(drawer.tagName).toBe('ASIDE');
    expect(drawer).toHaveClass('rt-drawer-drawer', 'rt-drawer-right', 'rt-drawer-active', 'block', 'h-screen');
    expect(drawer).not.toHaveClass('flex', 'h-dvh');
    expect(drawer.style.getPropertyValue('--rt-color-primary')).toBe('rebeccapurple');
    expect(drawer.closest('.rt-drawer-wrapper')).toHaveAttribute('data-react-toolbox-tokens', '--rt-color-primary');
    expect(screen.getByRole('button', { name: 'Apply' })).toHaveFocus();
    view.unmount();
    advance(20);
    expect(opener).toHaveFocus();
  });

  for (const [name, Outer, Inner] of [
    ['an open compound Dialog inside a mounting convenience Dialog', 'dialog', 'compound'],
    ['an open convenience Dialog inside a mounting compound Dialog', 'compound', 'dialog'],
    ['an open compound Dialog inside a mounting convenience Drawer', 'drawer', 'compound'],
    ['an open convenience Drawer inside a mounting compound Dialog', 'compound', 'drawer'],
  ] as const) {
    it(`dismisses only the inner layer when ${name} mount together`, () => {
      const onOuter = vi.fn();
      const onInner = vi.fn();
      const layer = (
        kind: 'dialog' | 'drawer' | 'compound',
        title: string,
        onClose: () => void,
        children?: React.ReactNode,
      ) =>
        kind === 'compound' ? (
          <DialogRoot open onOpenChange={(open) => !open && onClose()}>
            <DialogPortal>
              <DialogContent aria-describedby={undefined}>
                <DialogTitle>{title}</DialogTitle>
                <button>{title} field</button>
                {children}
              </DialogContent>
            </DialogPortal>
          </DialogRoot>
        ) : kind === 'dialog' ? (
          <Dialog active title={title} onEscKeyDown={onClose}>
            <button>{title} field</button>
            {children}
          </Dialog>
        ) : (
          <Drawer active aria-label={title} onEscKeyDown={onClose}>
            <button>{title} field</button>
            {children}
          </Drawer>
        );
      render(layer(Outer, 'Outer', onOuter, layer(Inner, 'Inner', onInner)));
      advance(0);
      expect(screen.getByText('Inner field')).toHaveFocus();
      expect(screen.getByRole('dialog', { name: 'Inner' })).toBeInTheDocument();
      fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
      expect(onInner).toHaveBeenCalledTimes(1);
      expect(onOuter).not.toHaveBeenCalled();
    });
  }
});
