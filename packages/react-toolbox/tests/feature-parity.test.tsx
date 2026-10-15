import { createRef, useState, type ComponentPropsWithRef } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button, IconButton } from '../src/material/button';
import { Tabs, Tab } from '../src/material/tabs';
import Slider from '../src/material/slider';
import Autocomplete from '../src/material/autocomplete';
import Dropdown from '../src/material/dropdown';
import Dialog from '../src/material/dialog';
import DatePicker from '../src/material/date-picker';
import TimePicker from '../src/material/time-picker';
import Drawer from '../src/material/drawer';
import { IconMenu, Menu, MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem } from '../src/material/menu';
import { RadioGroup, RadioButton } from '../src/material/radio';
import { Table, TableHead, TableRow, TableCell } from '../src/material/table';
import Tooltip from '../src/material/tooltip';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
const reset = async (form: HTMLFormElement) =>
  act(async () => {
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 5));
  });

describe('consumer composition', () => {
  it('composes tooltip behavior onto an asChild button without changing its single-child contract', async () => {
    const HintButton = Tooltip(Button);
    const linkRef = createRef<HTMLAnchorElement>();
    const click = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(
      <HintButton asChild tooltip="View your profile" tooltipDelay={0}>
        <a ref={linkRef} href="/profile" onClick={click}>
          Profile
        </a>
      </HintButton>,
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
    const HintButton = Tooltip(Button);
    const triggerRef = createRef<HTMLButtonElement>();
    render(
      <IconMenu
        trigger={
          <HintButton asChild tooltip="Change display settings" tooltipDelay={0}>
            <button type="button" ref={triggerRef}>
              Display settings
            </button>
          </HintButton>
        }
      >
        <MenuItem caption="Compact" />
      </IconMenu>,
    );
    const trigger = screen.getByRole('button', { name: 'Display settings' });
    expect(triggerRef.current).toBe(trigger);
    expect(trigger.querySelector('button')).toBeNull();
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Compact' })).toHaveFocus());
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

describe('form and search workflows', () => {
  it('submits and resets an uncontrolled slider, committing keyboard and edited values', async () => {
    const commit = vi.fn();
    const view = render(
      <form id="settings">
        <Slider defaultValue={20} name="volume" step={5} editable aria-label="Volume" onValueCommit={commit} />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveAttribute('aria-valuenow', '25');
    expect(new FormData(form).get('volume')).toBe('25');
    expect(commit).toHaveBeenLastCalledWith(25);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    // The real input needs browser focus for its imperative blur to fire.
    fireEvent.blur(input);
    expect(new FormData(form).get('volume')).toBe('42');
    await reset(form);
    expect(slider).toHaveAttribute('aria-valuenow', '20');
    expect(new FormData(form).get('volume')).toBe('20');
  });

  it('uses RTL keyboard direction and commits a drag once at release', () => {
    const commit = vi.fn();
    render(<Slider defaultValue={50} step={1} dir="rtl" onValueCommit={commit} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider).toHaveAttribute('aria-valuenow', '51');
    vi.spyOn(slider, 'getBoundingClientRect').mockReturnValue({ left: 0, width: 100 } as DOMRect);
    fireEvent.mouseDown(slider, { button: 0, clientX: 25 });
    expect(commit).toHaveBeenCalledTimes(1);
    fireEvent.mouseMove(document, { clientX: 20 });
    fireEvent.mouseUp(document);
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenLastCalledWith(80);
  });

  it('keeps controlled sliders authoritative through change and form reset', async () => {
    const change = vi.fn();
    const view = render(
      <form>
        <Slider value={30} defaultValue={5} name="volume" onChange={change} step={1} />
      </form>,
    );
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'End' });
    expect(change).toHaveBeenLastCalledWith(100);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30');
    await reset(view.container.querySelector('form')!);
    expect(new FormData(view.container.querySelector('form')!).get('volume')).toBe('30');
  });

  it('searches rich options by text, skips disabled choices, submits IDs and resets', async () => {
    const view = render(
      <form>
        <Autocomplete
          multiple={false}
          name="country"
          label="Country"
          defaultValue="fr"
          source={[
            { value: 'fr', label: <b>France</b>, textValue: 'France', group: 'Europe' },
            { value: 'de', label: 'Germany', disabled: true, group: 'Europe' },
            { value: 'gr', label: 'Greece', group: 'Europe' },
          ]}
        />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    const input = screen.getByRole('combobox');
    expect(input).toHaveValue('France');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'G' } });
    expect(screen.getByRole('group', { name: 'Europe' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Germany' })).toHaveAttribute('aria-disabled', 'true');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input).toHaveValue('Greece');
    expect(new FormData(form).get('country')).toBe('gr');
    await reset(form);
    expect(input).toHaveValue('France');
    expect(new FormData(form).get('country')).toBe('fr');
  });

  it('supports default multi-values, clear controls, required validation and form reset', async () => {
    const view = render(
      <form>
        <Autocomplete
          name="people"
          label="People"
          required
          clearable
          defaultValue={['ada', 'grace']}
          source={{ ada: 'Ada', grace: 'Grace' }}
        />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    expect(new FormData(form).getAll('people')).toEqual(['ada', 'grace']);
    await userEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(new FormData(form).getAll('people')).toEqual([]);
    expect(form.checkValidity()).toBe(false);
    expect(screen.getByRole('combobox')).toHaveFocus();
    await reset(form);
    expect(new FormData(form).getAll('people')).toEqual(['ada', 'grace']);
    expect(form.checkValidity()).toBe(true);
  });

  it('announces loading and empty results without inventing selectable options', () => {
    const view = render(<Autocomplete multiple={false} open source={[]} loading />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
    expect(screen.getByRole('status').closest('[role="listbox"]')).toBeNull();
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByRole('option')).toBeNull();
    view.rerender(<Autocomplete multiple={false} open source={[]} emptyMessage="No matches" />);
    expect(screen.getByRole('status')).toHaveTextContent('No matches');
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('lets a controlled combobox reject an open request', () => {
    const change = vi.fn();
    render(<Autocomplete multiple={false} open={false} onOpenChange={change} source={['Ada']} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(change).toHaveBeenCalledWith(true);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('groups dropdown options and uses rich option text for typeahead', () => {
    const change = vi.fn();
    render(
      <Dropdown
        defaultOpen
        source={[
          { value: 'us', label: <b>United States</b>, textValue: 'United States', group: 'Americas' },
          { value: 'ca', label: 'Canada', group: 'Americas' },
        ]}
        onChange={change}
      />,
    );
    expect(screen.getByRole('group', { name: 'Americas' })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'c' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    expect(change).toHaveBeenCalledWith('ca', expect.anything());
    expect(screen.getByRole('combobox')).toHaveValue('Canada');
  });
});

describe('menu workflows', () => {
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
    const command = screen.getByRole('menuitem');
    await waitFor(() => expect(command).toHaveFocus());
    fireEvent.keyDown(command, { key: 'Escape' });
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
    await user.click(trigger);
    const toolbar = screen.getByRole('menuitemcheckbox', { name: 'Toolbar' });
    await waitFor(() => expect(toolbar).toHaveFocus());
    fireEvent.keyDown(toolbar, { key: ' ' });
    expect(check).toHaveBeenCalledWith(false);
    expect(toolbar).toHaveAttribute('aria-checked', 'false');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(toolbar, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitemradio', { name: 'Small' })).toHaveFocus();
    await user.click(screen.getByRole('menuitemradio', { name: 'Large' }));
    expect(radio).toHaveBeenCalledWith('large');
    expect(screen.getByRole('menuitemradio', { name: 'Large' })).toHaveAttribute('aria-checked', 'true');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
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

  it('keeps controlled menus open until the consumer accepts dismissal', async () => {
    const change = vi.fn();
    render(
      <Menu open onOpenChange={change} position="topLeft">
        <MenuItem caption="Save" />
      </Menu>,
    );
    await userEvent.click(screen.getByRole('menuitem'));
    expect(change).toHaveBeenCalledWith(false);
    expect(screen.getByRole('menu')).not.toHaveAttribute('aria-hidden', 'true');
  });
});

describe('overlay and table composition', () => {
  it.each([Dialog, Drawer])('supports custom autofocus and return-focus targets', async (Modal) => {
    const open = vi.fn((event: Event) => {
      event.preventDefault();
      document.getElementById('field')?.focus();
    });
    const close = vi.fn((event: Event) => {
      event.preventDefault();
      document.getElementById('next')?.focus();
    });
    const Example = () => {
      const [active, setActive] = useState(false);
      return (
        <>
          <button id="next">Next task</button>
          <button onClick={() => setActive(true)}>Open</button>
          <Modal active={active} onOpenAutoFocus={open} onCloseAutoFocus={close} aria-label="Editor">
            <input id="field" aria-label="Name" />
            <button onClick={() => setActive(false)}>Done</button>
          </Modal>
        </>
      );
    };
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus());
    await userEvent.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Next task' })).toHaveFocus());
    expect(open).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('preserves native table sections, fragments, row-header semantics and selection indices', async () => {
    const select = vi.fn();
    render(
      <Table multiSelectable onRowSelect={select}>
        <caption>People</caption>
        <thead>
          <TableHead>
            <>
              <TableCell>Name</TableCell>
            </>
          </TableHead>
        </thead>
        <tbody data-testid="body">
          <>
            <TableRow selected>
              <TableCell tagName="th" scope="row">
                Ada
              </TableCell>
            </TableRow>
            <TableRow>
              <>
                <TableCell>Grace</TableCell>
              </>
            </TableRow>
          </>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Two people</td>
          </tr>
        </tfoot>
      </Table>,
    );
    expect(screen.getByRole('rowheader', { name: 'Ada' })).toHaveAttribute('scope', 'row');
    expect(within(screen.getByTestId('body')).getAllByRole('row')).toHaveLength(2);
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select row 2' }));
    expect(select).toHaveBeenCalledWith([0, 1]);
    expect(screen.getByText('Two people')).toBeInTheDocument();
    expect(screen.getByRole('table')).toHaveAccessibleName('People');
  });
});

it.each([DatePicker, TimePicker])(
  'initializes picker drafts from defaultValue and honors controlled visibility',
  async (Picker) => {
    const open = vi.fn();
    const view = render(
      <form>
        <Picker label="When" name="when" defaultValue={new Date(2026, 9, 15, 9, 30)} open={false} onOpenChange={open} />
      </form>,
    );
    const field = screen.getByRole('combobox');
    const initial = (field as HTMLInputElement).value;
    expect(initial).not.toBe('');
    await userEvent.click(field);
    expect(open).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(new FormData(view.container.querySelector('form')!).get('when')).toBe(initial);
    await reset(view.container.querySelector('form')!);
    expect(field).toHaveValue(initial);
  },
);

it('retains an uncontrolled date after confirmation and restores its initial value on reset', async () => {
  const view = render(
    <form>
      <DatePicker label="Date" defaultValue={new Date(2026, 9, 15)} />
    </form>,
  );
  const field = screen.getByRole('combobox');
  await userEvent.click(field);
  const dialog = await screen.findByRole('dialog');
  const day = within(dialog).getByText('20', { selector: '[role="button"]' });
  await userEvent.click(day);
  await userEvent.click(within(dialog).getByRole('button', { name: 'Ok' }));
  expect(field).toHaveValue('20 October 2026');
  await reset(view.container.querySelector('form')!);
  expect(field).toHaveValue('15 October 2026');
});

it('supports required radio groups associated with an external form', async () => {
  const view = render(
    <>
      <form id="delivery" />
      <RadioGroup name="delivery" form="delivery" required aria-label="Delivery">
        <RadioButton label="Daily" value="daily" />
        <RadioButton label="Weekly" value="weekly" />
      </RadioGroup>
    </>,
  );
  const form = view.container.querySelector('form')!;
  expect(form.checkValidity()).toBe(false);
  await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
  expect(form.checkValidity()).toBe(true);
  expect(new FormData(form).get('delivery')).toBe('weekly');
  await reset(form);
  expect(form.checkValidity()).toBe(false);
});

it('retains selected IDs when remote results no longer contain them', async () => {
  const change = vi.fn();
  const view = render(
    <Autocomplete value={['ada']} source={{ ada: 'Ada' }} onChange={change} suggestionMatch="disabled" />,
  );
  const input = screen.getByRole('combobox');
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'gr' } });
  view.rerender(
    <Autocomplete value={['ada']} source={{ grace: 'Grace' }} onChange={change} suggestionMatch="disabled" />,
  );
  await userEvent.click(screen.getByRole('option', { name: 'Grace' }));
  expect(change).toHaveBeenCalledWith(['grace', 'ada'], expect.anything());
});

it('preserves a single-value search while remote results replace the source', () => {
  const view = render(<Autocomplete multiple={false} value="ada" source={{ ada: 'Ada' }} suggestionMatch="disabled" />);
  const input = screen.getByRole('combobox');
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'gr' } });
  view.rerender(<Autocomplete multiple={false} value="ada" source={{ grace: 'Grace' }} suggestionMatch="disabled" />);
  expect(input).toHaveValue('gr');
});

it('preserves caller-provided labels for object selections while allowing removal of remote values', async () => {
  const change = vi.fn();
  render(
    <Autocomplete
      value={{ ada: 'Saved Ada', grace: 'Saved Grace' }}
      source={{ ada: 'Current Ada' }}
      showSelectedWhenNotInSource
      onChange={change}
    />,
  );
  expect(screen.getByText('Saved Ada')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Remove Saved Ada' }));
  expect(change).toHaveBeenCalledWith({ grace: 'Saved Grace' }, expect.anything());
});
