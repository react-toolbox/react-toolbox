import { createRef, Fragment } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Avatar from '../src/material/avatar';
import AppBar from '../src/material/app-bar';
import { BrowseButton } from '../src/material/button';
import { CardTitle } from '../src/material/card';
import Chip from '../src/material/chip';
import { Layout, NavDrawer, Sidebar, Panel } from '../src/material/layout';
import {
  List,
  ListCheckbox,
  ListDivider,
  ListItem,
  ListItemAction,
  ListItemActions,
  ListItemContent,
  ListSubHeader,
} from '../src/material/list';
import { Table, TableHead, TableRow, TableCell, TableRoot, TableHeader, TableBody } from '../src/material/table';

describe('display component contracts', () => {
  it('keeps wrapped secondary list actions independent and disables a custom primary action', async () => {
    const select = vi.fn();
    const archive = vi.fn();
    function ArchiveAction() {
      return (
        <button type="button" onClick={archive}>
          Archive
        </button>
      );
    }
    const { rerender } = render(
      <List>
        <ListItem caption="Task" onClick={select} rightActions={[<ArchiveAction key="archive" />]} />
      </List>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(archive).toHaveBeenCalledOnce();
    expect(select).not.toHaveBeenCalled();
    rerender(
      <List>
        <ListItem caption="Task" disabled primaryAction={<button type="button" onClick={select} />} />
      </List>,
    );
    expect(screen.getByRole('button', { name: 'Task' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Task' })).toHaveAttribute('tabindex', '-1');
  });

  it('inherits semantic header cells through the native table composition', () => {
    render(
      <TableRoot>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
          </TableRow>
        </TableBody>
      </TableRoot>,
    );
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('cell', { name: 'Ada' }).tagName).toBe('TD');
  });

  it('lets custom avatar nodes own rendering with and without cover', () => {
    function CustomImage() {
      return <img src="/person.png" alt="Ada" />;
    }
    const { rerender } = render(<Avatar image={<CustomImage />} title="Fallback" />);
    expect(screen.getByRole('img', { name: 'Ada' })).toBeInTheDocument();
    expect(screen.queryByText('F')).not.toBeInTheDocument();
    rerender(<Avatar cover image={<CustomImage />} title="Fallback" />);
    expect(screen.getByRole('img', { name: 'Ada' })).toBeInTheDocument();
    expect(screen.queryByText('F')).not.toBeInTheDocument();
  });

  it('bulk-selects only eligible table rows and preserves existing disabled selections', async () => {
    const select = vi.fn();
    render(
      <Table multiSelectable onRowSelect={select}>
        <TableHead>
          <TableCell>Name</TableCell>
        </TableHead>
        <TableRow selectionDisabled selected>
          <TableCell>Locked</TableCell>
        </TableRow>
        <TableRow selectable={false}>
          <TableCell>Summary</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ada</TableCell>
        </TableRow>
      </Table>,
    );
    const all = screen.getByRole('checkbox', { name: 'Select all rows' });
    expect(all).not.toBeChecked();
    expect(all).not.toBePartiallyChecked();
    await userEvent.click(all);
    expect(select).toHaveBeenLastCalledWith([0, 2]);
  });

  it('does not bulk-change a table after its header callback cancels selection', async () => {
    const select = vi.fn();
    render(
      <Table multiSelectable onRowSelect={select}>
        <TableHead onSelect={(_, event) => event.preventDefault()}>
          <TableCell>Name</TableCell>
        </TableHead>
        <TableRow>
          <TableCell>Ada</TableCell>
        </TableRow>
      </Table>,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
    expect(select).not.toHaveBeenCalled();
  });

  it('exposes native file validation, form association, capture, and input identity', () => {
    const file = createRef<HTMLInputElement>();
    const invalid = vi.fn();
    render(
      <>
        <form id="upload" aria-label="Upload form" />
        <BrowseButton
          label="Choose photo"
          icon="photo_camera"
          inputRef={file}
          inputProps={{ id: 'photo', form: 'upload', required: true, capture: 'environment', onInvalid: invalid }}
        />
      </>,
    );
    expect(file.current).toHaveAttribute('id', 'photo');
    expect(file.current).toHaveAttribute('capture', 'environment');
    expect(file.current?.form).toBe(screen.getByRole('form', { name: 'Upload form' }));
    expect(file.current?.checkValidity()).toBe(false);
    expect(invalid).toHaveBeenCalledOnce();
    expect(
      screen.getByLabelText('Choose photo').closest('label')?.querySelector('[data-react-toolbox="font-icon"]'),
    ).toHaveAttribute('aria-hidden', 'true');
  });

  it('chooses card heading semantics without changing the title style', () => {
    render(<CardTitle heading="h2" title="Project" subtitle="Details" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Project' })).toHaveClass('rt-card-title');
  });

  it('exposes separate native chip actions and retains keyboard deletion', async () => {
    const open = vi.fn();
    const remove = vi.fn();
    render(
      <Chip deletable onClick={open} onDeleteClick={remove} deleteLabel="Remove Ada">
        Ada
      </Chip>,
    );
    const primary = screen.getByRole('button', { name: 'Ada', exact: true });
    expect(primary.tagName).toBe('BUTTON');
    expect(screen.getByRole('button', { name: 'Remove Ada' }).tagName).toBe('BUTTON');
    primary.focus();
    await userEvent.keyboard('{Enter}');
    expect(open).toHaveBeenCalledOnce();
    await userEvent.keyboard('{Backspace}');
    expect(remove).toHaveBeenCalledOnce();
    await userEvent.click(screen.getByRole('button', { name: 'Remove Ada' }));
    expect(remove).toHaveBeenCalledTimes(2);
    expect(open).toHaveBeenCalledOnce();
  });
});

describe('composed Material lists', () => {
  it('renders ordinary children and gives primary and secondary actions independent keyboard behavior', async () => {
    const open = vi.fn();
    const remove = vi.fn();
    render(
      <List>
        <ListItem
          onClick={open}
          leftIcon="folder"
          rightActions={[
            <button key="remove" type="button" onClick={remove}>
              Remove
            </button>,
          ]}
        >
          Project files
        </ListItem>
      </List>,
    );
    const primary = screen.getByRole('button', { name: 'Project files' });
    expect(primary.querySelector('button')).toBeNull();
    primary.focus();
    await userEvent.keyboard('{Enter}');
    expect(open).toHaveBeenCalledOnce();
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(remove).toHaveBeenCalledOnce();
    expect(open).toHaveBeenCalledOnce();
  });

  it('inherits defaults through wrappers and retains wrapped content', () => {
    function Row() {
      return (
        <ListItem>
          <Content />
        </ListItem>
      );
    }
    function Content() {
      return <ListItemContent caption="Wrapped row" />;
    }
    render(
      <List selectable ripple>
        <Fragment>
          <Row />
        </Fragment>
      </List>,
    );
    const row = screen.getByRole('listitem');
    expect(row.firstChild).toHaveClass('rt-list-selectable');
    expect(screen.getByText('Wrapped row')).toBeInTheDocument();
    fireEvent.mouseDown(row, { button: 0 });
    expect(row.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
  });

  it('keeps direct list helpers valid while standalone helpers preserve their native elements', () => {
    const { rerender } = render(
      <List>
        <ListSubHeader caption="People" />
        <ListItem caption="Ada" />
        <ListDivider />
      </List>,
    );
    expect([...screen.getByRole('list').children].map((node) => node.tagName)).toEqual(['LI', 'LI', 'LI']);
    expect(screen.getByRole('heading', { name: 'People' })).toBeInTheDocument();
    expect(screen.getByRole('separator').tagName).toBe('HR');
    rerender(
      <>
        <ListSubHeader caption="People" />
        <ListDivider />
      </>,
    );
    expect(screen.getByRole('heading').parentElement?.tagName).not.toBe('LI');
    expect(screen.getByRole('separator').parentElement?.tagName).not.toBe('LI');
  });

  it('supports uncontrolled checkbox rows with form values, reset, required, and mixed state', async () => {
    render(
      <>
        <form id="preferences" aria-label="Preferences" />
        <List>
          <ListCheckbox
            caption="Offline"
            checkboxProps={{
              defaultChecked: true,
              name: 'offline',
              value: 'enabled',
              form: 'preferences',
              required: true,
              indeterminate: true,
            }}
          />
        </List>
      </>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Offline' });
    const form = screen.getByRole('form', { name: 'Preferences' }) as HTMLFormElement;
    expect(checkbox).toBePartiallyChecked();
    expect(new FormData(form).get('offline')).toBe('enabled');
    await userEvent.click(checkbox);
    expect(form.checkValidity()).toBe(false);
    act(() => form.reset());
    expect(checkbox).toBeChecked();
    expect(new FormData(form).get('offline')).toBe('enabled');
  });

  it('forwards native props and refs from action parts', () => {
    const actions = createRef<HTMLSpanElement>();
    const action = createRef<HTMLSpanElement>();
    render(
      <>
        <ListItemActions type="right" className="actions" ref={actions} aria-label="Actions">
          <button type="button">More</button>
        </ListItemActions>
        <ListItemAction
          className="action"
          ref={action}
          title="Action"
          action={<button type="button">Details</button>}
        />
      </>,
    );
    expect(actions.current).toHaveClass('actions');
    expect(actions.current).toHaveAttribute('aria-label', 'Actions');
    expect(action.current).toHaveClass('action');
    expect(action.current).toHaveAttribute('title', 'Action');
  });
});

describe('wrapper-safe layout coordination', () => {
  it('coordinates wrapped shell parts and removes registrations on unmount', () => {
    function Navigation() {
      return (
        <NavDrawer pinned clipped>
          Navigation
        </NavDrawer>
      );
    }
    function Header() {
      return <AppBar title="Workspace" fixed />;
    }
    function Aside({ pinned }: { pinned: boolean }) {
      return (
        <Sidebar width={50} pinned={pinned}>
          Tools
        </Sidebar>
      );
    }
    const shell = (pinned: boolean, navigation = true) => (
      <Layout data-testid="layout">
        <Header />
        {navigation && <Navigation />}
        <Panel>Content</Panel>
        <Aside pinned={pinned} />
      </Layout>
    );
    const { rerender } = render(shell(false));
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveClass('rt-layout-appbarFixed', 'rt-layout-navDrawerPinned', 'rt-layout-sidebarWidth50');
    expect(layout).not.toHaveClass('rt-layout-sidebarPinned');
    expect(screen.getByRole('banner')).toHaveClass('rt-layout-appbarAppBar');
    expect(layout.style.getPropertyValue('--layout-sidebar-percent')).toBe('50%');
    rerender(shell(true, false));
    expect(layout).toHaveClass('rt-layout-sidebarPinned');
    expect(layout).not.toHaveClass('rt-layout-navDrawerPinned');
  });
});
