import React, { StrictMode, createContext, createRef, useContext } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Portal from '../src/material/foundations/portal/Portal';
import { ThemeProvider } from '../src/material/foundations/theme/ThemeProvider';
import { Overlay } from '../src/material/overlay/Overlay';
import Button from '../src/material/button';
import Dialog from '../src/material/dialog';
import Drawer from '../src/material/drawer';
import Input from '../src/material/input';
import Autocomplete from '../src/material/autocomplete';
import Slider from '../src/material/slider';
import DatePicker, { DatePickerDialog } from '../src/material/date-picker';
import TimePicker from '../src/material/time-picker';
import Snackbar from '../src/material/snackbar';
import Dropdown from '../src/material/dropdown';
import { IconMenu, Menu, MenuItem } from '../src/material/menu';
import Clock from '../src/material/time-picker/Clock';

const strict = (children) => <StrictMode>{children}</StrictMode>;
const advance = (ms) => act(() => vi.advanceTimersByTime(ms));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.body.style.overflow = '';
});

describe('React 19 runtime', () => {
  it('keeps portal context, scoped tokens, wrapper structure and container updates in StrictMode', () => {
    const Context = createContext('fallback');
    const Consumer = () => <span>{useContext(Context)}</span>;
    const first = document.createElement('div');
    const second = document.createElement('div');
    document.body.append(first, second);
    const portal = createRef();
    const content = (container) =>
      strict(
        <Context.Provider value="inherited context">
          <ThemeProvider variables={{ '--rt-color-primary': '#123456' }}>
            <Portal ref={portal} container={container} className="original-wrapper">
              <Consumer />
            </Portal>
          </ThemeProvider>
        </Context.Provider>,
      );
    const view = render(content(first));
    const wrapper = first.firstElementChild.firstElementChild;
    expect(first.childElementCount).toBe(1);
    expect(wrapper).toHaveClass('original-wrapper');
    expect(wrapper).toHaveAttribute('data-react-toolbox-theme');
    expect(wrapper).toHaveAttribute('data-react-toolbox-tokens', '--rt-color-primary');
    expect(wrapper.textContent).toBe('inherited context');
    expect(wrapper.style.getPropertyValue('--rt-color-primary')).toBe('#123456');
    expect(portal.current.getOverlayDOMNode()).toBe(wrapper);
    view.rerender(content(() => second));
    expect(first).toBeEmptyDOMElement();
    expect(second.firstElementChild.firstElementChild).toBe(wrapper);
    view.unmount();
    expect(second).toBeEmptyDOMElement();
    first.remove();
    second.remove();
  });

  it('inherits global tokens unless a portal explicitly supplies custom properties', () => {
    const portal = createRef();
    const view = render(
      strict(
        <Portal ref={portal}>
          <span>Global theme</span>
        </Portal>,
      ),
    );
    const wrapper = portal.current.getOverlayDOMNode();
    expect(wrapper).not.toHaveAttribute('data-react-toolbox-theme');
    expect(wrapper).not.toHaveAttribute('data-react-toolbox-tokens');
    view.rerender(
      strict(
        <Portal ref={portal} style={{ '--rt-color-primary': '#123456' }}>
          <span>Local theme</span>
        </Portal>,
      ),
    );
    expect(wrapper).toHaveAttribute('data-react-toolbox-theme');
    expect(wrapper).toHaveAttribute('data-react-toolbox-tokens', '--rt-color-primary');
    expect(wrapper.style.getPropertyValue('--rt-color-primary')).toBe('#123456');
    view.rerender(
      strict(
        <Portal ref={portal}>
          <span>Global theme</span>
        </Portal>,
      ),
    );
    expect(wrapper).not.toHaveAttribute('data-react-toolbox-theme');
    expect(wrapper).not.toHaveAttribute('data-react-toolbox-tokens');
    expect(wrapper.style.getPropertyValue('--rt-color-primary')).toBe('');
  });

  it('falls back to the body for an empty container ref and moves when it becomes available', () => {
    const container = createRef();
    const portal = createRef();
    const view = render(
      strict(
        <Portal ref={portal} container={container}>
          <span>Ref container</span>
        </Portal>,
      ),
    );
    const target = portal.current.getMountNode();
    expect(target.parentNode).toBe(document.body);
    const available = document.createElement('div');
    document.body.append(available);
    container.current = available;
    view.rerender(
      strict(
        <Portal ref={portal} container={container}>
          <span>Ref container</span>
        </Portal>,
      ),
    );
    expect(portal.current.getMountNode()).toBe(target);
    expect(target.parentNode).toBe(available);
    view.unmount();
    expect(available).toBeEmptyDOMElement();
    available.remove();
  });

  it('preserves ripple geometry and removes it only after the opacity transition', () => {
    const onMouseDown = vi.fn();
    render(strict(<Button label="Ripple" onMouseDown={onMouseDown} />));
    const button = screen.getByRole('button', { name: 'Ripple' });
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 20, width: 100, height: 36 });
    fireEvent.mouseDown(button, { clientX: 35, clientY: 38 });
    const ripple = button.querySelector('[data-react-toolbox="ripple"] > span');
    expect(onMouseDown).toHaveBeenCalledOnce();
    expect(ripple).not.toBeNull();
    expect(ripple.style.width).toBe('200px');
    expect(ripple.style.transform).toBe('translate3d(-125px, -100px, 0) scale(1)');
    fireEvent.mouseUp(document);
    expect(ripple).toBeInTheDocument();
    const transition = new Event('transitionend', { bubbles: true });
    Object.defineProperty(transition, 'propertyName', { value: 'opacity' });
    fireEvent(ripple, transition);
    expect(button.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
  });

  it('restores the original scroll state only after the final overlay unlocks', () => {
    document.body.style.overflow = 'scroll';
    const view = render(
      strict(
        <>
          <Overlay active />
          <Overlay active />
        </>,
      ),
    );
    expect(document.body.style.overflow).toBe('hidden');
    view.rerender(
      strict(
        <>
          <Overlay active={false} />
          <Overlay active />
        </>,
      ),
    );
    expect(document.body.style.overflow).toBe('hidden');
    view.unmount();
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('retains function defaults and an explicitly configured dialog exit lifetime', () => {
    vi.useFakeTimers();
    const view = render(strict(<Dialog active={false} title="Default dialog" delay={500} />));
    expect(screen.queryByText('Default dialog')).not.toBeInTheDocument();
    view.rerender(strict(<Dialog active title="Default dialog" delay={500} />));
    const dialog = document.querySelector('[data-react-toolbox="dialog"]');
    expect(dialog).toBeInTheDocument();
    expect(dialog.className).toContain('normal');
    expect(dialog.className).not.toContain('active');
    advance(20);
    expect(dialog.className).toContain('active');
    view.rerender(strict(<Dialog active={false} title="Default dialog" delay={500} />));
    expect(dialog.className).not.toContain('active');
    advance(499);
    expect(dialog).toBeInTheDocument();
    advance(1);
    expect(dialog).not.toBeInTheDocument();
    render(strict(<Drawer active>Default drawer</Drawer>));
    expect(document.querySelector('[data-react-toolbox="drawer"]').className).toContain('left');
  });

  it('cancels a queued reveal when the dialog closes before its first frame', () => {
    vi.useFakeTimers();
    const view = render(strict(<Dialog active={false}>Quick dialog</Dialog>));
    view.rerender(strict(<Dialog active>Quick dialog</Dialog>));
    view.rerender(strict(<Dialog active={false}>Quick dialog</Dialog>));
    const dialog = document.querySelector('[data-react-toolbox="dialog"]');
    expect(dialog.className).not.toContain('active');
    advance(20);
    expect(dialog).not.toBeInTheDocument();
  });

  it('forwards imperative input refs and updates autocomplete controlled values', () => {
    const input = createRef();
    const source = { a: 'Alpha', b: 'Beta' };
    const view = render(
      strict(
        <>
          <Input ref={input} label="Ref input" />
          <Autocomplete multiple={false} source={source} value="a" />
        </>,
      ),
    );
    act(() => input.current.focus());
    expect(document.activeElement).toBe(view.container.querySelector('input'));
    act(() => input.current.blur());
    expect(screen.getByRole('combobox')).toHaveValue('Alpha');
    view.rerender(
      strict(
        <>
          <Input ref={input} label="Ref input" />
          <Autocomplete multiple={false} source={source} value="b" />
        </>,
      ),
    );
    expect(screen.getByRole('combobox')).toHaveValue('Beta');
    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.keyUp(screen.getByRole('combobox'), { key: 'Escape' });
  });

  it('edits a slider through the current Input ref API', () => {
    const onChange = vi.fn();
    render(strict(<Slider editable value={20} step={1} onChange={onChange} />));
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '35' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(35, expect.anything());
  });

  it('slides calendar months using DOM refs and completes when there is no animation', () => {
    vi.useFakeTimers();
    const value = new Date(2026, 9, 13);
    render(strict(<DatePickerDialog active value={value} />));
    expect(screen.getByText('October 2026')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('November 2026')).toBeInTheDocument();
    expect(screen.getByText('October 2026')).toBeInTheDocument();
    advance(0);
    expect(screen.queryByText('October 2026')).not.toBeInTheDocument();
  });

  it('keeps date and time dialog confirmation callbacks available', () => {
    vi.useFakeTimers();
    const dateChange = vi.fn();
    const date = new Date(2026, 9, 13, 9, 30);
    const view = render(strict(<DatePicker defaultOpen value={date} onChange={dateChange} />));
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(dateChange).toHaveBeenCalledWith(date, expect.anything());
    view.unmount();
    const timeChange = vi.fn();
    const timeView = render(strict(<TimePicker defaultOpen value={date} onChange={timeChange} />));
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(timeChange).toHaveBeenCalledWith(date, expect.anything());
    timeView.unmount();
    advance(1000);
  });

  it('zooms clock views using DOM refs and completes when there is no animation', () => {
    vi.useFakeTimers();
    const props = { time: new Date(2026, 9, 13, 9, 30), onChange: vi.fn() };
    const view = render(strict(<Clock {...props} display="hours" />));
    advance(0);
    view.rerender(strict(<Clock {...props} display="minutes" />));
    expect(view.container.querySelectorAll('.rt-time-picker-clockWrapper')).toHaveLength(2);
    advance(0);
    expect(view.container.querySelectorAll('.rt-time-picker-clockWrapper')).toHaveLength(1);
    view.unmount();
    advance(1000);
  });

  it('preserves uncontrolled IconMenu state on rerenders', () => {
    vi.useFakeTimers();
    const view = render(
      strict(
        <IconMenu>
          <MenuItem value="one" caption="One" />
        </IconMenu>,
      ),
    );
    fireEvent.click(view.container.querySelector('[data-react-toolbox="button"]'));
    advance(20);
    expect(view.container.querySelector('[data-react-toolbox="menu"]').className).toContain('active');
    view.rerender(
      strict(
        <IconMenu>
          <MenuItem value="one" caption="One" />
        </IconMenu>,
      ),
    );
    expect(view.container.querySelector('[data-react-toolbox="menu"]').className).toContain('active');
  });

  it('preserves menu refs and root classes when switching from inline to floating content', async () => {
    const ref = createRef();
    const show = vi.fn();
    const hide = vi.fn();
    const content = (position) => (
      <Menu ref={ref} position={position} onShow={show} onHide={hide} className="custom-menu">
        <MenuItem caption="Download" value="download" />
      </Menu>
    );
    const view = render(strict(content('static')));
    const node = ref.current.node;
    expect(node).toHaveClass('custom-menu', 'rt-menu-static');
    expect(screen.getByRole('menuitemradio', { name: 'Download' })).toBeVisible();
    expect(node.querySelector('.rt-menu-menuInner')).toHaveClass('rt-menu-outline');
    act(() => ref.current.show());
    expect(show).toHaveBeenCalledOnce();
    view.rerender(strict(content('topRight')));
    expect(ref.current.node).toBe(node);
    expect(node).not.toHaveClass('rt-menu-static');
    expect(screen.getByRole('menu')).toBeVisible();
    act(() => ref.current.hide());
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    expect(hide).toHaveBeenCalledOnce();
    view.unmount();
    expect(ref.current).toBeNull();
  });

  it('handles an initially open menu and closes it once on an outside pointer action', () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    render(
      strict(
        <Menu defaultOpen onHide={onHide}>
          <MenuItem value="one" caption="One" />
        </Menu>,
      ),
    );
    advance(0);
    fireEvent.pointerDown(document.body, { pointerType: 'mouse' });
    expect(document.querySelector('[data-react-toolbox="menu"]').className).not.toContain('active');
    expect(onHide).toHaveBeenCalledOnce();
    fireEvent.pointerDown(document.body, { pointerType: 'mouse' });
    expect(onHide).toHaveBeenCalledOnce();
  });

  it('opens dropdowns, selects values and dismisses on an outside pointer action', async () => {
    const onChange = vi.fn();
    render(
      strict(
        <Dropdown
          source={[
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Beta' },
          ]}
          value="a"
          onChange={onChange}
        />,
      ),
    );
    const root = document.querySelector('[data-react-toolbox="dropdown"]');
    await userEvent.click(screen.getByRole('combobox'));
    expect(root.className).toContain('active');
    await userEvent.click(screen.getByRole('option', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledWith('b', expect.anything());
    expect(root.className).not.toContain('active');
    await userEvent.click(screen.getByRole('combobox'));
    fireEvent.pointerDown(document.body, { pointerType: 'mouse' });
    await waitFor(() => expect(root.className).not.toContain('active'));
  });

  it('renders disabled dropdown options without invalid event handlers', () => {
    const onChange = vi.fn();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      strict(
        <Dropdown
          source={[
            { value: 'a', label: 'Available' },
            { value: 'b', label: 'Unavailable', disabled: true },
          ]}
          value="a"
          onChange={onChange}
        />,
      ),
    );
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Unavailable' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });

  it('keeps date edits until confirmation, then accepts subsequent controlled values', () => {
    vi.useFakeTimers();
    const date = new Date(2026, 9, 13);
    const onSelect = vi.fn();
    const view = render(strict(<DatePickerDialog active value={date} onSelect={onSelect} />));
    fireEvent.click(screen.getByText('14', { selector: '[data-react-toolbox="day"] span' }));
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onSelect.mock.calls[0][0].getDate()).toBe(14);
    view.rerender(strict(<DatePickerDialog active value={new Date(2026, 9, 16)} onSelect={onSelect} />));
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onSelect.mock.calls[1][0].getDate()).toBe(16);
  });

  it('updates a focused slider when its controlled value changes', () => {
    const onChange = vi.fn();
    const view = render(strict(<Slider editable value={20} step={1} onChange={onChange} />));
    fireEvent.focus(screen.getByRole('textbox'));
    view.rerender(strict(<Slider editable value={40} step={1} onChange={onChange} />));
    expect(screen.getByRole('textbox')).toHaveValue('40');
    fireEvent.blur(screen.getByRole('textbox'));
    expect(onChange).toHaveBeenCalledWith(40, expect.anything());
  });

  it('cancels snackbar timeouts on deactivation', () => {
    vi.useFakeTimers();
    const onTimeout = vi.fn();
    const view = render(strict(<Snackbar active timeout={100} label="Saved" onTimeout={onTimeout} />));
    advance(50);
    view.rerender(strict(<Snackbar active={false} timeout={100} label="Saved" onTimeout={onTimeout} />));
    advance(100);
    expect(onTimeout).not.toHaveBeenCalled();
  });
});
