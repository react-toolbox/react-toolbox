import { useState } from 'react';
import { cleanup, render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Table, TableCell, TableHead, TableRow, TableRoot, TableHeader, TableBody } from '../src/material/table';

describe('accessible selection and sorting', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('exposes table captions, mixed selection, named checkboxes, and keyboard sorting', async () => {
    const user = userEvent.setup();
    const sort = vi.fn();
    render(
      <Table selectionMode="multiple" defaultSelected={['ada']}>
        <caption>Team</caption>
        <TableHead>
          <TableCell sorted="asc" onClick={sort}>
            Name
          </TableCell>
        </TableHead>
        <TableRow value="ada">
          <TableCell>Ada</TableCell>
        </TableRow>
        <TableRow value="grace">
          <TableCell>Grace</TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByRole('table', { name: 'Team' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBePartiallyChecked();
    expect(screen.getByRole('checkbox', { name: 'Select row ada' })).toBeChecked();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('aria-sort', 'ascending');
    screen.getByRole('button', { name: 'Name' }).focus();
    await user.keyboard('{Enter}');
    expect(sort).toHaveBeenCalledOnce();
  });

  it('allows the last selected row to be deselected in single-selection tables', async () => {
    const change = vi.fn();
    render(
      <Table selectionMode="single" selected={['ada']} onSelectionChange={change}>
        <TableRow value="ada">
          <TableCell>Ada</TableCell>
        </TableRow>
      </Table>,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select row ada' }));
    expect(change).toHaveBeenCalledWith([]);
  });
});

describe('native sections and eligible rows', () => {
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

  it('bulk-selects only eligible table rows and preserves existing disabled selections', async () => {
    const select = vi.fn();
    render(
      <Table selectionMode="multiple" selected={['locked']} onSelectionChange={select}>
        <TableHead>
          <TableCell>Name</TableCell>
        </TableHead>
        <TableRow value="locked" selectionDisabled>
          <TableCell>Locked</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Summary</TableCell>
        </TableRow>
        <TableRow value="ada">
          <TableCell>Ada</TableCell>
        </TableRow>
      </Table>,
    );
    const all = screen.getByRole('checkbox', { name: 'Select all rows' });
    expect(all).not.toBeChecked();
    expect(all).not.toBePartiallyChecked();
    await userEvent.click(all);
    expect(select).toHaveBeenLastCalledWith(['locked', 'ada']);
  });

  it('does not bulk-change a table after its header callback cancels selection', async () => {
    const select = vi.fn();
    render(
      <Table selectionMode="multiple" onSelectionChange={select}>
        <TableHead onSelectionChange={(_, event) => event.preventDefault()}>
          <TableCell>Name</TableCell>
        </TableHead>
        <TableRow value="ada">
          <TableCell>Ada</TableCell>
        </TableRow>
      </Table>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Select all rows' });
    await userEvent.click(checkbox);
    expect(select).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });
});

describe('selection callbacks and native cell events', () => {
  afterEach(cleanup);

  it('retains controlled table selection and forwards native cell events', () => {
    const select = vi.fn();
    const click = vi.fn();
    render(
      <Table selectionMode="multiple" selected={['first']} onSelectionChange={select}>
        <TableHead>
          <TableCell>Name</TableCell>
        </TableHead>
        <TableRow value="first">
          <TableCell onClick={click}>First</TableCell>
        </TableRow>
        <TableRow value="second">
          <TableCell>Second</TableCell>
        </TableRow>
      </Table>,
    );
    const checks = screen.getAllByRole('checkbox');
    fireEvent.click(checks[2]!);
    expect(select).toHaveBeenLastCalledWith(['first', 'second']);
    fireEvent.click(checks[1]!);
    expect(select).toHaveBeenLastCalledWith([]);
    fireEvent.click(checks[0]!);
    expect(select).toHaveBeenLastCalledWith(['first', 'second']);
    fireEvent.click(screen.getByText('First'));
    expect(click).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
  });
});

describe('composed table sections', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('preserves native table sections, fragments, row-header semantics and selection values', async () => {
    const select = vi.fn();
    render(
      <Table selectionMode="multiple" selected={['ada']} onSelectionChange={select}>
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
            <TableRow value="ada">
              <TableCell tagName="th" scope="row">
                Ada
              </TableCell>
            </TableRow>
            <TableRow value="grace">
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
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select row grace' }));
    expect(select).toHaveBeenCalledWith(['ada', 'grace']);
    expect(screen.getByText('Two people')).toBeInTheDocument();
    expect(screen.getByRole('table')).toHaveAccessibleName('People');
  });
});

it('defaults to a display table without selection controls', () => {
  render(
    <Table>
      <TableHead>
        <TableCell>Name</TableCell>
      </TableHead>
      <TableRow value="ada">
        <TableCell>Ada</TableCell>
      </TableRow>
    </Table>,
  );
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  expect(screen.getByRole('row', { name: 'Ada' })).not.toHaveAttribute('aria-selected');
});

it('allows a row callback to cancel selection before the shared state changes', async () => {
  const change = vi.fn();
  const rowChange = vi.fn((_, event) => event.preventDefault());
  render(
    <Table selectionMode="multiple" onSelectionChange={change}>
      <TableRow value="ada" onSelectionChange={rowChange}>
        <TableCell>Ada</TableCell>
      </TableRow>
    </Table>,
  );
  const checkbox = screen.getByRole('checkbox', { name: 'Select row ada' });
  await userEvent.click(checkbox);
  expect(rowChange).toHaveBeenCalledWith(true, expect.objectContaining({ type: 'click' }));
  expect(change).not.toHaveBeenCalled();
  expect(checkbox).not.toBeChecked();
});

it('keeps uncontrolled selection attached to wrapped rows when they reorder', async () => {
  function Person({ value }: { value: string }) {
    return (
      <TableRow value={value}>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  }
  function Example() {
    const [people, setPeople] = useState(['ada', 'grace']);
    return (
      <>
        <button type="button" onClick={() => setPeople([...people].reverse())}>
          Reverse
        </button>
        <Table selectionMode="multiple" defaultSelected={['grace']}>
          <TableHead>
            <TableCell>Name</TableCell>
          </TableHead>
          <tbody>
            {people.map((value) => (
              <Person key={value} value={value} />
            ))}
          </tbody>
        </Table>
      </>
    );
  }
  render(<Example />);
  await userEvent.click(screen.getByRole('button', { name: 'Reverse' }));
  expect(screen.getByRole('checkbox', { name: 'Select row grace' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Select row ada' })).not.toBeChecked();
  await userEvent.click(screen.getByRole('checkbox', { name: 'Select row ada' }));
  expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeChecked();
  await userEvent.click(screen.getByRole('checkbox', { name: 'Select row grace' }));
  expect(screen.getByRole('checkbox', { name: 'Select row grace' })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBePartiallyChecked();
});
