import { StrictMode, createRef } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AppBar from '../components/app_bar';
import Button, { BrowseButton, IconButton } from '../components/button';
import { Layout, NavDrawer, Panel, Sidebar } from '../components/layout';
import { List, ListItem, ListItemContent } from '../components/list';
import { Table, TableHead, TableRow, TableCell } from '../components/table';

afterEach(cleanup);

describe('direct typed foundation components', () => {
  it('exposes native button, anchor, label, and file refs', () => {
    const button = createRef<HTMLButtonElement>();
    const anchor = createRef<HTMLAnchorElement>();
    const label = createRef<HTMLLabelElement>();
    const file = createRef<HTMLInputElement>();
    render(<><Button ref={button} label="Save" /><IconButton ref={anchor} href="#target" icon="link" />
      <BrowseButton ref={label} inputRef={file} label="Upload" /></>);
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
    rerender(<Button key="prevented" label="Save" onMouseDown={event => event.preventDefault()} />);
    fireEvent.mouseDown(screen.getByRole('button'), { button: 0 });
    expect(container.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
  });

  it('inherits list selection and ink while respecting explicit item overrides', () => {
    const { container } = render(<List selectable ripple>
      <ListItem caption="Inherited" />
      <ListItem caption="Explicit" selectable={false} ripple={false} />
      <ListItem><ListItemContent caption="Custom content" /></ListItem>
    </List>);
    const items = screen.getAllByRole('listitem');
    expect(items[0]?.firstChild).toHaveClass('rt-list-selectable');
    expect(items[1]?.firstChild).not.toHaveClass('rt-list-selectable');
    fireEvent.mouseDown(items[0]!, { button: 0 });
    expect(items[0]?.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
    fireEvent.mouseDown(items[1]!, { button: 0 });
    expect(items[1]?.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
    expect(container.querySelectorAll('.rt-list-itemContentRoot')).toHaveLength(3);
  });

  it('retains controlled table selection and typed cell coordinates', () => {
    const select = vi.fn();
    const click = vi.fn();
    render(<Table multiSelectable onRowSelect={select}>
      <TableHead><TableCell>Name</TableCell></TableHead>
      <TableRow selected><TableCell onClick={click} row={8}>First</TableCell></TableRow>
      <TableRow><TableCell>Second</TableCell></TableRow>
    </Table>);
    const checks = screen.getAllByRole('checkbox');
    fireEvent.click(checks[2]!);
    expect(select).toHaveBeenLastCalledWith([0, 1]);
    fireEvent.click(checks[1]!);
    expect(select).toHaveBeenLastCalledWith([]);
    fireEvent.click(checks[0]!);
    expect(select).toHaveBeenLastCalledWith([0, 1]);
    fireEvent.click(screen.getByText('First'));
    expect(click).toHaveBeenCalledWith(expect.anything(), 0, 8);
  });

  it('maps layout classes directly and recomputes permanent drawers after resizing', () => {
    const previous = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
    const { container } = render(<Layout>
      <AppBar fixed title="Toolbar" leftIcon="menu" />
      <NavDrawer permanentAt="sm" clipped><p>Left</p></NavDrawer>
      <Panel>Content</Panel>
      <Sidebar pinned width={4}><p>Right</p></Sidebar>
    </Layout>);
    expect(container.firstChild).toHaveClass('rt-layout-navDrawerPinned', 'rt-layout-sidebarWidth4', 'rt-layout-appbarFixed');
    expect(screen.getByRole('banner')).toHaveClass('rt-layout-appbarAppBar', 'rt-app-bar-appBar');
    expect(container.querySelector('.rt-layout-navDrawerDrawer')).toHaveClass('rt-layout-pinned', 'rt-layout-clipped');
    act(() => { Object.defineProperty(window, 'innerWidth', { configurable: true, value: 700 }); window.dispatchEvent(new Event('resize')); });
    expect(container.firstChild).not.toHaveClass('rt-layout-navDrawerPinned');
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: previous });
  });

  it('cleans up AppBar scroll listeners in StrictMode and clears hiding when disabled', () => {
    const previousScroll = window.scrollY;
    const header = createRef<HTMLElement>();
    const { rerender, unmount } = render(<StrictMode><AppBar ref={header} scrollHide title="Toolbar" /></StrictMode>);
    expect(header.current).toBe(screen.getByRole('banner'));
    act(() => { Object.defineProperty(window, 'scrollY', { configurable: true, value: 100 }); window.dispatchEvent(new Event('scroll')); });
    expect(header.current).toHaveClass('rt-app-bar-scrollHide');
    rerender(<StrictMode><AppBar ref={header} title="Toolbar" /></StrictMode>);
    expect(header.current).not.toHaveClass('rt-app-bar-scrollHide');
    unmount();
    expect(header.current).toBeNull();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: previousScroll });
  });
});
