import { createRef, useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Tab, TabContent, Tabs } from '../src/material/tabs';

it('lets the Radix tablist own the tab stop and enter on the first enabled tab when the active one is disabled', async () => {
  render(
    <Tabs value="first" aria-label="Views">
      <Tab value="first" label="First" disabled />
      <Tab value="second" label="Second" />
      <Tab value="hidden" label="Hidden" hidden />
      <Tab value="third" label="Third" />
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
    const [tab, setTab] = useState('one');
    return (
      <Tabs
        value={tab}
        onValueChange={(next) => {
          change(next);
          setTab(next);
        }}
        activationMode="manual"
      >
        <Tab value="one" label="One">
          First
        </Tab>
        <Tab value="two" label="Two" onClick={click}>
          Second
        </Tab>
        <Tab value="three" label="Three" onMouseDown={mouseDown}>
          Third
        </Tab>
      </Tabs>
    );
  }
  render(<Example />);
  const two = screen.getByRole('tab', { name: 'Two' });
  fireEvent.mouseDown(two, { button: 0 });
  expect(change).toHaveBeenLastCalledWith('two');
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Second');
  expect(click).not.toHaveBeenCalled();
  fireEvent.click(two);
  expect(click).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
  fireEvent.mouseDown(screen.getByRole('tab', { name: 'Three' }), { button: 0 });
  expect(mouseDown).toHaveBeenCalledOnce();
  expect(change).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(two, { key: 'ArrowRight' });
  const three = screen.getByRole('tab', { name: 'Three' });
  await waitFor(() => expect(three).toHaveFocus());
  expect(two).toHaveAttribute('aria-selected', 'true');
  fireEvent.keyDown(three, { key: 'Enter' });
  expect(change).toHaveBeenLastCalledWith('three');
  expect(click).toHaveBeenCalledOnce();
});

it('mounts only the active inline panel by default and keeps hidden panels wired when hideMode is display', () => {
  const view = render(
    <Tabs value="two">
      <Tab value="one" label="One">
        First
      </Tab>
      <Tab value="two" label="Two">
        Second
      </Tab>
    </Tabs>,
  );
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tab', { name: 'One' })).not.toHaveAttribute('aria-controls');
  view.rerender(
    <Tabs value="two" hideMode="display">
      <Tab value="one" label="One">
        First
      </Tab>
      <Tab value="two" label="Two">
        Second
      </Tab>
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

it('matches explicit panels by value and updates indicator geometry when the layout changes', () => {
  const ref = createRef<HTMLDivElement>();
  let measure = () => {};
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: () => void) {
        measure = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    callback(0);
    return 0;
  });
  render(
    <Tabs value="two" ref={ref} fixed>
      <Tab value="one" label="One" />
      <Tab value="two" label="Two" />
      <TabContent value="two">Second panel</TabContent>
      <TabContent value="one">First panel</TabContent>
    </Tabs>,
  );
  const two = screen.getByRole('tab', { name: 'Two' });
  const list = screen.getByRole('tablist');
  vi.spyOn(list, 'getBoundingClientRect').mockReturnValue({ left: 10, height: 48 } as DOMRect);
  vi.spyOn(two, 'getBoundingClientRect').mockReturnValue({ left: 110, width: 160 } as DOMRect);
  act(measure);
  const pointer = list.querySelector<HTMLElement>('.rt-tabs-pointer')!;
  expect(pointer.style.transform).toBe('translateX(100px) scaleX(160)');
  expect(pointer.style.top).toBe('48px');
  expect(screen.getByRole('tabpanel', { name: 'Two' })).toHaveTextContent('Second panel');
  expect(ref.current).toBe(list.closest('.rt-tabs-tabs'));
  expect(ref.current).toHaveClass('rt-tabs-fixed');
});

it('preserves selection and retained panel state when tabs reorder', () => {
  const tabs = (values: string[]) => (
    <Tabs defaultValue="two" hideMode="display">
      {values.map((value) => (
        <Tab key={value} value={value} label={value}>
          <input aria-label={`${value} note`} defaultValue="" />
        </Tab>
      ))}
    </Tabs>
  );
  const view = render(tabs(['one', 'two']));
  fireEvent.change(screen.getByRole('textbox', { name: 'two note' }), { target: { value: 'Keep this note' } });
  view.rerender(tabs(['two', 'one']));
  expect(screen.getByRole('tab', { name: 'two' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('textbox', { name: 'two note' })).toHaveValue('Keep this note');
  const panel = screen.getByRole('tabpanel', { name: 'two' });
  expect(screen.getByRole('tab', { name: 'two' })).toHaveAttribute('aria-controls', panel.id);
});

it('remeasures the indicator when direction changes with stable children', () => {
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    callback(0);
    return 0;
  });
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const left =
      this.getAttribute('role') === 'tab' && this.closest('[data-react-toolbox="tabs"]')?.getAttribute('dir') === 'rtl'
        ? 100
        : 0;
    return { left, top: 0, right: left + 100, bottom: 48, width: 100, height: 48 } as DOMRect;
  });
  const children = (
    <>
      <Tab value="one" label="One" />
      <Tab value="two" label="Two" />
    </>
  );
  const view = render(
    <Tabs value="one" dir="ltr">
      {children}
    </Tabs>,
  );
  const pointer = screen.getByRole('tablist').querySelector<HTMLElement>('.rt-tabs-pointer')!;
  expect(pointer.style.transform).toBe('translateX(0px) scaleX(100)');
  view.rerender(
    <Tabs value="one" dir="rtl">
      {children}
    </Tabs>,
  );
  expect(pointer.style.transform).toBe('translateX(100px) scaleX(100)');
});
