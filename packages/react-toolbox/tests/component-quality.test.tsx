import { StrictMode, useState } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AppBar from '../src/material/app-bar';
import Autocomplete from '../src/material/autocomplete';
import Avatar from '../src/material/avatar';
import { CardMedia } from '../src/material/card';
import Checkbox from '../src/material/checkbox';
import Dialog from '../src/material/dialog';
import Dropdown from '../src/material/dropdown';
import Calendar from '../src/material/date-picker/Calendar';
import Input from '../src/material/input';
import { IconMenu, MenuItem } from '../src/material/menu';
import RadioButton from '../src/material/radio';
import { RadioGroup } from '../src/material/radio';
import Slider from '../src/material/slider';
import ClockHours from '../src/material/time-picker/ClockHours';
import Switch from '../src/material/switch';
import { Table, TableCell, TableHead, TableRow } from '../src/material/table';
import { Tab, Tabs } from '../src/material/tabs';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('native forms', () => {
  it('leaves control values and derived visuals alone when a form reset is cancelled', async () => {
    const view = render(
      <form onReset={(event) => event.preventDefault()}>
        <Input label="Name" defaultValue="Ada" maxLength={10} />
        <Checkbox label="Alerts" defaultChecked />
      </form>,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Grace' } });
    await userEvent.click(screen.getByRole('checkbox'));
    await act(async () => {
      view.container.querySelector('form')!.reset();
      await new Promise((resolve) => setTimeout(resolve, 5));
    });
    expect(screen.getByRole('textbox')).toHaveValue('Grace');
    expect(screen.getByText('5/10')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
  it.each([
    ['checkbox', Checkbox],
    ['switch', Switch],
  ] as const)('%s supports defaults, native submission, cancellation, and reset', async (role, Control) => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <form>
        <Control name="alerts" label="Alerts" defaultChecked onChange={change} />
      </form>,
    );
    const input = screen.getByRole(role, { name: 'Alerts' });
    const form = view.container.querySelector('form')!;
    expect(input).toBeChecked();
    expect(new FormData(form).get('alerts')).toBe('on');
    await user.click(input);
    expect(input).not.toBeChecked();
    expect(new FormData(form).has('alerts')).toBe(false);
    view.rerender(
      <form>
        <Control name="alerts" label="Alerts" defaultChecked onChange={change} />
      </form>,
    );
    expect(input).not.toBeChecked();
    await act(async () => form.reset());
    expect(input).toBeChecked();
    expect(change).toHaveBeenCalledTimes(1);
    view.rerender(
      <form>
        <Control
          name="alerts"
          label="Alerts"
          defaultChecked
          onChange={change}
          onClick={(event) => event.preventDefault()}
        />
      </form>,
    );
    await user.click(input);
    expect(input).toBeChecked();
    expect(change).toHaveBeenCalledTimes(1);
  });

  it('keeps uncontrolled radio visuals in sync with native peer selection', async () => {
    const user = userEvent.setup();
    render(
      <form>
        <RadioButton name="size" label="Small" defaultChecked />
        <RadioButton name="size" label="Large" />
      </form>,
    );
    await user.click(screen.getByRole('radio', { name: 'Large' }));
    const small = screen.getByRole('radio', { name: 'Small' });
    expect(small).not.toBeChecked();
    expect(small.parentElement?.querySelector('.rt-radio-radioChecked')).toBeNull();
    expect(screen.getByRole('radio', { name: 'Large' })).toBeChecked();
  });

  it('resets a text counter and filled label with its externally associated form', async () => {
    const view = render(
      <>
        <form id="profile" />
        <Input form="profile" label="Name" maxLength={10} defaultValue="Ada" />
      </>,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Grace' } });
    expect(screen.getByText('5/10')).toBeInTheDocument();
    await act(async () => view.container.querySelector('form')!.reset());
    expect(screen.getByRole('textbox')).toHaveValue('Ada');
    await waitFor(() => expect(screen.getByText('3/10')).toBeInTheDocument());
  });

  it('validates a required dropdown, submits its value, and resets its default', async () => {
    const user = userEvent.setup();
    const view = render(
      <form>
        <Dropdown label="Destination" name="city" required source={['Madrid', 'Tokyo']} />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    act(() => {
      expect(form.checkValidity()).toBe(false);
    });
    const trigger = screen.getByRole('combobox', { name: /Destination/ });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    await user.click(screen.getByRole('option', { name: 'Tokyo' }));
    expect(form.checkValidity()).toBe(true);
    await waitFor(() => expect(new FormData(form).get('city')).toBe('Tokyo'));
    expect(trigger).toHaveValue('Tokyo');
    await act(async () => form.reset());
    await waitFor(() => expect(trigger).toHaveValue(''));
  });

  it('announces a mixed checkbox and exposes the native indeterminate state', () => {
    render(<Checkbox label="All" checked={false} indeterminate />);
    const control = screen.getByRole('checkbox');
    expect(control).toBePartiallyChecked();
    expect((control as HTMLInputElement).indeterminate).toBe(true);
    fireEvent.click(control);
    expect((control as HTMLInputElement).indeterminate).toBe(true);
  });

  it('keeps controlled dropdown submission consistent after form reset', async () => {
    const view = render(
      <form>
        <Dropdown label="City" name="city" value="Tokyo" source={['Paris', 'Tokyo']} />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    await act(async () => form.reset());
    await waitFor(() => expect(new FormData(form).get('city')).toBe('Tokyo'));
    expect(screen.getByRole('combobox')).toHaveValue('Tokyo');
  });

  it('composes radio groups through wrappers, resets defaults, and invokes both callbacks', async () => {
    const child = vi.fn(),
      group = vi.fn();
    const view = render(
      <form>
        <RadioGroup name="size" defaultValue="s" onChange={group}>
          <div>
            <RadioButton value="s" label="Small" />
          </div>
          <>
            <RadioButton value="l" label="Large" onChange={child} />
          </>
        </RadioGroup>
      </form>,
    );
    await userEvent.click(screen.getByRole('radio', { name: 'Large' }));
    expect(child).toHaveBeenCalledOnce();
    expect(group).toHaveBeenCalledWith('l', expect.anything());
    expect(screen.getByRole('radio', { name: 'Small' })).not.toBeChecked();
    await act(async () => view.container.querySelector('form')!.reset());
    expect(screen.getByRole('radio', { name: 'Small' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Large' })).not.toBeChecked();
    await waitFor(() => expect(view.container.querySelectorAll('.rt-radio-radioChecked')).toHaveLength(1));
  });
});

describe('combobox and navigation interactions', () => {
  it('ignores secondary clock presses and cancels touch without advancing the dial', () => {
    const change = vi.fn(),
      moved = vi.fn();
    const view = render(
      <ClockHours format="ampm" selected={9} spacing={14} radius={100} onChange={change} onHandMoved={moved} />,
    );
    const face = view.container.querySelector<HTMLElement>('.rt-time-picker-face')!;
    vi.spyOn(face, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 200,
      bottom: 200,
      width: 200,
      height: 200,
      toJSON() {},
    });
    fireEvent.mouseDown(face, { button: 2, clientX: 100, clientY: 0 });
    fireEvent.mouseUp(document);
    expect(change).not.toHaveBeenCalled();
    expect(moved).not.toHaveBeenCalled();
    fireEvent.touchStart(face, { touches: [{ clientX: 100, clientY: 0 }] });
    expect(change).toHaveBeenCalledOnce();
    fireEvent.touchCancel(document);
    fireEvent.touchEnd(document);
    fireEvent.touchMove(document, { touches: [{ clientX: 200, clientY: 100 }] });
    expect(change).toHaveBeenCalledOnce();
    expect(moved).not.toHaveBeenCalled();
  });
  it('preserves typed query through a parent update with freshly allocated source', () => {
    function Example() {
      const [, rerender] = useState(0);
      return (
        <Autocomplete
          multiple={false}
          label="Country"
          source={['Japan', 'Spain']}
          value="Spain"
          onQueryChange={() => rerender((value) => value + 1)}
        />
      );
    }
    render(<Example />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Ja' } });
    expect(screen.getByRole('combobox')).toHaveValue('Ja');
  });

  it('clamps calendar page navigation and year selection at the end of February', () => {
    const change = vi.fn();
    const view = render(<Calendar selectedDate={new Date(2024, 0, 31)} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('group', { name: 'Calendar' }), { key: 'PageDown' });
    expect(change).toHaveBeenLastCalledWith(new Date(2024, 1, 29), false);
    view.rerender(<Calendar selectedDate={new Date(2024, 1, 29)} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('group', { name: 'Calendar' }), { key: 'PageDown', shiftKey: true });
    expect(change).toHaveBeenLastCalledWith(new Date(2025, 1, 28), false);
    view.rerender(<Calendar display="years" selectedDate={new Date(2024, 1, 29)} onChange={change} />);
    fireEvent.click(screen.getByRole('button', { name: '2025' }));
    expect(change).toHaveBeenLastCalledWith(new Date(2025, 1, 28), false);
  });

  it('does not intercept calendar navigation-button arrows or bypass date limits', () => {
    const change = vi.fn();
    render(<Calendar selectedDate={new Date(2024, 1, 15)} minDate={new Date(2024, 1, 1)} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Next month' }), { key: 'ArrowLeft' });
    fireEvent.keyDown(screen.getByRole('group', { name: 'Calendar' }), { key: 'PageUp' });
    expect(change).not.toHaveBeenCalled();
  });

  it('uses ten slider steps for page keys, clamps bounds, and preserves modifier shortcuts', () => {
    const change = vi.fn();
    render(<Slider aria-label="Volume" value={0.5} min={0} max={1} step={0.1} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'PageUp' });
    expect(change).toHaveBeenLastCalledWith(1);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'PageDown' });
    expect(change).toHaveBeenLastCalledWith(0);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight', ctrlKey: true });
    expect(change).toHaveBeenCalledTimes(2);
  });
  it('respects an explicitly empty controlled query and updates it in multiple mode', () => {
    const query = vi.fn();
    const view = render(
      <Autocomplete multiple={false} label="Search" source={{ a: 'Alpha' }} value="a" query="" onQueryChange={query} />,
    );
    expect(screen.getByRole('combobox')).toHaveValue('');
    view.rerender(<Autocomplete label="Search" source={['Alpha', 'Beta']} query="Beta" onQueryChange={query} />);
    expect(screen.getByRole('combobox')).toHaveValue('Beta');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Alpha' } });
    expect(query).toHaveBeenCalledWith('Alpha');
    expect(screen.getByRole('combobox')).toHaveValue('Beta');
  });

  it('does not select while pressing or scrolling; a click commits the option', () => {
    const change = vi.fn();
    render(
      <Autocomplete label="Search" multiple={false} source={['Alpha', 'Beta']} onChange={change} keepFocusOnChange />,
    );
    const field = screen.getByRole('combobox');
    act(() => field.focus());
    const beta = screen.getByRole('option', { name: 'Beta' });
    fireEvent.mouseDown(beta, { button: 0 });
    fireEvent.mouseDown(beta, { button: 2 });
    expect(change).not.toHaveBeenCalled();
    fireEvent.click(beta);
    expect(change).toHaveBeenCalledExactlyOnceWith('Beta', expect.anything());
    expect(field).toHaveFocus();
    fireEvent.keyDown(field, { key: 'Escape' });
    expect(field).toHaveFocus();
    fireEvent.change(field, { target: { value: 'Al' } });
    expect(screen.getByRole('option', { name: 'Alpha' })).toBeInTheDocument();
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

describe('accessible composition', () => {
  it('hides background content from assistive technology and restores it when a modal closes', () => {
    const view = render(
      <StrictMode>
        <button>Outside</button>
        <Dialog active title="Confirm">
          <button>Inside</button>
        </Dialog>
      </StrictMode>,
    );
    expect(screen.queryByRole('button', { name: 'Outside' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Inside' })).toBeInTheDocument();
    view.rerender(
      <StrictMode>
        <button>Outside</button>
        <Dialog active={false} title="Confirm" />
      </StrictMode>,
    );
    expect(screen.getByRole('button', { name: 'Outside' })).toBeInTheDocument();
  });

  it('exposes table captions, mixed selection, named checkboxes, and keyboard sorting', async () => {
    const user = userEvent.setup();
    const sort = vi.fn();
    render(
      <Table multiSelectable>
        <caption>Team</caption>
        <TableHead>
          <TableCell sorted="asc" onClick={sort}>
            Name
          </TableCell>
        </TableHead>
        <TableRow selected>
          <TableCell>Ada</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Grace</TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByRole('table', { name: 'Team' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBePartiallyChecked();
    expect(screen.getByRole('checkbox', { name: 'Select row 1' })).toBeChecked();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('aria-sort', 'ascending');
    screen.getByRole('button', { name: 'Name' }).focus();
    await user.keyboard('{Enter}');
    expect(sort).toHaveBeenCalledOnce();
  });

  it('allows the last selected row to be deselected in single-selection tables', async () => {
    const change = vi.fn();
    render(
      <Table onRowSelect={change}>
        <TableRow selected>
          <TableCell>Ada</TableCell>
        </TableRow>
      </Table>,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select row 1' }));
    expect(change).toHaveBeenCalledWith([]);
  });

  it('labels app-bar actions and preserves card media nodes and background styling', () => {
    render(
      <>
        <AppBar leftIcon="menu" leftIconLabel="Open navigation" rightIcon="search" rightIconLabel="Search" />
        <CardMedia image={<img src="/photo.jpg" alt="Mountains" />} />
        <CardMedia data-testid="background" image="/cover.jpg" alt="Forest" style={{ opacity: 0.5 }} />
      </>,
    );
    expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Mountains' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Forest' })).toBeInTheDocument();
    expect(screen.getByTestId('background').style.backgroundImage).toContain('/cover.jpg');
  });

  it('keeps an avatar fallback while its image is unavailable', () => {
    render(<Avatar image="/missing.jpg" alt="Ada Lovelace" title="Ada" />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
