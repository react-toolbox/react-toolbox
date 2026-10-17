import { createRef, useState, type ReactNode } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as D from '../src/material/dialog';
import * as W from '../src/material/drawer';
import * as T from '../src/material/tabs';
import * as M from '../src/material/menu';
import * as S from '../src/material/dropdown';
import * as A from '../src/material/autocomplete';
import * as H from '../src/material/tooltip';
import { TableRoot, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../src/material/table';
import { ThemeProvider } from '../src/material/foundations/theme/ThemeProvider';
import { Button } from '../src/material/button';

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal(
    'PointerEvent',
    class extends MouseEvent {
      pointerType: string;
      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerType = init.pointerType ?? 'mouse';
      }
    },
  );
  HTMLElement.prototype.scrollIntoView = vi.fn();
  HTMLElement.prototype.hasPointerCapture = vi.fn(() => false);
  HTMLElement.prototype.setPointerCapture = vi.fn();
  HTMLElement.prototype.releasePointerCapture = vi.fn();
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function DialogParts({ children }: { children?: ReactNode }) {
  return (
    <D.DialogPortal>
      <D.DialogOverlay />
      <D.DialogContent>
        <D.DialogBody>
          <D.DialogTitle>Edit profile</D.DialogTitle>
          <D.DialogDescription>Update your details.</D.DialogDescription>
          {children}
        </D.DialogBody>
        <D.DialogFooter>
          <D.DialogClose asChild>
            <button type="button">Cancel</button>
          </D.DialogClose>
        </D.DialogFooter>
      </D.DialogContent>
    </D.DialogPortal>
  );
}

