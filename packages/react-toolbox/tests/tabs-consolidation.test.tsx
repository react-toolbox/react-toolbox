import { useRef, useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Tab, TabContent, Tabs, type TabsHandle } from '../src/material/tabs';

it('lets the Radix tablist own the tab stop and enter on the first enabled tab when the active one is disabled', async () => {
  render(
    <Tabs index={0} aria-label="Views">
      <Tab label="First" disabled />
      <Tab label="Second" />
      <Tab label="Hidden" hidden />
      <Tab label="Third" />
    </Tabs>,
  );
  const list = screen.getByRole('tablist', { name: 'Views' });
  expect(list).toHaveAttribute('tabindex', '0');
  for (const name of ['First', 'Second', 'Third']) {
    expect(screen.getByRole('tab', { name })).toHaveAttribute('tabindex', '-1');
  }
  await userEvent.tab();
  const second = screen.getByRole('tab', { name: 'Second' });
  expect(second).toHaveFocus();
  expect(second).toHaveAttribute('tabindex', '0');
  fireEvent.keyDown(second, { key: 'ArrowRight' });
  await waitFor(() => expect(screen.getByRole('tab', { name: 'Third' })).toHaveFocus());
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Third' }), { key: 'ArrowRight' });
  await waitFor(() => expect(second).toHaveFocus());
});

it('selects on pointer down and Enter through Radix, keeps onClick as a plain click callback, and cancels from onMouseDown', async () => {
  const change = vi.fn();
  const click = vi.fn();
  const mouseDown = vi.fn((event: React.MouseEvent) => event.preventDefault());
  function Example() {
    const [index, setIndex] = useState(0);
    return (
      <Tabs
        index={index}
        onChange={(next) => {
          change(next);
          setIndex(next);
        }}
        activationMode="manual"
      >
        <Tab label="One">First</Tab>
        <Tab label="Two" onClick={click}>
          Second
        </Tab>
        <Tab label="Three" onMouseDown={mouseDown}>
          Third
        </Tab>
      </Tabs>
    );
  }
  render(<Example />);
  const two = screen.getByRole('tab', { name: 'Two' });
  fireEvent.mouseDown(two, { button: 0 });
  expect(change).toHaveBeenLastCalledWith(1);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Second');
  expect(click).not.toHaveBeenCalled();
  fireEvent.click(two);
  expect(click).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }), 1);
  fireEvent.mouseDown(screen.getByRole('tab', { name: 'Three' }), { button: 0 });
  expect(mouseDown).toHaveBeenCalledOnce();
  expect(change).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(two, { key: 'ArrowRight' });
  const three = screen.getByRole('tab', { name: 'Three' });
  await waitFor(() => expect(three).toHaveFocus());
  expect(two).toHaveAttribute('aria-selected', 'true');
  fireEvent.keyDown(three, { key: 'Enter' });
  expect(change).toHaveBeenLastCalledWith(2);
  expect(click).toHaveBeenCalledOnce();
});

it('mounts only the active inline panel by default and keeps hidden panels wired when hideMode is display', () => {
  const view = render(
    <Tabs index={1}>
      <Tab label="One">First</Tab>
      <Tab label="Two">Second</Tab>
    </Tabs>,
  );
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tab', { name: 'One' })).not.toHaveAttribute('aria-controls');
  view.rerender(
    <Tabs index={1} hideMode="display">
      <Tab label="One">First</Tab>
      <Tab label="Two">Second</Tab>
    </Tabs>,
  );
  const panels = screen.getAllByRole('tabpanel', { hidden: true });
  expect(panels).toHaveLength(2);
  expect(panels[0]).toHaveAttribute('hidden');
  expect(panels[1]).not.toHaveAttribute('hidden');
  expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-controls', panels[0].id);
  expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-controls', panels[1].id);
  expect(panels[1]).toHaveAttribute('aria-labelledby', screen.getByRole('tab', { name: 'Two' }).id);
});

it('keeps explicit panels, the handle, and the pointer geometry from the measured active tab', () => {
  const frame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    callback(0);
    return 0;
  });
  function Example() {
    const handle = useRef<TabsHandle>(null);
    return (
      <>
        <Tabs index={1} ref={handle} fixed>
          <Tab label="One" />
          <Tab label="Two" />
          <TabContent>First panel</TabContent>
          <TabContent>Second panel</TabContent>
        </Tabs>
        <button type="button" onClick={() => handle.current?.updatePointer()}>
          measure
        </button>
      </>
    );
  }
  render(<Example />);
  const two = screen.getByRole('tab', { name: 'Two' });
  const list = screen.getByRole('tablist');
  vi.spyOn(list, 'getBoundingClientRect').mockReturnValue({ left: 10, height: 48 } as DOMRect);
  vi.spyOn(two, 'getBoundingClientRect').mockReturnValue({ left: 110, width: 160 } as DOMRect);
  act(() => screen.getByRole('button', { name: 'measure' }).click());
  const pointer = list.querySelector<HTMLElement>('.rt-tabs-pointer')!;
  expect(pointer.style.left).toBe('100px');
  expect(pointer.style.width).toBe('160px');
  expect(pointer.style.top).toBe('48px');
  expect(screen.getByRole('tabpanel', { name: 'Two' })).toHaveTextContent('Second panel');
  expect(list.closest('.rt-tabs-tabs')).toHaveClass('rt-tabs-fixed');
  frame.mockRestore();
});
