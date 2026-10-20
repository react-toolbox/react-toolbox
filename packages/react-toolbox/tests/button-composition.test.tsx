import { createRef, type ComponentPropsWithRef } from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Button, { BrowseButton, IconButton } from '../src/material/button';
import { IconMenu, MenuItem } from '../src/material/menu';
import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, useTooltip } from '../src/material/tooltip';

describe('native refs and pointer events', () => {
  afterEach(cleanup);

  it('exposes native button, anchor, label, and file refs', () => {
    const button = createRef<HTMLButtonElement>();
    const anchor = createRef<HTMLAnchorElement>();
    const label = createRef<HTMLLabelElement>();
    const file = createRef<HTMLInputElement>();
    render(
      <>
        <Button ref={button} label="Save" />
        <IconButton ref={anchor} href="#target" icon="link" />
        <BrowseButton ref={label} inputRef={file} label="Upload" />
      </>,
    );
    expect(button.current).toBe(screen.getByRole('button', { name: 'Save' }));
    expect(anchor.current?.tagName).toBe('A');
    expect(label.current?.tagName).toBe('LABEL');
    expect(file.current).toBe(screen.getByLabelText('Upload'));
    button.current?.focus();
    expect(button.current).toHaveFocus();
  });

  it('composes caller input events with ink and honors prevented pointer starts', () => {
    const mouseDown = vi.fn();
    const { container, rerender } = render(<Button label="Save" onMouseDown={mouseDown} />);
    fireEvent.mouseDown(screen.getByRole('button'), { button: 0, clientX: 5, clientY: 5 });
    expect(mouseDown).toHaveBeenCalledOnce();
    expect(container.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
    rerender(<Button key="prevented" label="Save" onMouseDown={(event) => event.preventDefault()} />);
    fireEvent.mouseDown(screen.getByRole('button'), { button: 0 });
    expect(container.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
  });
});

it('exposes native file validation, form association, capture, and input identity', () => {
  const file = createRef<HTMLInputElement>();
  const invalid = vi.fn();
  render(
    <>
      <form id="upload" aria-label="Upload form" />
      <BrowseButton
        label="Choose photo"
        icon="photo_camera"
        inputRef={file}
        inputProps={{ id: 'photo', form: 'upload', required: true, capture: 'environment', onInvalid: invalid }}
      />
    </>,
  );
  expect(file.current).toHaveAttribute('id', 'photo');
  expect(file.current).toHaveAttribute('capture', 'environment');
  expect(file.current?.form).toBe(screen.getByRole('form', { name: 'Upload form' }));
  expect(file.current?.checkValidity()).toBe(false);
  expect(invalid).toHaveBeenCalledOnce();
  expect(
    screen.getByLabelText('Choose photo').closest('label')?.querySelector('[data-react-toolbox="font-icon"]'),
  ).toHaveAttribute('aria-hidden', 'true');
});

describe('slotted buttons and tooltips', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('composes tooltip behavior onto an asChild button without changing its single-child contract', async () => {
    const linkRef = createRef<HTMLAnchorElement>();
    const click = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(
      <TooltipRoot delayDuration={0}>
        <TooltipTrigger asChild>
          <Button asChild>
            <a ref={linkRef} href="/profile" onClick={click}>
              Profile
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>View your profile</TooltipContent>
        </TooltipPortal>
      </TooltipRoot>,
    );
    const link = screen.getByRole('link', { name: 'Profile' });
    expect(linkRef.current).toBe(link);
    expect(link.querySelector('button, a')).toBeNull();
    await userEvent.hover(link);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('View your profile');
    expect(link).toHaveAccessibleDescription('View your profile');
    await userEvent.click(link);
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('stacks a menu trigger, tooltip and slotted button while preserving the opener ref and focus', async () => {
    const triggerRef = createRef<HTMLButtonElement>();
    function Example() {
      const tooltip = useTooltip({ tooltip: 'Change display settings' });
      return (
        <>
          <IconMenu
            trigger={
              <Button asChild {...tooltip.triggerProps}>
                <button type="button" ref={triggerRef}>
                  Display settings
                </button>
              </Button>
            }
          >
            <MenuItem caption="Compact" />
          </IconMenu>
          {tooltip.tooltip}
        </>
      );
    }
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Display settings' });
    expect(triggerRef.current).toBe(trigger);
    expect(trigger.querySelector('button')).toBeNull();
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Compact' })).toHaveFocus());
    expect(screen.queryByRole('tooltip')).toBeNull();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it.each([Button, IconButton])(
    'composes a router link with refs, ink and cancellable child handlers',
    async (Control) => {
      const childRef = createRef<HTMLAnchorElement>();
      const parentClick = vi.fn();
      const childClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
      const RouterLink = (props: ComponentPropsWithRef<'a'>) => <a {...props} data-router-link="true" />;
      render(
        <Control asChild icon="home" onClick={parentClick}>
          <RouterLink ref={childRef} href="/home" onClick={childClick}>
            Home
          </RouterLink>
        </Control>,
      );
      const link = screen.getByRole('link', { name: 'Home' });
      expect(childRef.current).toBe(link);
      expect(link).toHaveAttribute('data-react-toolbox', 'button');
      expect(link.querySelector('[data-react-toolbox="font-icon"]')).not.toBeNull();
      expect(link.querySelector('button, a')).toBeNull();
      await userEvent.click(link);
      expect(childClick).toHaveBeenCalledTimes(1);
      expect(parentClick).not.toHaveBeenCalled();
    },
  );

  it('blocks a disabled slotted link before its child click handler runs', async () => {
    const click = vi.fn();
    render(
      <Button asChild disabled>
        <a href="/delete" onClick={click}>
          Delete
        </a>
      </Button>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    fireEvent.click(link);
    expect(click).not.toHaveBeenCalled();
  });
});
