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
});

describe('selection callbacks and cell coordinates', () => {
  afterEach(cleanup);

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
});

describe('composed table sections', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
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
