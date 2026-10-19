import { createRef } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it, vi } from 'vitest';
import { IconMenu, Menu, MenuItem } from '../src/material/menu';
import { Tooltip, useTooltip } from '../src/material/tooltip';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it('shares menu keyboard navigation, typeahead, selection and focus return with the compound parts', async () => {
  const select = vi.fn();
  render(
    <IconMenu aria-label="File options" onSelect={select}>
      <MenuItem caption="Archive" value="archive" />
      <MenuItem caption="Disabled" disabled />
      <MenuItem caption="Delete" value="delete" />
    </IconMenu>,
  );
  const trigger = screen.getByRole('button', { name: 'File options' });
  trigger.focus();
  await userEvent.keyboard('{ArrowDown}');
  expect(trigger).toHaveAttribute('aria-controls', screen.getByRole('menu').id);
  await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveFocus());
  await userEvent.keyboard('{ArrowDown}');
  await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus());
  await userEvent.keyboard('{Home}d');
  await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus());
  await userEvent.keyboard('{Enter}');
  expect(select).toHaveBeenCalledExactlyOnceWith('delete');
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(screen.queryByRole('menu')).toBeNull();
});

it('keeps an inline menu visible without stealing focus and retains repeated selection', async () => {
  const opener = document.createElement('button');
  document.body.append(opener);
  opener.focus();
  const select = vi.fn();
  try {
    render(
      <Menu onSelect={select}>
        <MenuItem caption="Archive" value="archive" closeOnSelect={false} />
      </Menu>,
    );
    expect(opener).toHaveFocus();
    await userEvent.click(screen.getByRole('menuitemradio', { name: 'Archive' }));
    expect(select).toHaveBeenCalledExactlyOnceWith('archive');
    expect(screen.getByRole('menu')).toBeVisible();
  } finally {
    opener.remove();
  }
});

it('allows sequential navigation out of inline menus without hover stealing input focus', async () => {
  render(
    <>
      <input aria-label="Before" />
      <Menu>
        <MenuItem caption="Archive" />
      </Menu>
      <input aria-label="After" />
    </>,
  );
  const before = screen.getByRole('textbox', { name: 'Before' });
  const item = screen.getByRole('menuitem', { name: 'Archive' });
  before.focus();
  fireEvent.pointerMove(item, { pointerType: 'mouse' });
  expect(before).toHaveFocus();
  item.focus();
  await userEvent.tab();
  expect(screen.getByRole('textbox', { name: 'After' })).toHaveFocus();
  item.focus();
  await userEvent.tab({ shift: true });
  expect(before).toHaveFocus();
});

it.each(['{Enter}', ' '])('honors IconMenu click cancellation for keyboard activation %s', async (key) => {
  const click = vi.fn((event) => event.preventDefault());
  render(
    <IconMenu aria-label="Actions" onClick={click}>
      <MenuItem caption="Archive" />
    </IconMenu>,
  );
  screen.getByRole('button', { name: 'Actions' }).focus();
  await userEvent.keyboard(key);
  expect(click).toHaveBeenCalledOnce();
  expect(screen.queryByRole('menu')).toBeNull();
});

it('does not restore a standalone popup over an outside input', async () => {
  const ref = createRef<import('../src/material/menu').MenuHandle>();
  render(
    <>
      <button onClick={() => ref.current?.show()}>Open</button>
      <Menu ref={ref} position="topLeft">
        <MenuItem caption="Archive" />
      </Menu>
      <input aria-label="Outside" />
    </>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Open' }));
  await screen.findByRole('menu');
  await userEvent.click(screen.getByRole('textbox', { name: 'Outside' }));
  await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  await waitFor(() => expect(screen.getByRole('textbox', { name: 'Outside' })).toHaveFocus());
});

it('connects the tooltip hook to the primitive while preserving external descriptions and refs', async () => {
  function Example() {
    const behavior = useTooltip({ tooltip: 'Help text', 'aria-describedby': 'existing' });
    return (
      <>
        <span id="existing">Existing text</span>
        <button {...behavior.triggerProps}>Help</button>
        {behavior.tooltip}
      </>
    );
  }
  render(<Example />);
  const trigger = screen.getByRole('button', { name: 'Help' });
  await userEvent.tab();
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Help text');
  expect(trigger).toHaveAccessibleDescription('Existing text Help text');
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
  expect(trigger).toHaveFocus();
  const Button = Tooltip('button');
  const ref = createRef<HTMLButtonElement>();
  cleanup();
  render(
    <Button ref={ref} tooltip="Details">
      More
    </Button>,
  );
  expect(ref.current).toBe(screen.getByRole('button', { name: 'More' }));
});

it('retains standalone item activation and cancellation without requiring a popup', async () => {
  const click = vi.fn();
  const ref = createRef<import('../src/material/menu').MenuItemHandle<string>>();
  const { rerender } = render(
    <ul role="menu">
      <MenuItem ref={ref} caption="Archive" value="archive" onClick={click} />
    </ul>,
  );
  const item = screen.getByRole('menuitem', { name: 'Archive' });
  await userEvent.click(item);
  await userEvent.keyboard('{Enter} ');
  expect(click).toHaveBeenCalledTimes(3);
  expect(ref.current?.node).toBe(item);
  expect(ref.current?.value).toBe('archive');
  rerender(
    <ul role="menu">
      <MenuItem caption="Archive" onClick={click} onKeyDown={(event) => event.preventDefault()} />
    </ul>,
  );
  await userEvent.keyboard('{Enter} ');
  expect(click).toHaveBeenCalledTimes(3);
});

it('uses the shared long-press policy without activating the trigger', () => {
  vi.useFakeTimers();
  const Button = Tooltip('button');
  const click = vi.fn();
  render(
    <Button tooltip="Help text" onClick={click}>
      Help
    </Button>,
  );
  const trigger = screen.getByRole('button', { name: 'Help' });
  fireEvent.pointerDown(trigger, { pointerType: 'touch', clientX: 0, clientY: 0 });
  act(() => vi.advanceTimersByTime(499));
  expect(screen.queryByRole('tooltip')).toBeNull();
  act(() => vi.advanceTimersByTime(1));
  expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');
  fireEvent.pointerUp(trigger, { pointerType: 'touch' });
  fireEvent.click(trigger);
  expect(click).not.toHaveBeenCalled();
  act(() => vi.advanceTimersByTime(1500));
  expect(screen.queryByRole('tooltip')).toBeNull();
});