describe('primitive composition', () => {
  it('composes a dialog trigger, portal, form, and external submit footer with scoped tokens and refs', async () => {
    const trigger = createRef<HTMLButtonElement>();
    const content = createRef<HTMLDivElement>();
    const saved = vi.fn();
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <ThemeProvider variables={{ '--rt-color-primary': 'rebeccapurple' }}>
          <D.DialogRoot open={open} onOpenChange={setOpen}>
            <D.DialogTrigger asChild>
              <Button ref={trigger}>Edit</Button>
            </D.DialogTrigger>
            <D.DialogPortal>
              <D.DialogOverlay />
              <D.DialogContent ref={content} className="custom-dialog">
                <D.DialogBody>
                  <D.DialogTitle>Edit profile</D.DialogTitle>
                  <D.DialogDescription>Update your details.</D.DialogDescription>
                  <form
                    id="edit"
                    onSubmit={(event) => {
                      event.preventDefault();
                      saved(new FormData(event.currentTarget).get('name'));
                      setOpen(false);
                    }}
                  >
                    <label>
                      Name
                      <input name="name" defaultValue="Javi" />
                    </label>
                  </form>
                </D.DialogBody>
                <D.DialogFooter>
                  <button type="submit" form="edit">
                    Save
                  </button>
                </D.DialogFooter>
              </D.DialogContent>
            </D.DialogPortal>
          </D.DialogRoot>
        </ThemeProvider>
      );
    }
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    const dialog = screen.getByRole('dialog', { name: 'Edit profile' });
    expect(dialog).toHaveAccessibleDescription('Update your details.');
    expect(content.current).toBe(dialog);
    expect(dialog.style.getPropertyValue('--rt-color-primary')).toBe('rebeccapurple');
    expect(dialog).toHaveClass('custom-dialog');
    expect(screen.getByRole('textbox')).toHaveFocus();
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(saved).toHaveBeenCalledWith('Javi');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger.current).toHaveFocus();
  });

  it('dismisses only the nested dialog and restores focus inside a drawer', async () => {
    render(
      <W.DrawerRoot>
        <W.DrawerTrigger>Account</W.DrawerTrigger>
        <W.DrawerPortal>
          <W.DrawerOverlay />
          <W.DrawerContent>
            <W.DrawerTitle>Account panel</W.DrawerTitle>
            <W.DrawerDescription>Profile settings</W.DrawerDescription>
            <D.DialogRoot>
              <D.DialogTrigger>Edit details</D.DialogTrigger>
              <DialogParts />
            </D.DialogRoot>
            <W.DrawerClose>Close account</W.DrawerClose>
          </W.DrawerContent>
        </W.DrawerPortal>
      </W.DrawerRoot>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Account' }));
    await userEvent.click(screen.getByRole('button', { name: 'Edit details' }));
    await userEvent.keyboard('{Escape}');
    expect(screen.getByRole('dialog', { name: 'Account panel' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Edit details' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Account' })).toHaveFocus();
  });

  it('allows cancellation of escape and outside dismissal on a controlled dialog', async () => {
    const change = vi.fn();
    render(
      <D.DialogRoot open onOpenChange={change}>
        <D.DialogContent aria-describedby={undefined} onEscapeKeyDown={(event) => event.preventDefault()}>
          <D.DialogTitle>Protected</D.DialogTitle>
          <button type="button">Continue</button>
        </D.DialogContent>
      </D.DialogRoot>,
    );
    await userEvent.keyboard('{Escape}');
    expect(change).not.toHaveBeenCalled();
  });

  it('keeps value identity through wrapped tabs and reordering, with manual activation and persistent panels', async () => {
    const ref = createRef<HTMLButtonElement>();
    function Wrapped() {
      return (
        <T.TabsTrigger value="profile" ref={ref}>
          Profile
        </T.TabsTrigger>
      );
    }
    function Example() {
      const [reverse, setReverse] = useState(false);
      const profile = <Wrapped key="profile" />;
      const notifications = (
        <T.TabsTrigger key="notifications" value="notifications">
          Notifications
        </T.TabsTrigger>
      );
      return (
        <>
          <button type="button" onClick={() => setReverse(!reverse)}>
            Reverse
          </button>
          <T.TabsRoot defaultValue="profile" activationMode="manual">
            <T.TabsList aria-label="Settings">
              {reverse ? [notifications, profile] : [profile, notifications]}
              <T.TabsTrigger value="disabled" disabled>
                Disabled
              </T.TabsTrigger>
              <T.TabsIndicator />
            </T.TabsList>
            <T.TabsContent value="profile" forceMount>
              <input aria-label="Draft" defaultValue="Hello" />
            </T.TabsContent>
            <T.TabsContent value="notifications">Updates</T.TabsContent>
          </T.TabsRoot>
        </>
      );
    }
    render(<Example />);
    await userEvent.type(screen.getByLabelText('Draft'), ' world');
    ref.current?.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Notifications' })).toHaveFocus();
    expect(ref.current).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('tab', { name: 'Notifications' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Reverse' }));
    expect(screen.getByRole('tab', { name: 'Notifications' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(screen.getByRole('tab', { name: 'Profile' }));
    expect(screen.getByLabelText('Draft')).toHaveValue('Hello world');
  });

  it('supports slotted menu items, submenu keyboard navigation, disabled items, and cancellable selections', async () => {
    const selected = vi.fn();
    function Example() {
      const [checked, setChecked] = useState(false);
      return (
        <M.DropdownMenuRoot>
          <M.DropdownMenuTrigger asChild>
            <Button>Actions</Button>
          </M.DropdownMenuTrigger>
          <M.DropdownMenuPortal>
            <M.DropdownMenuContent>
              <M.DropdownMenuCheckboxItem
                checked={checked}
                onCheckedChange={setChecked}
                onSelect={(event) => event.preventDefault()}
              >
                Pinned
              </M.DropdownMenuCheckboxItem>
              <M.DropdownMenuItem disabled>Unavailable</M.DropdownMenuItem>
              <M.DropdownMenuSub>
                <M.DropdownMenuSubTrigger>More</M.DropdownMenuSubTrigger>
                <M.DropdownMenuPortal>
                  <M.DropdownMenuSubContent>
                    <M.DropdownMenuItem asChild onSelect={selected}>
                      <a href="#archive">Archive</a>
                    </M.DropdownMenuItem>
                  </M.DropdownMenuSubContent>
                </M.DropdownMenuPortal>
              </M.DropdownMenuSub>
            </M.DropdownMenuContent>
          </M.DropdownMenuPortal>
        </M.DropdownMenuRoot>
      );
    }
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Pinned' }));
    expect(screen.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'true');
    screen.getByRole('menuitemcheckbox').focus();
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    expect(await screen.findByRole('menuitem', { name: 'Archive' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(selected).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it('opens a dialog from a menu action without the menu stealing focus back', async () => {
    const trigger = createRef<HTMLButtonElement>();
    function Example() {
      const [editing, setEditing] = useState(false);
      return (
        <D.DialogRoot open={editing} onOpenChange={setEditing}>
          <M.DropdownMenuRoot>
            <M.DropdownMenuTrigger ref={trigger}>Actions</M.DropdownMenuTrigger>
            <M.DropdownMenuPortal>
              <M.DropdownMenuContent
                onCloseAutoFocus={(event) => {
                  if (editing) event.preventDefault();
                }}
              >
                <M.DropdownMenuItem onSelect={() => setEditing(true)}>Rename</M.DropdownMenuItem>
              </M.DropdownMenuContent>
            </M.DropdownMenuPortal>
          </M.DropdownMenuRoot>
          <D.DialogPortal>
            <D.DialogOverlay />
            <D.DialogContent
              aria-describedby={undefined}
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                trigger.current?.focus();
              }}
            >
              <D.DialogTitle>Rename project</D.DialogTitle>
              <input aria-label="Project name" />
            </D.DialogContent>
          </D.DialogPortal>
        </D.DialogRoot>
      );
    }
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Rename' }));
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Project name' })).toHaveFocus());
    expect(screen.queryByRole('menu')).toBeNull();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger.current).toHaveFocus());
  });

  it('submits a composed select value and forwards trigger refs', async () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <form aria-label="Destination">
        <label id="city-label">City</label>
        <S.DropdownRoot name="city" defaultValue="madrid">
          <S.DropdownTrigger ref={ref} aria-labelledby="city-label">
            <S.DropdownSelection />
          </S.DropdownTrigger>
          <S.DropdownPortal>
            <S.DropdownContent>
              <S.DropdownViewport>
                <S.DropdownGroup>
                  <S.DropdownLabel>Europe</S.DropdownLabel>
                  <S.DropdownOption value="madrid">
                    <S.DropdownOptionText>Madrid</S.DropdownOptionText>
                  </S.DropdownOption>
                  <S.DropdownOption value="lisbon">
                    <S.DropdownOptionText>Lisbon</S.DropdownOptionText>
                  </S.DropdownOption>
                  <S.DropdownOption value="paris" disabled>
                    <S.DropdownOptionText>Paris</S.DropdownOptionText>
                  </S.DropdownOption>
                </S.DropdownGroup>
              </S.DropdownViewport>
            </S.DropdownContent>
          </S.DropdownPortal>
        </S.DropdownRoot>
      </form>,
    );
    expect(ref.current).toBe(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Lisbon' }));
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('city')).toBe('lisbon');
    expect(ref.current).toHaveTextContent('Lisbon');
  });

  it('filters object options, supports custom rendered nodes and multiple native form values', async () => {
    const people = [
      { value: 'ada', label: 'Ada' },
      { value: 'grace', label: 'Grace' },
    ];
    const ref = createRef<HTMLInputElement>();
    render(
      <form aria-label="People">
        <A.AutocompleteRoot items={people} multiple name="people" defaultValue={[people[0]]}>
          <A.AutocompleteLabel>People</A.AutocompleteLabel>
          <A.AutocompleteInputGroup>
            <A.AutocompleteInput ref={ref} render={<input data-custom="yes" />} />
            <A.AutocompleteClear>Clear</A.AutocompleteClear>
          </A.AutocompleteInputGroup>
          <A.AutocompletePortal>
            <A.AutocompletePositioner>
              <A.AutocompletePopup>
                <A.AutocompleteEmpty>No matches</A.AutocompleteEmpty>
                <A.AutocompleteList>
                  {(person: (typeof people)[number]) => (
                    <A.AutocompleteItem
                      key={person.value}
                      value={person}
                      className={(state) => (state.highlighted ? 'highlighted-option' : undefined)}
                    >
                      {person.label}
                    </A.AutocompleteItem>
                  )}
                </A.AutocompleteList>
              </A.AutocompletePopup>
            </A.AutocompletePositioner>
          </A.AutocompletePortal>
        </A.AutocompleteRoot>
      </form>,
    );
    expect(ref.current).toHaveAttribute('data-custom', 'yes');
    expect(ref.current).toHaveAccessibleName('People');
    await userEvent.type(screen.getByRole('combobox'), 'Gra');
    expect(await screen.findByRole('option', { name: 'Grace' })).toBeVisible();
    expect(screen.queryByRole('option', { name: 'Ada' })).toBeNull();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).getAll('people')).toEqual(['ada', 'grace']);
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).getAll('people')).toEqual([]);
  });

  it('describes a slotted tooltip trigger and supports controlled dismissal', async () => {
    const change = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    render(
      <H.TooltipProvider>
        <H.TooltipRoot open onOpenChange={change}>
          <H.TooltipTrigger asChild>
            <Button ref={ref}>Archive</Button>
          </H.TooltipTrigger>
          <H.TooltipPortal>
            <H.TooltipContent>Save for later</H.TooltipContent>
          </H.TooltipPortal>
        </H.TooltipRoot>
      </H.TooltipProvider>,
    );
    expect(ref.current).toHaveAccessibleDescription('Save for later');
    await userEvent.keyboard('{Escape}');
    expect(change).toHaveBeenCalledWith(false);
  });

  it('opens a tooltip on long press, suppresses its action, and dismisses after release', async () => {
    const click = vi.fn();
    render(
      <H.TooltipRoot touchDelay={10} touchDuration={10}>
        <H.TooltipTrigger asChild>
          <button type="button" onClick={click}>
            Hold
          </button>
        </H.TooltipTrigger>
        <H.TooltipPortal>
          <H.TooltipContent>Touch hint</H.TooltipContent>
        </H.TooltipPortal>
      </H.TooltipRoot>,
    );
    const trigger = screen.getByRole('button', { name: 'Hold' });
    fireEvent.pointerDown(trigger, { pointerType: 'touch', clientX: 10, clientY: 10 });
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Touch hint'));
    fireEvent.pointerUp(trigger, { pointerType: 'touch' });
    fireEvent.click(trigger);
    expect(click).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
  });
});

