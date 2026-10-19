import { createRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Dropdown, { type DropdownItem } from '../src/material/dropdown';
import type { InputHandle } from '../src/material/input/Input';
import { ThemeProvider } from '../src/material/foundations/theme/ThemeProvider';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function openDropdown(user: ReturnType<typeof userEvent.setup>) {
  const trigger = screen.getByRole('combobox');
  await user.click(trigger);
  await waitFor(() => expect(screen.getByRole('listbox')).toContainElement(document.activeElement as HTMLElement));
  return trigger;
}

describe('Dropdown compound-parts adapter', () => {
  it('uses option focus, skips disabled options, traps Tab and returns focus after keyboard selection', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const openChange = vi.fn();
    render(
      <Dropdown
        name="choice"
        defaultValue="a"
        onChange={change}
        onOpenChange={openChange}
        source={[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta', disabled: true },
          { value: 'c', label: 'Charlie' },
        ]}
      />,
    );
    const trigger = screen.getByRole('combobox');
    act(() => trigger.focus());
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByRole('option', { name: 'Alpha' })).toHaveFocus());
    expect(trigger).not.toHaveAttribute('aria-activedescendant');
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByRole('option', { name: 'Charlie' })).toHaveFocus());
    await user.tab();
    expect(screen.getByRole('option', { name: 'Charlie' })).toHaveFocus();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveValue('Charlie');
    expect(change).toHaveBeenCalledExactlyOnceWith(
      'c',
      expect.objectContaining({ type: 'keydown', target: expect.objectContaining({ name: 'choice' }) }),
    );
    expect(openChange.mock.calls).toEqual([[true], [false]]);
  });

  it('commits closed rich-label typeahead immediately using textValue', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Dropdown
        onChange={change}
        source={[
          { value: 1, label: <b>US</b>, textValue: 'United States', group: 'Americas' },
          { value: 2, label: <b>CA</b>, textValue: 'Canada', group: 'Americas' },
        ]}
      />,
    );
    act(() => screen.getByRole('combobox').focus());
    await user.keyboard('c');
    expect(change).toHaveBeenCalledExactlyOnceWith(2, expect.objectContaining({ type: 'keydown' }));
    expect(screen.getByRole('combobox')).toHaveValue('Canada');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await openDropdown(user);
    expect(screen.getByRole('group', { name: 'Americas' })).toBeInTheDocument();
    await user.keyboard('u');
    await waitFor(() => expect(screen.getByRole('option', { name: 'US' })).toHaveFocus());
    await user.keyboard('{Enter}');
    expect(change).toHaveBeenLastCalledWith(1, expect.anything());
  });

  it('preserves distinct numeric, string and empty domain values with one submitted form value', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <form>
        <Dropdown
          name="choice"
          onChange={change}
          source={[
            { value: 1, label: 'Number' },
            { value: '1', label: 'String' },
            { value: '', label: 'Empty' },
          ]}
        />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    for (const [label, value] of [
      ['Number', 1],
      ['String', '1'],
      ['Empty', ''],
    ] as const) {
      const trigger = await openDropdown(user);
      await user.click(screen.getByRole('option', { name: label }));
      expect(trigger).toHaveValue(label);
      expect(change).toHaveBeenLastCalledWith(value, expect.objectContaining({ type: 'pointerup' }));
      expect(new FormData(form).getAll('choice')).toEqual([String(value)]);
    }
    expect(change).toHaveBeenCalledTimes(3);
  });

  it('validates and resets an external form without selection callbacks', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <>
        <form id="external" />
        <Dropdown form="external" name="city" label="City" required source={['Madrid', 'Tokyo']} onChange={change} />
      </>,
    );
    const form = view.container.querySelector('form')!;
    act(() => expect(form.checkValidity()).toBe(false));
    const trigger = screen.getByRole('combobox', { name: 'City' });
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await openDropdown(user);
    await user.click(screen.getByRole('option', { name: 'Tokyo' }));
    expect(form.checkValidity()).toBe(true);
    expect(new FormData(form).getAll('city')).toEqual(['Tokyo']);
    await openDropdown(user);
    act(() => form.reset());
    await waitFor(() => expect(trigger).toHaveValue(''));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute('aria-invalid', 'true');
    expect(change).toHaveBeenCalledTimes(1);
  });

  it('restores the uncontrolled default and retains a controlled selection on reset', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <form>
        <Dropdown name="city" defaultValue="Madrid" source={['Madrid', 'Tokyo']} onChange={change} />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    const trigger = await openDropdown(user);
    await user.click(screen.getByRole('option', { name: 'Tokyo' }));
    const cancelReset = (event: Event) => event.preventDefault();
    form.addEventListener('reset', cancelReset);
    await act(async () => {
      form.reset();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(trigger).toHaveValue('Tokyo');
    expect(new FormData(form).getAll('city')).toEqual(['Tokyo']);
    form.removeEventListener('reset', cancelReset);
    act(() => form.reset());
    await waitFor(() => expect(trigger).toHaveValue('Madrid'));
    expect(new FormData(form).getAll('city')).toEqual(['Madrid']);
    view.rerender(
      <form>
        <Dropdown name="city" value="Tokyo" source={['Madrid', 'Tokyo']} onChange={change} />
      </form>,
    );
    act(() => form.reset());
    await waitFor(() => expect(new FormData(form).getAll('city')).toEqual(['Tokyo']));
    expect(trigger).toHaveValue('Tokyo');
    expect(change).toHaveBeenCalledTimes(1);
  });

  it('retains allowBlank fallback, disabled submission and native change mapping', () => {
    const change = vi.fn();
    const source = [
      { value: 1, label: 'Disabled', disabled: true },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
    ];
    const view = render(
      <form>
        <Dropdown name="choice" allowBlank={false} source={source} onChange={change} />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    expect(screen.getByRole('combobox')).toHaveValue('Two');
    expect(new FormData(form).getAll('choice')).toEqual(['2']);
    fireEvent.change(form.querySelector('select[name="choice"]')!, { target: { value: '3' } });
    expect(change).toHaveBeenCalledExactlyOnceWith(3, expect.objectContaining({ type: 'change' }));
    expect(screen.getByRole('combobox')).toHaveValue('Three');
    view.rerender(
      <form>
        <Dropdown name="choice" disabled allowBlank={false} source={source} />
      </form>,
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(new FormData(form).getAll('choice')).toEqual([]);
  });

  it('keeps templated JSX naming, InputHandle, class slots and scoped shadow8 portal styling', async () => {
    const user = userEvent.setup();
    const ref = createRef<InputHandle>();
    const view = render(
      <ThemeProvider variables={{ '--rt-color-primary': 'rebeccapurple' }}>
        <Dropdown
          ref={ref}
          label={<span>Person</span>}
          required
          defaultValue="a"
          source={[
            { value: 'a', label: 'Ada' },
            { value: 'b', label: 'Ben' },
          ]}
          template={(item) => <strong>{item.label}</strong>}
          classNames={{
            dropdown: 'custom-dropdown',
            field: 'custom-field',
            label: 'custom-label',
            selected: 'custom-selected',
            values: 'custom-values',
            templateValue: 'custom-template',
          }}
        />
      </ThemeProvider>,
    );
    const trigger = screen.getByRole('combobox', { name: 'Person' });
    expect(trigger).toHaveClass('custom-field');
    expect(view.container.querySelector('.custom-template')).toHaveTextContent('Ada');
    expect(view.container.querySelector('.custom-label')).toHaveTextContent('Person');
    expect(ref.current?.inputElement).toBeInstanceOf(HTMLInputElement);
    act(() => ref.current?.focus());
    expect(trigger).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    const listbox = screen.getByRole('listbox');
    expect(view.container).not.toContainElement(listbox);
    expect(listbox).toHaveClass('custom-values', '[box-shadow:var(--shadow-8p)]', 'motion-reduce:animate-none!');
    expect(listbox.style.getPropertyValue('--rt-color-primary')).toBe('rebeccapurple');
    expect(screen.getByRole('option', { name: 'Ada' })).toHaveClass('custom-selected');
    await waitFor(() => expect(screen.getByRole('option', { name: 'Ada' })).toHaveFocus());
    await user.keyboard('{End}');
    await waitFor(() => expect(screen.getByRole('option', { name: 'Ben' })).toHaveFocus());
    await user.keyboard('{Enter}');
    expect(trigger).toHaveTextContent('Ben');
  });

  it('changes from a blank Input trigger to a primitive-source template without losing the public ref', async () => {
    const user = userEvent.setup();
    const ref = createRef<InputHandle>();
    const change = vi.fn();
    render(
      <Dropdown
        ref={ref}
        label="Letter"
        source={['Alpha', 'Beta']}
        template={(item: DropdownItem) => <strong>{item.label}</strong>}
        onChange={change}
      />,
    );
    await openDropdown(user);
    await user.keyboard('{End}');
    await waitFor(() => expect(screen.getByRole('option', { name: 'Beta' })).toHaveFocus());
    await user.keyboard('{Enter}');
    const trigger = screen.getByRole('combobox', { name: 'Letter' });
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveTextContent('Beta');
    expect(change).toHaveBeenCalledExactlyOnceWith('Beta', expect.anything());
    expect(ref.current?.inputElement).toHaveValue('Beta');
    act(() => ref.current?.blur());
    expect(trigger).not.toHaveFocus();
    act(() => ref.current?.focus());
    expect(trigger).toHaveFocus();
  });

  it('preserves focus through a closed typeahead template swap but not an unfocused external value change', async () => {
    const user = userEvent.setup();
    const template = (item: { value: string | number; label: React.ReactNode }) => <strong>{item.label}</strong>;
    const view = render(
      <>
        <button>Outside</button>
        <Dropdown source={['Alpha', 'Beta']} template={template} />
      </>,
    );
    act(() => screen.getByRole('combobox').focus());
    await user.keyboard('b');
    expect(screen.getByRole('combobox')).toHaveTextContent('Beta');
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    const outside = screen.getByRole('button', { name: 'Outside' });
    act(() => outside.focus());
    view.rerender(
      <>
        <button>Outside</button>
        <Dropdown value="" source={['Alpha', 'Beta']} template={template} />
      </>,
    );
    expect(outside).toHaveFocus();
    view.rerender(
      <>
        <button>Outside</button>
        <Dropdown value="Alpha" source={['Alpha', 'Beta']} template={template} />
      </>,
    );
    expect(outside).toHaveFocus();
    expect(screen.getByRole('combobox')).toHaveTextContent('Alpha');
  });

  it('supports controlled open/value, pointer dismissal, focus restoration and caller event cancellation', async () => {
    const user = userEvent.setup();
    const onBlur = vi.fn();
    function Example() {
      const [open, setOpen] = useState(false);
      const [value, setValue] = useState('Alpha');
      return (
        <Dropdown
          open={open}
          onOpenChange={setOpen}
          value={value}
          onChange={(next) => setValue(String(next))}
          onBlur={onBlur}
          onKeyDown={(event) => {
            if (event.key === 'b') event.preventDefault();
          }}
          source={['Alpha', 'Beta']}
        />
      );
    }
    render(<Example />);
    const trigger = screen.getByRole('combobox');
    act(() => trigger.focus());
    await user.keyboard('b');
    expect(trigger).toHaveValue('Alpha');
    await openDropdown(user);
    await user.click(screen.getByRole('option', { name: 'Beta' }));
    expect(trigger).toHaveValue('Beta');
    expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ type: 'pointerup' }));
    await openDropdown(user);
    fireEvent.pointerDown(document.body, { pointerType: 'mouse' });
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});
