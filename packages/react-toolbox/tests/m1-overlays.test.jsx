import React, { createRef, StrictMode, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Dialog from '../src/material/dialog';
import Drawer from '../src/material/drawer';
import { Overlay } from '../src/material/overlay/Overlay';
import { IconMenu, Menu, MenuItem } from '../src/material/menu';
import { Tabs, Tab } from '../src/material/tabs';
import Tooltip from '../src/material/tooltip';
import Snackbar from '../src/material/snackbar';

const advance = milliseconds => act(() => vi.advanceTimersByTime(milliseconds));
const TipButton = Tooltip('button');

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('M1 overlay and navigation behavior', () => {
  it('preserves delayed entrance, cancellable exit, and the direct dialog DOM ref', () => {
    vi.useFakeTimers();
    const ref = createRef();
    const view = render(<StrictMode><Dialog ref={ref} active={false} delay={80} title="Draft" /></StrictMode>);
    expect(ref.current).toBeNull();
    view.rerender(<StrictMode><Dialog ref={ref} active delay={80} title="Draft" /></StrictMode>);
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
    advance(19);
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
    advance(1);
    expect(screen.getByRole('dialog', { name: 'Draft' })).toBe(ref.current);
    view.rerender(<StrictMode><Dialog ref={ref} active={false} delay={80} title="Draft" /></StrictMode>);
    advance(40);
    expect(ref.current).toHaveAttribute('inert');
    view.rerender(<StrictMode><Dialog ref={ref} active delay={80} title="Draft" /></StrictMode>);
    advance(100);
    expect(screen.getByRole('dialog', { name: 'Draft' })).toBe(ref.current);
    view.rerender(<StrictMode><Dialog ref={ref} active={false} delay={80} title="Draft" /></StrictMode>);
    advance(80);
    expect(ref.current).toBeNull();
  });

  it('uses valid zero-area popup clips before browser measurements exist', () => {
    for (const position of ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']) {
      const html = renderToString(<Menu position={position}><MenuItem caption="Archive" /></Menu>);
      expect(html).not.toContain('undefinedpx');
      expect(html).toContain('clip:rect(0');
    }
  });

  it('does not apply viewport correction twice when measurements are batched before paint', () => {
    vi.useFakeTimers();
    let anchor = 200;
    const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function measureMenu() {
        const top = anchor + (parseFloat(this.parentElement?.style.top) || 0);
        const left = anchor + (parseFloat(this.parentElement?.style.left) || 0);
        return { top, left, bottom: top + 100, right: left + 100, width: 100, height: 100 };
      });
    try {
      render(<Menu active position="topLeft"><MenuItem caption="Archive" /></Menu>);
      advance(0);
      const popup = screen.getByRole('menu').parentElement;
      expect(popup.style.top).toBe('');
      anchor = 1000;
      act(() => {
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));
      });
      expect(parseFloat(popup.style.top)).toBe(window.innerHeight - 24 - 100 - anchor);
      expect(parseFloat(popup.style.left)).toBe(window.innerWidth - 24 - 100 - anchor);
    } finally {
      geometry.mockRestore();
    }
  });

  it('contains dialog focus, labels its title, and restores the opener after closing', () => {
    const opener = document.createElement('button');
    document.body.append(opener);
    opener.focus();
    const view = render(<StrictMode><Dialog active title="Discard draft?">
      <button>Keep editing</button><button>Discard</button>
    </Dialog></StrictMode>);
    const dialog = screen.getByRole('dialog', { name: 'Discard draft?' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveFocus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Keep editing' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: 'Discard' })).toHaveFocus();
    act(() => opener.focus());
    expect(dialog).toHaveFocus();
    view.rerender(<StrictMode><Dialog active={false} title="Discard draft?" /></StrictMode>);
    expect(opener).toHaveFocus();
    expect(dialog).toHaveAttribute('inert');
    view.unmount();
    opener.remove();
  });

  it('only dismisses the top active overlay and does not escape a non-dismissible one', () => {
    const lower = vi.fn();
    const upper = vi.fn();
    const view = render(<><Overlay active theme={{}} onEscKeyDown={lower} /><Overlay active theme={{}} onEscKeyDown={upper} /></>);
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(upper).toHaveBeenCalledOnce();
    expect(lower).not.toHaveBeenCalled();
    view.rerender(<><Overlay active theme={{}} onEscKeyDown={lower} /><Overlay active theme={{}} /></>);
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(lower).not.toHaveBeenCalled();
  });

  it('preserves child autofocus and still restores the dialog opener', () => {
    const opener = document.createElement('button');
    document.body.append(opener);
    opener.focus();
    const view = render(<Dialog active title="Rename"><input aria-label="Name" autoFocus /></Dialog>);
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus();
    view.unmount();
    expect(opener).toHaveFocus();
    opener.remove();
  });

  it('restores the outside opener when an entire nested modal tree unmounts', () => {
    const opener = document.createElement('button');
    document.body.append(opener);
    opener.focus();
    const view = render(<StrictMode><Dialog active title="Outer"><button>Open picker</button>
      <Dialog active title="Inner"><button>Pick</button></Dialog>
    </Dialog></StrictMode>);
    view.unmount();
    expect(opener).toHaveFocus();
    opener.remove();
  });

  it('returns focus to the remaining parent when a nested dialog opener disappears', () => {
    vi.useFakeTimers();
    function Example() {
      const [nested, setNested] = useState(false);
      return <Dialog active title="Outer">
        {!nested && <button onClick={() => setNested(true)}>Open picker</button>}
        <Dialog active={nested} title="Inner" onEscKeyDown={() => setNested(false)} />
      </Dialog>;
    }
    render(<Example />);
    const opener = screen.getByRole('button', { name: 'Open picker' });
    opener.focus();
    fireEvent.click(opener);
    advance(20);
    expect(screen.getByRole('dialog', { name: 'Inner' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'Escape' });
    expect(screen.getByRole('dialog', { name: 'Outer' })).toHaveFocus();
  });

  it('traps temporary drawers but leaves permanent drawers nonmodal', () => {
    const outside = document.createElement('button');
    document.body.append(outside);
    outside.focus();
    const view = render(<Drawer active withOverlay={false} aria-label="Sections"><button>Home</button></Drawer>);
    expect(outside).toHaveFocus();
    expect(screen.getByRole('complementary', { name: 'Sections' })).not.toHaveAttribute('aria-modal');
    view.rerender(<Drawer active aria-label="Sections"><button>Home</button></Drawer>);
    expect(screen.getByRole('dialog', { name: 'Sections' })).toHaveFocus();
    view.unmount();
    expect(outside).toHaveFocus();
    outside.remove();
  });

  it('opens icon menus from the keyboard, skips disabled items, and restores focus on Escape', () => {
    vi.useFakeTimers();
    const select = vi.fn();
    render(<IconMenu aria-label="File options" onSelect={select}>
      <MenuItem caption="Archive" value="archive" />
      <MenuItem caption="Disabled" disabled />
      <MenuItem caption="Delete" value="delete" />
    </IconMenu>);
    const trigger = screen.getByRole('button', { name: 'File options' });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    advance(25);
    const menu = screen.getByRole('menu');
    expect(trigger).toHaveAttribute('aria-controls', menu.id);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'Home' });
    expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'd' });
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'Escape' });
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(select).not.toHaveBeenCalled();
    fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    advance(25);
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    expect(select).toHaveBeenCalledExactlyOnceWith('delete');
  });

  it('announces selected and disabled menu items and blocks disabled keyboard activation', () => {
    const select = vi.fn();
    render(<Menu selected="one" onSelect={select}>
      <MenuItem caption="One" value="one" /><MenuItem caption="Two" value="two" disabled />
    </Menu>);
    expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveAttribute('aria-checked', 'true');
    const disabled = screen.getByRole('menuitemradio', { name: 'Two' });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    fireEvent.keyDown(disabled, { key: ' ' });
    expect(select).not.toHaveBeenCalled();
  });

  it('keeps inline tab content aligned after an empty tab and navigates only enabled visible tabs', () => {
    function Example() {
      const [index, setIndex] = useState(0);
      return <Tabs index={index} onChange={setIndex} hideMode="display" aria-label="View">
        <Tab label="Empty" /><Tab label="Disabled" disabled>Disabled content</Tab>
        <Tab label="Hidden" hidden>Hidden content</Tab><Tab label="Details">Details content</Tab>
      </Tabs>;
    }
    render(<Example />);
    const empty = screen.getByRole('tab', { name: 'Empty' });
    const details = screen.getByRole('tab', { name: 'Details' });
    expect(screen.getByRole('tabpanel')).toBeEmptyDOMElement();
    expect(empty).toHaveAttribute('tabindex', '0');
    expect(details).toHaveAttribute('tabindex', '-1');
    empty.focus();
    fireEvent.keyDown(empty, { key: 'ArrowRight' });
    expect(details).toHaveFocus();
    expect(details).toHaveAttribute('aria-selected', 'true');
    const panel = screen.getByRole('tabpanel', { name: 'Details' });
    expect(panel).toHaveTextContent('Details content');
    expect(details).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', details.id);
    fireEvent.keyDown(details, { key: 'Home' });
    expect(empty).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toBeEmptyDOMElement();
  });

  it('shows tooltips on keyboard focus, preserves existing descriptions, and dismisses on Escape', () => {
    vi.useFakeTimers();
    const focus = vi.fn();
    render(<><span id="extra">Description</span><TipButton tooltip="Add a file" aria-describedby="extra" onFocus={focus}>Add</TipButton></>);
    const trigger = screen.getByRole('button', { name: 'Add' });
    act(() => trigger.focus());
    advance(1);
    const tooltip = screen.getByRole('tooltip');
    expect(trigger).toHaveAttribute('aria-describedby', `extra ${tooltip.id}`);
    expect(focus).toHaveBeenCalledOnce();
    fireEvent.keyDown(trigger, { key: 'Escape' });
    advance(200);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-describedby', 'extra');
    expect(trigger).toHaveFocus();
  });

  it('keeps a keyboard entry when the controlled active tab becomes disabled or hidden', () => {
    const change = vi.fn();
    const view = render(<Tabs onChange={change}><Tab label="First" disabled /><Tab label="Second" /><Tab label="Third" /></Tabs>);
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true');
    view.rerender(<Tabs index={1} onChange={change}><Tab label="First" /><Tab label="Second" hidden /><Tab label="Third" /></Tabs>);
    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('tabindex', '0');
    expect(change).not.toHaveBeenCalled();
  });

  it('uses touch hold and retains the tooltip for 1.5 seconds after release', () => {
    vi.useFakeTimers();
    const click = vi.fn();
    render(<TipButton tooltip="Add a file" onClick={click}>Add</TipButton>);
    const trigger = screen.getByRole('button', { name: 'Add' });
    fireEvent.touchStart(trigger);
    advance(499);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    advance(2);
    expect(screen.getByRole('tooltip')).toHaveClass('rt-tooltip-tooltipActive');
    fireEvent.touchEnd(trigger);
    fireEvent.click(trigger);
    expect(click).not.toHaveBeenCalled();
    advance(1499);
    expect(screen.getByRole('tooltip')).toHaveClass('rt-tooltip-tooltipActive');
    advance(1);
    expect(screen.getByRole('tooltip')).not.toHaveClass('rt-tooltip-tooltipActive');
    advance(200);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('honors tooltipHideOnClick=false while still dismissing on an outside pointer action', () => {
    vi.useFakeTimers();
    render(<TipButton tooltip="Add a file" tooltipHideOnClick={false}>Add</TipButton>);
    const trigger = screen.getByRole('button', { name: 'Add' });
    fireEvent.mouseEnter(trigger);
    advance(1);
    fireEvent.pointerDown(trigger);
    fireEvent.click(trigger);
    advance(250);
    expect(screen.getByRole('tooltip')).toHaveClass('rt-tooltip-tooltipActive');
    fireEvent.pointerDown(document.body);
    advance(200);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('announces snackbar messages and pauses timeout while its action has keyboard focus', () => {
    vi.useFakeTimers();
    const timeout = vi.fn();
    render(<Snackbar active label="Archived" action="Undo" timeout={1000} onTimeout={timeout} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    advance(400);
    const action = screen.getByRole('button', { name: 'Undo' });
    act(() => action.focus());
    advance(5000);
    expect(timeout).not.toHaveBeenCalled();
    act(() => action.blur());
    advance(599);
    expect(timeout).not.toHaveBeenCalled();
    advance(1);
    expect(timeout).toHaveBeenCalledOnce();
  });

  it('does not restart snackbar timers for callback identity changes and uses the latest callback', () => {
    vi.useFakeTimers();
    const oldCallback = vi.fn();
    const latest = vi.fn();
    const view = render(<Snackbar active label="Saved" timeout={1000} onTimeout={oldCallback} />);
    advance(700);
    view.rerender(<Snackbar active label="Saved" timeout={1000} onTimeout={latest} />);
    advance(300);
    expect(oldCallback).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledOnce();
  });

  it('restarts the full snackbar timeout after window focus returns', () => {
    vi.useFakeTimers();
    const timeout = vi.fn();
    render(<Snackbar active label="Saved" timeout={1000} onTimeout={timeout} />);
    advance(700);
    fireEvent.blur(window);
    advance(5000);
    expect(timeout).not.toHaveBeenCalled();
    fireEvent.focus(window);
    advance(999);
    expect(timeout).not.toHaveBeenCalled();
    advance(1);
    expect(timeout).toHaveBeenCalledOnce();
  });

  it('waits for a background document to become visible before starting its snackbar timeout', () => {
    vi.useFakeTimers();
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    const timeout = vi.fn();
    render(<Snackbar active label="Saved" timeout={1000} onTimeout={timeout} />);
    advance(5000);
    expect(timeout).not.toHaveBeenCalled();
    hidden.mockReturnValue(false);
    fireEvent(document, new Event('visibilitychange'));
    advance(999);
    expect(timeout).not.toHaveBeenCalled();
    advance(1);
    expect(timeout).toHaveBeenCalledOnce();
    hidden.mockRestore();
  });
});
