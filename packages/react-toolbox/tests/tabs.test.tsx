import { useState } from 'react';
import { act, cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tab, Tabs } from '../src/material/tabs';

describe('keyboard focus', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('uses Radix roving focus for RTL, disabled tabs, and modifier keys', async () => {
    const user = userEvent.setup();
    function Example() {
      const [index, setIndex] = useState(0);
      return (
        <Tabs dir="rtl" index={index} onChange={setIndex}>
          <Tab label="One">First</Tab>
          <Tab label="Unavailable" disabled />
          <Tab label="Three">Last</Tab>
        </Tabs>
      );
    }
    render(<Example />);
    const one = screen.getByRole('tab', { name: 'One' });
    act(() => one.focus());
    await user.keyboard('{Control>}{ArrowLeft}{/Control}');
    expect(one).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus());
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Last');
  });
});

describe('controlled and uncontrolled selection', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('supports uncontrolled tabs inside fragments and manual activation', async () => {
    render(
      <Tabs defaultIndex={0} activationMode="manual">
        <>
          <Tab label="One">First</Tab>
          <Tab label="Disabled" disabled />
          <Tab label="Three">Third</Tab>
        </>
      </Tabs>,
    );
    const one = screen.getByRole('tab', { name: 'One' });
    one.focus();
    fireEvent.keyDown(one, { key: 'ArrowRight' });
    const three = screen.getByRole('tab', { name: 'Three' });
    await waitFor(() => expect(three).toHaveFocus());
    expect(one).toHaveAttribute('aria-selected', 'true');
    expect(three).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(three, { key: 'Enter' });
    expect(three).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Third');
  });

  it('does not mutate a controlled tab selection and honors prevented activation', async () => {
    const change = vi.fn();
    render(
      <Tabs index={0} onChange={change}>
        <Tab label="One" />
        <Tab label="Two" onClick={(event) => event.preventDefault()} />
        <Tab label="Three" />
      </Tabs>,
    );
    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(change).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('tab', { name: 'Three' }));
    expect(change).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });
});