describe('native table composition', () => {
  it('names value-keyed row controls and disables an empty select-all control', () => {
    const { rerender } = render(
      <TableRoot selectionMode="multiple">
        <TableHeader>
          <TableHead>
            <TableCell>Name</TableCell>
          </TableHead>
        </TableHeader>
        <TableBody />
      </TableRoot>,
    );
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeDisabled();
    rerender(
      <TableRoot selectionMode="multiple">
        <TableBody>
          <TableRow value="ada">
            <TableCell>Ada</TableCell>
          </TableRow>
          <TableRow value="grace">
            <TableCell>Grace</TableCell>
          </TableRow>
        </TableBody>
      </TableRoot>,
    );
    expect(screen.getByRole('checkbox', { name: 'Select row ada' })).toBeEnabled();
    expect(screen.getByRole('checkbox', { name: 'Select row grace' })).toBeEnabled();
  });

  it('selects wrapped rows by identity across reordering, infers wrapped header cells, and skips disabled rows', async () => {
    function WrappedCell() {
      return <TableCell>Name</TableCell>;
    }
    function Person({ id }: { id: string }) {
      return (
        <TableRow value={id} selectionDisabled={id === 'disabled'} selectLabel={`Select ${id}`}>
          <TableCell>{id}</TableCell>
        </TableRow>
      );
    }
    function Example() {
      const [rows, setRows] = useState(['ada', 'grace', 'disabled']);
      const [selected, setSelected] = useState<string[]>(['ada']);
      return (
        <>
          <button type="button" onClick={() => setRows([...rows].reverse())}>
            Reverse
          </button>
          <TableRoot selectionMode="multiple" selected={selected} onSelectionChange={setSelected}>
            <TableHeader>
              <TableHead>
                <WrappedCell />
              </TableHead>
            </TableHeader>
            <TableBody>
              {rows.map((id) => (
                <Person key={id} id={id} />
              ))}
            </TableBody>
          </TableRoot>
          <output>{selected.join(',')}</output>
        </>
      );
    }
    render(<Example />);
    expect(screen.getByRole('columnheader', { name: 'Name' }).tagName).toBe('TH');
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBePartiallyChecked();
    await userEvent.click(screen.getByRole('button', { name: 'Reverse' }));
    expect(screen.getByRole('checkbox', { name: 'Select ada' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Select grace' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Select disabled' })).toBeDisabled();
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
    expect(screen.getByRole('status')).toHaveTextContent('ada,grace');
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeChecked();
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('retains offscreen selections when selecting and clearing the visible rows', async () => {
    const change = vi.fn();
    const ui = (selected: string[]) => (
      <TableRoot selectionMode="multiple" selected={selected} onSelectionChange={change}>
        <TableHeader>
          <TableHead>
            <TableCell>Name</TableCell>
          </TableHead>
        </TableHeader>
        <TableBody>
          <TableRow value="ada">
            <TableCell>Ada</TableCell>
          </TableRow>
        </TableBody>
      </TableRoot>
    );
    const { rerender } = render(ui(['hidden']));
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
    expect(change).toHaveBeenLastCalledWith(['hidden', 'ada']);
    rerender(ui(['hidden', 'ada']));
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
    expect(change).toHaveBeenLastCalledWith(['hidden']);
  });
});
