import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  LoadingButtonRecipe,
  DestructiveActionRecipe,
  InputFormRecipe,
  DataTableRecipe,
} from '../src/examples/recipes';

describe('editable composition recipes', () => {
  it('shows asynchronous progress and allows retry after a failed save', async () => {
    let reject: (error: Error) => void = () => {};
    const save = vi.fn(
      () =>
        new Promise<void>((_, fail) => {
          reject = fail;
        }),
    );
    render(<LoadingButtonRecipe onSave={save} />);
    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled();
    await act(async () => reject(new Error('Network unavailable')));
    expect(screen.getByRole('status')).toHaveTextContent('Changes could not be saved. Try again.');
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeEnabled();
  });

  it('focuses cancellation before confirming a destructive action and keeps errors actionable', async () => {
    const remove = vi.fn().mockRejectedValueOnce(new Error('Failed')).mockResolvedValue(undefined);
    render(<DestructiveActionRecipe itemName="draft" onDelete={remove} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete draft' }));
    const dialog = await screen.findByRole('alertdialog', { name: 'Delete draft?' });
    await waitFor(() => expect(within(dialog).getByRole('button', { name: 'Cancel' })).toHaveFocus());
    await userEvent.click(within(dialog).getByRole('button', { name: 'Delete', exact: true }));
    expect(within(dialog).getByRole('alert')).toHaveTextContent('The item could not be deleted. Try again.');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Delete', exact: true }));
    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
    expect(remove).toHaveBeenCalledTimes(2);
  });

  it('preserves native field values while revealing, submitting, and resetting a password', async () => {
    const submit = vi.fn();
    render(<InputFormRecipe onSubmitData={submit} />);
    const password = screen.getByLabelText('Password', { exact: false, selector: 'input' });
    await userEvent.type(password, 'secret-words');
    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(password).toHaveAttribute('type', 'text');
    expect(password).toHaveAccessibleDescription('Use at least eight characters.');
    await userEvent.click(screen.getByRole('button', { name: 'Save preferences' }));
    expect(submit).toHaveBeenCalledOnce();
    expect(Object.fromEntries(submit.mock.calls[0][0])).toEqual({ budget: '250', password: 'secret-words' });
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(password).toHaveValue('');
    expect(password).toHaveAttribute('type', 'password');
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('keeps row selection stable when paging, sorting, and filtering change visible rows', async () => {
    render(
      <DataTableRecipe
        pageSize={1}
        projects={[
          { id: 'alpha', name: 'Alpha', owner: 'Ada', budget: 300 },
          { id: 'beta', name: 'Beta', owner: 'Lin', budget: 100 },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select Alpha' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('checkbox', { name: 'Select Beta' })).not.toBeChecked();
    await userEvent.click(screen.getByRole('button', { name: 'Budget (EUR)' }));
    expect(screen.getByRole('checkbox', { name: 'Select Beta' })).not.toBeChecked();
    await userEvent.type(screen.getByRole('searchbox', { name: 'Filter projects' }), 'Ada');
    expect(screen.getByRole('checkbox', { name: 'Select Alpha' })).toBeChecked();
    expect(screen.getByRole('status')).toHaveTextContent('1 selected · 1 projects · Page 1 of 1');
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all projects on this page' }));
    expect(screen.getByRole('checkbox', { name: 'Select Alpha' })).not.toBeChecked();
  });
});
