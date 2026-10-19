import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from '../src/material/button';
import { IconMenu, MenuItem, Menu, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem } from '../src/material/menu';

describe('parent updates', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('keeps an open icon menu open when a parent rerenders with fresh children', async () => {
    const user = userEvent.setup();
    const view = render(
      <IconMenu aria-label="Actions">
        <MenuItem caption="Action 0" />
      </IconMenu>,
    );
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await screen.findByRole('menuitem');
    view.rerender(
      <IconMenu aria-label="Actions">
        <MenuItem caption="Action 1" />
      </IconMenu>,
    );
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: 'Action 1' })).toBeInTheDocument();
  });
});

describe('menu workflows', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('restores the trigger when a pointer click did not focus it natively', async () => {
    render(
      <>
        <input aria-label="Previous field" />
        <IconMenu trigger={<Button>Commands</Button>}>
          <MenuItem caption="Save" />
        </IconMenu>
      </>,
    );
    screen.getByRole('textbox').focus();
    const trigger = screen.getByRole('button', { name: 'Commands' });
    fireEvent.click(trigger);
    const menu = screen.getByRole('menu');
    await waitFor(() => expect(menu).toHaveFocus());
    fireEvent.keyDown(menu, { key: 'Escape' });
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('opens from a custom trigger and keeps check/radio selections open', async () => {
    const user = userEvent.setup();
    const check = vi.fn();
    const radio = vi.fn();
    render(
      <IconMenu trigger={<Button>Display options</Button>}>
        <>
          <MenuCheckboxItem caption="Toolbar" defaultChecked onCheckedChange={check} />
          <MenuCheckboxItem caption="Unavailable" disabled />
          <MenuRadioGroup defaultValue="small" onValueChange={radio} aria-label="Size">
            <MenuRadioItem caption="Small" value="small" />
            <MenuRadioItem caption="Large" value="large" />
          </MenuRadioGroup>
        </>
      </IconMenu>,
    );
    const trigger = screen.getByRole('button', { name: 'Display options' });
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    const toolbar = screen.getByRole('menuitemcheckbox', { name: 'Toolbar' });
    await waitFor(() => expect(toolbar).toHaveFocus());
    fireEvent.keyDown(toolbar, { key: ' ' });
    expect(check).toHaveBeenCalledWith(false);
    expect(toolbar).toHaveAttribute('aria-checked', 'false');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByRole('menuitemradio', { name: 'Small' })).toHaveFocus());
    await user.click(screen.getByRole('menuitemradio', { name: 'Large' }));
    expect(radio).toHaveBeenCalledWith('large');
    expect(screen.getByRole('menuitemradio', { name: 'Large' })).toHaveAttribute('aria-checked', 'true');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('allows nested custom items and cancelled commands without closing or notifying selection', async () => {
    const select = vi.fn();
    const WrappedItem = () => <MenuItem caption="Save" value="save" onClick={(event) => event.preventDefault()} />;
    render(
      <IconMenu onSelect={select}>
        <WrappedItem />
      </IconMenu>,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Save' }));
    expect(select).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it.each([Menu, IconMenu])('keeps controlled menus open until the consumer accepts dismissal', async (Popup) => {
    const change = vi.fn();
    const view = render(
      <Popup open={false} onOpenChange={change} position="topLeft">
        <MenuItem caption="Save" />
      </Popup>,
    );
    expect(screen.queryByRole('menu')).toBeNull();
    view.rerender(
      <Popup open onOpenChange={change} position="topLeft">
        <MenuItem caption="Save" />
      </Popup>,
    );
    await userEvent.click(screen.getByRole('menuitem'));
    expect(change).toHaveBeenCalledWith(false);
    expect(screen.getByRole('menu')).not.toHaveAttribute('aria-hidden', 'true');
    view.rerender(
      <Popup open={false} onOpenChange={change} position="topLeft">
        <MenuItem caption="Save" />
      </Popup>,
    );
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it.each([Menu, IconMenu])('dismisses an initially open uncontrolled menu', async (Popup) => {
    const change = vi.fn();
    const view = render(
      <Popup defaultOpen onOpenChange={change} position="topLeft">
        <MenuItem caption="Save" />
      </Popup>,
    );
    await userEvent.click(screen.getByRole('menuitem'));
    expect(change).toHaveBeenCalledExactlyOnceWith(false);
    expect(screen.queryByRole('menu')).toBeNull();
    view.rerender(
      <Popup defaultOpen onOpenChange={change} position="topLeft">
        <MenuItem caption="Save again" />
      </Popup>,
    );
    expect(screen.queryByRole('menu')).toBeNull();
  });
});
