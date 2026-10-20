import { useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Autocomplete from '../src/material/autocomplete';

const reset = async (form: HTMLFormElement) =>
  act(async () => {
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 5));
  });

describe('query and selection interactions', () => {
  it('keeps keyboard focus after selection and accepts a subsequent query', async () => {
    render(<Autocomplete label="People" source={['Ada', 'Grace']} />);
    const field = screen.getByRole('combobox');
    await userEvent.click(field);
    await userEvent.type(field, 'Ada');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(field).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Remove Ada' })).toBeInTheDocument();
    await userEvent.type(field, 'Gra');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(field).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Remove Grace' })).toBeInTheDocument();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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
});

describe('query restoration', () => {
  it('restores an uncontrolled single query on blur without changing its submitted selection', () => {
    const query = vi.fn();
    const view = render(
      <form>
        <Autocomplete
          multiple={false}
          name="choice"
          defaultValue="alpha"
          source={{ alpha: 'Alpha', beta: 'Beta' }}
          onQueryChange={query}
        />
      </form>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Be' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('Alpha');
    expect(new FormData(view.container.querySelector('form')!).get('choice')).toBe('alpha');
    expect(query).toHaveBeenLastCalledWith('Alpha');
  });

  it('preserves controlled queries on blur and uncontrolled typing when remote options change', () => {
    const view = render(<Autocomplete multiple={false} value="alpha" query="Be" source={{ alpha: 'Alpha' }} />);
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(input).toHaveValue('Be');
    view.rerender(<Autocomplete multiple={false} value="alpha" source={{ alpha: 'Alpha' }} />);
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Be' } });
    view.rerender(<Autocomplete multiple={false} value="alpha" source={{ beta: 'Beta' }} />);
    expect(input).toHaveValue('Be');
  });
});

describe('options and form submission', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('searches rich options by text, prevents disabled selection, submits IDs and resets', async () => {
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
    expect(new FormData(form).get('country')).toBe('fr');
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
    const view = render(
      <Autocomplete multiple={false} value="ada" source={{ ada: 'Ada' }} suggestionMatch="disabled" />,
    );
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
});
