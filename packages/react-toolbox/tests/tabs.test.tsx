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
      const [tab, setTab] = useState('one');
      return (
        <Tabs dir="rtl" value={tab} onValueChange={setTab}>
          <Tab value="one" label="One">
            First
          </Tab>
          <Tab value="unavailable" label="Unavailable" disabled />
          <Tab value="three" label="Three">
            Last
          </Tab>
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
      <Tabs defaultValue="one" activationMode="manual">
        <>
          <Tab value="one" label="One">
            First
          </Tab>
          <Tab value="disabled" label="Disabled" disabled />
          <Tab value="three" label="Three">
            Third
          </Tab>
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

  it('starts without a selected tab when no value is supplied and selects by value on interaction', async () => {
    const change = vi.fn();
    render(
      <Tabs onValueChange={change}>
        <Tab value="" label="Empty">
          Empty value
        </Tab>
        <Tab value="tab:" label="Prefixed">
          Prefixed value
        </Tab>
      </Tabs>,
    );
    for (const tab of screen.getAllByRole('tab')) expect(tab).toHaveAttribute('aria-selected', 'false');
    expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('tab', { name: 'Empty' }));
    expect(screen.getByRole('tab', { name: 'Empty' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Empty value');
    expect(change).toHaveBeenLastCalledWith('');
    await userEvent.click(screen.getByRole('tab', { name: 'Prefixed' }));
    expect(screen.getByRole('tab', { name: 'Prefixed' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Prefixed value');
    expect(change).toHaveBeenLastCalledWith('tab:');
  });

  it.each(['value', 'defaultValue'] as const)('selects an empty string supplied through %s', (prop) => {
    render(
      <Tabs {...{ [prop]: '' }}>
        <Tab value="" label="Empty">
          Empty value
        </Tab>
        <Tab value="two" label="Two">
          Second
        </Tab>
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: 'Empty' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Empty value');
  });

  it('does not mutate a controlled tab selection and honors prevented activation', async () => {
    const change = vi.fn();
    render(
      <Tabs value="one" onValueChange={change}>
        <Tab value="one" label="One" />
        <Tab value="two" label="Two" onMouseDown={(event) => event.preventDefault()} />
        <Tab value="three" label="Three" />
      </Tabs>,
    );
    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(change).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('tab', { name: 'Three' }));
    expect(change).toHaveBeenLastCalledWith('three');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });
});
