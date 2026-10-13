import React, { StrictMode, createContext, createRef, useContext } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import Portal from '../components/hoc/Portal';
import { ThemeProvider } from '../components/theming';
import { Overlay } from '../components/overlay/Overlay';
import Button from '../components/button';
import Dialog from '../components/dialog';
import Drawer from '../components/drawer';
import Navigation from '../components/navigation';
import Input from '../components/input';
import Autocomplete from '../components/autocomplete';
import Slider from '../components/slider';
import DatePicker, { DatePickerDialog } from '../components/date_picker';
import TimePicker from '../components/time_picker';
import Snackbar from '../components/snackbar';
import Dropdown from '../components/dropdown';
import { IconMenu, Menu, MenuItem } from '../components/menu';
import Layout, { NavDrawer, Panel } from '../components/layout';
import Clock from '../components/time_picker/Clock';
import clockTheme from '../components/time_picker/theme';

const strict = children => <StrictMode>{children}</StrictMode>;
const advance = ms => act(() => vi.advanceTimersByTime(ms));

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
    const content = container => strict(
      <Context.Provider value="inherited context">
        <ThemeProvider variables={{ '--color-primary': '#123456' }}>
          <Portal ref={portal} container={container} className="original-wrapper"><Consumer /></Portal>
        </ThemeProvider>
      </Context.Provider>,
    );
    const view = render(content(first));
    const wrapper = first.firstElementChild.firstElementChild;
    expect(first.childElementCount).toBe(1);
    expect(wrapper).toHaveClass('original-wrapper');
    expect(wrapper).toHaveAttribute('data-react-toolbox-theme');
    expect(wrapper).toHaveAttribute('data-react-toolbox-tokens', '--color-primary');
    expect(wrapper.textContent).toBe('inherited context');
    expect(wrapper.style.getPropertyValue('--color-primary')).toBe('#123456');
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
    const view = render(strict(<Portal ref={portal}><span>Global theme</span></Portal>));
    const wrapper = portal.current.getOverlayDOMNode();
    expect(wrapper).not.toHaveAttribute('data-react-toolbox-theme');
    expect(wrapper).not.toHaveAttribute('data-react-toolbox-tokens');
    view.rerender(strict(<Portal ref={portal} style={{ '--color-primary': '#123456' }}><span>Local theme</span></Portal>));
    expect(wrapper).toHaveAttribute('data-react-toolbox-theme');
    expect(wrapper).toHaveAttribute('data-react-toolbox-tokens', '--color-primary');
    expect(wrapper.style.getPropertyValue('--color-primary')).toBe('#123456');
    view.rerender(strict(<Portal ref={portal}><span>Global theme</span></Portal>));
    expect(wrapper).not.toHaveAttribute('data-react-toolbox-theme');
    expect(wrapper).not.toHaveAttribute('data-react-toolbox-tokens');
    expect(wrapper.style.getPropertyValue('--color-primary')).toBe('');
  });

  it('falls back to the body for an empty container ref and moves when it becomes available', () => {
    const container = createRef();
    const portal = createRef();
    const view = render(strict(<Portal ref={portal} container={container}><span>Ref container</span></Portal>));
    const target = portal.current.getMountNode();
    expect(target.parentNode).toBe(document.body);
    const available = document.createElement('div');
    document.body.append(available);
    container.current = available;
    view.rerender(strict(<Portal ref={portal} container={container}><span>Ref container</span></Portal>));
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
    const view = render(strict(<><Overlay active theme={{}} /><Overlay active theme={{}} /></>));
    expect(document.body.style.overflow).toBe('hidden');
    view.rerender(strict(<><Overlay active={false} theme={{}} /><Overlay active theme={{}} /></>));
    expect(document.body.style.overflow).toBe('hidden');
    view.unmount();
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('retains function defaults and the dialog activation and exit timings', () => {
    vi.useFakeTimers();
    const view = render(strict(<Dialog active={false} title="Default dialog" />));
    expect(screen.queryByText('Default dialog')).not.toBeInTheDocument();
    view.rerender(strict(<Dialog active title="Default dialog" />));
    const dialog = document.querySelector('[data-react-toolbox="dialog"]');
    expect(dialog).toBeInTheDocument();
    expect(dialog.className).toContain('normal');
    expect(dialog.className).not.toContain('active');
    advance(20);
    expect(dialog.className).toContain('active');
    view.rerender(strict(<Dialog active={false} title="Default dialog" />));
    expect(dialog.className).not.toContain('active');
    advance(499);
    expect(dialog).toBeInTheDocument();
    advance(1);
    expect(dialog).not.toBeInTheDocument();
    render(strict(<><Navigation /><Drawer active>Default drawer</Drawer></>));
    expect(document.querySelector('[data-react-toolbox="navigation"]').className).toContain('horizontal');
    expect(document.querySelector('[data-react-toolbox="drawer"]').className).toContain('left');
  });

  it('cancels a queued reveal when the dialog closes before its first frame', () => {
    vi.useFakeTimers();
    const view = render(strict(<Dialog active={false}>Quick dialog</Dialog>));
    view.rerender(strict(<Dialog active>Quick dialog</Dialog>));
    view.rerender(strict(<Dialog active={false}>Quick dialog</Dialog>));
    advance(20);
    const dialog = document.querySelector('[data-react-toolbox="dialog"]');
    expect(dialog.className).not.toContain('active');
    advance(480);
    expect(dialog).not.toBeInTheDocument();
  });

  it('forwards imperative input refs and updates autocomplete controlled values', () => {
    const input = createRef();
    const source = { a: 'Alpha', b: 'Beta' };
    const view = render(strict(<><Input ref={input} label="Ref input" /><Autocomplete multiple={false} source={source} value="a" /></>));
    act(() => input.current.focus());
    expect(document.activeElement).toBe(view.container.querySelector('input'));
    act(() => input.current.blur());
    expect(screen.getByDisplayValue('Alpha')).toBeInTheDocument();
    view.rerender(strict(<><Input ref={input} label="Ref input" /><Autocomplete multiple={false} source={source} value="b" /></>));
    expect(screen.getByDisplayValue('Beta')).toBeInTheDocument();
    fireEvent.focus(screen.getByDisplayValue('Beta'));
    fireEvent.keyUp(screen.getByDisplayValue('Beta'), { key: 'Escape', keyCode: 27, which: 27 });
  });

  it('edits a slider through the current Input ref API', () => {
    const onChange = vi.fn();
    render(strict(<Slider editable value={20} step={1} onChange={onChange} />));
    const input = screen.getByDisplayValue('20');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '35' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(35, expect.anything());
  });

  it('slides calendar months using DOM refs and preserves the 350ms transition', () => {
    vi.useFakeTimers();
    const value = new Date(2026, 9, 13);
    render(strict(<DatePickerDialog active value={value} />));
    expect(screen.getByText('October 2026')).toBeInTheDocument();
    fireEvent.click(document.querySelector('[data-react-toolbox="calendar"] #right'));
    expect(screen.getByText('November 2026')).toBeInTheDocument();
    expect(screen.getByText('October 2026')).toBeInTheDocument();
    advance(350);
    expect(screen.queryByText('October 2026')).not.toBeInTheDocument();
  });

  it('keeps date and time dialog confirmation callbacks available', () => {
    vi.useFakeTimers();
    const dateChange = vi.fn();
    const date = new Date(2026, 9, 13, 9, 30);
    const view = render(strict(<DatePicker active value={date} onChange={dateChange} />));
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(dateChange).toHaveBeenCalledWith(date, expect.anything());
    view.unmount();
    const timeChange = vi.fn();
    const timeView = render(strict(<TimePicker active value={date} onChange={timeChange} />));
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(timeChange).toHaveBeenCalledWith(date, expect.anything());
    timeView.unmount();
    advance(1000);
  });

  it('zooms clock views using DOM refs and preserves the 500ms transition', () => {
    vi.useFakeTimers();
    const props = { theme: clockTheme, time: new Date(2026, 9, 13, 9, 30), onChange: vi.fn() };
    const view = render(strict(<Clock {...props} display="hours" />));
    advance(0);
    view.rerender(strict(<Clock {...props} display="minutes" />));
    expect(view.container.querySelectorAll(`.${clockTheme.clockWrapper}`)).toHaveLength(2);
    advance(500);
    expect(view.container.querySelectorAll(`.${clockTheme.clockWrapper}`)).toHaveLength(1);
    view.unmount();
    advance(1000);
  });

  it('honors repeated controlled IconMenu props after internal toggles', () => {
    vi.useFakeTimers();
    const view = render(strict(<IconMenu active={false}><MenuItem value="one" caption="One" /></IconMenu>));
    fireEvent.click(view.container.querySelector('[data-react-toolbox="button"]'));
    advance(20);
    expect(view.container.querySelector('[data-react-toolbox="menu"]').className).toContain('active');
    view.rerender(strict(<IconMenu active={false}><MenuItem value="one" caption="One" /></IconMenu>));
    expect(view.container.querySelector('[data-react-toolbox="menu"]').className).not.toContain('active');
    view.rerender(strict(<IconMenu active><MenuItem value="one" caption="One" /></IconMenu>));
    advance(20);
    expect(view.container.querySelector('[data-react-toolbox="menu"]').className).toContain('active');
  });

  it('measures static menus in their committed layout and remeasures position changes', () => {
    vi.useFakeTimers();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function measureMenu() {
      return {
        width: this.parentElement?.classList.contains('rt-menu-static') ? 450 : 180,
        height: 240, left: 0, top: 0, right: 450, bottom: 240,
      };
    });
    const view = render(strict(<Menu><MenuItem caption="Download" /></Menu>));
    const menu = view.container.querySelector('[data-react-toolbox="menu"]');
    expect(menu).toHaveClass('rt-menu-static');
    advance(0);
    expect(menu.querySelector('.rt-menu-outline').style.width).toBe('450px');
    expect(menu.style.width).toBe('');
    view.rerender(strict(<Menu position="topRight"><MenuItem caption="Download" /></Menu>));
    expect(menu.querySelector('.rt-menu-outline').style.width).toBe('180px');
    expect(menu.style.width).toBe('180px');
  });

  it('keeps menu outlines synchronized with resized or changed content and disconnects observers', () => {
    vi.useFakeTimers();
    const observers = [];
    vi.stubGlobal('ResizeObserver', vi.fn(function ResizeObserver(callback) {
      this.callback = callback;
      this.observe = vi.fn();
      this.disconnect = vi.fn();
      observers.push(this);
    }));
    let size = { width: 180, height: 240 };
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      ...size, left: 0, top: 0, right: size.width, bottom: size.height,
    }));
    const view = render(strict(<Menu position="topRight"><MenuItem caption="Download" /></Menu>));
    advance(0);
    const menu = view.container.querySelector('[data-react-toolbox="menu"]');
    const observer = observers[observers.length - 1];
    expect(observer.observe).toHaveBeenCalledWith(menu.querySelector('ul'), { box: 'border-box' });
    expect(observer.observe).toHaveBeenCalledWith(menu, { box: 'border-box' });
    size = { width: 260, height: 280 };
    act(() => observer.callback([]));
    expect(menu.querySelector('.rt-menu-outline').style.width).toBe('260px');
    expect(menu.querySelector('.rt-menu-outline').style.height).toBe('280px');
    expect(menu.style.width).toBe('260px');
    size = { width: 260, height: 328 };
    view.rerender(strict(<Menu position="topRight"><MenuItem caption="Download" /><MenuItem caption="Share" /></Menu>));
    expect(menu.querySelector('.rt-menu-outline').style.height).toBe('328px');
    view.unmount();
    expect(observer.disconnect).toHaveBeenCalledOnce();
    expect(() => act(() => observer.callback([]))).not.toThrow();
  });

  it('aligns static outlines with list margins and leaves popup positioning to its theme', () => {
    vi.useFakeTimers();
    let resize;
    vi.stubGlobal('ResizeObserver', vi.fn(function ResizeObserver(callback) {
      resize = callback;
      this.observe = vi.fn();
      this.disconnect = vi.fn();
    }));
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 180, height: 240, left: 8, top: 14, right: 188, bottom: 254,
    });
    let top = 14;
    let left = 8;
    vi.spyOn(HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(() => top);
    vi.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockImplementation(() => left);
    const view = render(strict(<Menu><MenuItem caption="Download" /></Menu>));
    advance(0);
    const outline = view.container.querySelector('.rt-menu-outline');
    expect(outline.style.top).toBe('14px');
    expect(outline.style.left).toBe('8px');
    expect(outline.style.height).toBe('240px');
    top = 24;
    left = 16;
    act(() => resize([]));
    expect(outline.style.top).toBe('24px');
    expect(outline.style.left).toBe('16px');
    expect(outline.style.height).toBe('240px');
    view.rerender(strict(<Menu position="topRight"><MenuItem caption="Download" /></Menu>));
    expect(outline.style.top).toBe('');
    expect(outline.style.left).toBe('');
  });

  it('remeasures menu viewport and font changes without ResizeObserver and removes fallback listeners', () => {
    vi.useFakeTimers();
    vi.stubGlobal('ResizeObserver', undefined);
    const originalFonts = Object.getOwnPropertyDescriptor(document, 'fonts');
    const fonts = new EventTarget();
    Object.defineProperty(document, 'fonts', { configurable: true, value: fonts });
    const removeFontListener = vi.spyOn(fonts, 'removeEventListener');
    const removeWindowListener = vi.spyOn(window, 'removeEventListener');
    let width = 180;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      width, height: 240, left: 0, top: 0, right: width, bottom: 240,
    }));
    try {
      const view = render(strict(<Menu><MenuItem caption="Download" /></Menu>));
      advance(0);
      const outline = view.container.querySelector('.rt-menu-outline');
      width = 240;
      fireEvent(window, new Event('resize'));
      expect(outline.style.width).toBe('240px');
      width = 220;
      act(() => fonts.dispatchEvent(new Event('loadingdone')));
      expect(outline.style.width).toBe('220px');
      view.unmount();
      expect(removeWindowListener).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(removeFontListener).toHaveBeenCalledWith('loadingdone', expect.any(Function));
    } finally {
      if (originalFonts) Object.defineProperty(document, 'fonts', originalFonts);
      else delete document.fonts;
    }
  });

  it('handles a menu mounted active and closes it once on an outside click', () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    render(strict(<Menu active onHide={onHide}><MenuItem value="one" caption="One" /></Menu>));
    fireEvent.click(document.body);
    expect(document.querySelector('[data-react-toolbox="menu"]').className).not.toContain('active');
    expect(onHide).toHaveBeenCalledOnce();
    fireEvent.click(document.body);
    expect(onHide).toHaveBeenCalledOnce();
  });

  it('opens dropdowns, selects values and removes the outside-click listener on close', () => {
    const onChange = vi.fn();
    render(strict(<Dropdown source={[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }]} value="a" onChange={onChange} />));
    const root = document.querySelector('[data-react-toolbox="dropdown"]');
    fireEvent.click(screen.getByDisplayValue('Alpha'));
    expect(root.className).toContain('active');
    fireEvent.click(screen.getByText('Beta'));
    expect(onChange).toHaveBeenCalledWith('b', expect.anything());
    expect(root.className).not.toContain('active');
    fireEvent.click(screen.getByDisplayValue('Alpha'));
    fireEvent.click(document.body);
    expect(root.className).not.toContain('active');
  });

  it('renders disabled dropdown options without invalid event handlers', () => {
    const onChange = vi.fn();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(strict(<Dropdown source={[{ value: 'a', label: 'Available' }, { value: 'b', label: 'Unavailable', disabled: true }]} value="a" onChange={onChange} />));
    fireEvent.click(screen.getByDisplayValue('Available'));
    fireEvent.click(screen.getByText('Unavailable'));
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
    fireEvent.focus(screen.getByDisplayValue('20'));
    view.rerender(strict(<Slider editable value={40} step={1} onChange={onChange} />));
    expect(screen.getByDisplayValue('40')).toBeInTheDocument();
    fireEvent.blur(screen.getByDisplayValue('40'));
    expect(onChange).toHaveBeenCalledWith(40, expect.anything());
  });

  it('hydrates responsive Layout markup before measuring the client viewport', async () => {
    const element = strict(<Layout><NavDrawer permanentAt="sm">Navigation</NavDrawer><Panel>Content</Panel></Layout>);
    const container = document.createElement('div');
    container.innerHTML = renderToString(element);
    document.body.append(container);
    expect(container.firstElementChild.className).not.toContain('navDrawerPinned');
    const onRecoverableError = vi.fn();
    let root;
    await act(async () => { root = hydrateRoot(container, element, { onRecoverableError }); });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.firstElementChild.className).toContain('navDrawerPinned');
    act(() => root.unmount());
    container.remove();
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
