import { createRef } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Autocomplete from '../src/material/autocomplete';
import type { InputHandle } from '../src/material/input/Input';
import { ThemeProvider } from '../src/material/foundations/theme/ThemeProvider';

const pointerMethods = ['scrollIntoView', 'hasPointerCapture', 'setPointerCapture', 'releasePointerCapture'];
const originalMethods = new Map(
  pointerMethods.map((method) => [method, Object.getOwnPropertyDescriptor(HTMLElement.prototype, method)]),
);

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
  for (const method of pointerMethods) {
    Object.defineProperty(HTMLElement.prototype, method, {
      configurable: true,
      writable: true,
      value: vi.fn(() => false),
    });
  }
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  for (const [method, descriptor] of originalMethods) {
    if (descriptor) Object.defineProperty(HTMLElement.prototype, method, descriptor);
    else Reflect.deleteProperty(HTMLElement.prototype, method);
  }
});

const reset = async (form: HTMLFormElement) =>
  act(async () => {
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 5));
  });

describe('Autocomplete compound-parts adapter', () => {
  it('preserves live React callback currentTarget and event methods for keyboard, pointer and chip removal', async () => {
    const user = userEvent.setup();
    const targets: EventTarget[] = [];
    render(
      <Autocomplete
        source={['Ada', 'Grace']}
        onChange={(_, event) => {
          targets.push(event.currentTarget);
          expect(event.nativeEvent).toBeInstanceOf(Event);
          expect(typeof event.isDefaultPrevented).toBe('function');
        }}
      />,
    );
    const input = screen.getByRole('combobox');
    await user.type(input, 'Ada');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(targets[0]).toBe(input);
    await user.type(input, 'Gra');
    const option = screen.getByRole('option', { name: 'Grace' });
    await user.click(option);
    expect(targets[1]).toBe(option);
    const remove = screen.getByRole('button', { name: 'Remove Ada' });
    await user.click(remove);
    expect(targets[2]).toBe(remove);
  });

  it('matches keyboard values to rendered order for interleaved groups', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Autocomplete
        multiple={false}
        onChange={change}
        source={[
          { value: 'a', label: 'Alpha', group: 'First' },
          { value: 'b', label: 'Beta', group: 'Second' },
          { value: 'c', label: 'Charlie', group: 'First' },
        ]}
      />,
    );
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(change).toHaveBeenCalledWith('c', expect.anything());
  });

  it('clears remote-only values without rendered chips and preserves native change/disabled submission', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <form>
        <Autocomplete
          name="people"
          defaultValue={['remote']}
          source={['Ada']}
          clearable
          selectedPosition="none"
          onChange={change}
        />
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(change).toHaveBeenLastCalledWith([], expect.objectContaining({ type: 'click' }));
    const select = view.container.querySelector('select')!;
    fireEvent.change(select, { target: { value: 'Ada' } });
    expect(change).toHaveBeenLastCalledWith(['Ada'], expect.objectContaining({ type: 'change' }));
    expect(new FormData(view.container.querySelector('form')!).getAll('people')).toEqual(['Ada']);
    view.rerender(
      <form>
        <Autocomplete name="people" value={['Ada']} source={['Ada']} disabled />
      </form>,
    );
    expect(new FormData(view.container.querySelector('form')!).getAll('people')).toEqual([]);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('mounts distinct list options for each instance and commits click events without hover', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <>
        <Autocomplete label="First" multiple={false} source={['Ada']} onChange={change} />
        <Autocomplete label="Second" multiple={false} source={['Ada']} />
      </>,
    );
    await user.click(screen.getByRole('combobox', { name: 'First' }));
    const firstId = screen.getByRole('option').id;
    await user.click(screen.getByRole('option'));
    expect(change).toHaveBeenCalledWith(
      'Ada',
      expect.objectContaining({
        type: 'click',
        nativeEvent: expect.any(MouseEvent),
        isDefaultPrevented: expect.any(Function),
      }),
    );
    await user.click(screen.getByRole('combobox', { name: 'Second' }));
    expect(screen.getByRole('option').id).not.toBe(firstId);
  });
  it('uses Base UI highlight/Enter semantics, prevents disabled selection, and retains keyboard focus', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Autocomplete
        multiple={false}
        label="Country"
        onChange={change}
        source={[
          { value: 'de', label: 'Germany', disabled: true, group: 'Europe' },
          { value: 'gr', label: <b>Greece</b>, textValue: 'Greece', group: 'Europe' },
        ]}
      />,
    );
    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(input).not.toHaveAttribute('aria-activedescendant');
    await user.keyboard('{Enter}');
    expect(change).not.toHaveBeenCalled();
    await user.type(input, 'G');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(screen.getByRole('option', { name: 'Germany' })).toHaveAttribute('data-highlighted');
    expect(change).not.toHaveBeenCalled();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'Greece' })).toHaveAttribute('data-highlighted');
    await user.keyboard('{Enter}');
    expect(input).toHaveFocus();
    expect(input).toHaveValue('Greece');
    expect(change).toHaveBeenCalledExactlyOnceWith(
      'gr',
      expect.objectContaining({ type: 'keydown', key: 'Enter', nativeEvent: expect.any(KeyboardEvent) }),
    );
  });

  it('adapts all source formats and prepends multiple selections without duplicating named form controls', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <form>
        <Autocomplete
          name="people"
          defaultValue={['Ada']}
          onChange={change}
          source={['Ada', ['grace', 'Grace'], { value: 'lin', label: <b>Lin</b>, textValue: 'Lin' }]}
        />
      </form>,
    );
    const input = screen.getByRole('combobox');
    await user.type(input, 'Gra');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(input).toHaveFocus();
    expect(change).toHaveBeenLastCalledWith(['grace', 'Ada'], expect.anything());
    expect(new FormData(view.container.querySelector('form')!).getAll('people')).toEqual(['Ada', 'grace']);
    await user.type(input, 'Lin');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(input).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Remove Grace' })).toBeInTheDocument();
    expect(change).toHaveBeenLastCalledWith(['lin', 'grace', 'Ada'], expect.anything());
    expect(view.container.querySelectorAll('[name="people"]')).toHaveLength(1);
  });

  it('preserves remote object labels and removes the right chip when earlier values are not in source', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <Autocomplete value={{ missing: 'Saved', ada: 'Saved Ada' }} source={{ ada: 'Ada' }} onChange={change} />,
    );
    await user.click(screen.getByRole('button', { name: 'Remove Ada' }));
    expect(change).toHaveBeenLastCalledWith({ missing: 'Saved' }, expect.anything());
    view.rerender(
      <Autocomplete
        value={{ missing: 'Saved', ada: 'Saved Ada' }}
        source={{ ada: 'Ada', grace: 'Grace' }}
        showSelectedWhenNotInSource
        onChange={change}
        suggestionMatch="disabled"
        keepFocusOnChange
      />,
    );
    await user.type(screen.getByRole('combobox'), 'server query');
    await user.click(screen.getByRole('option', { name: 'Grace' }));
    expect(change).toHaveBeenLastCalledWith({ grace: 'Grace', missing: 'Saved', ada: 'Saved Ada' }, expect.anything());
    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('offers allowCreate as an explicit option selected by the primitive, including native submission and reset', async () => {
    const user = userEvent.setup();
    const view = render(
      <form>
        <Autocomplete multiple={false} name="created" allowCreate label="Create" />
      </form>,
    );
    const input = screen.getByRole('combobox');
    await user.type(input, 'New value');
    expect(screen.getByRole('option', { name: 'Create "New value"' })).toBeInTheDocument();
    await user.keyboard('{ArrowDown}{Enter}');
    expect(input).toHaveValue('New value');
    expect(new FormData(view.container.querySelector('form')!).get('created')).toBe('New value');
    await reset(view.container.querySelector('form')!);
    expect(input).toHaveValue('');
  });

  it('keeps default/controlled selections on reset, supports external form validation, and honors canceled reset', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = render(
      <>
        <form id="owner" />
        <Autocomplete
          name="people"
          form="owner"
          required
          clearable
          defaultValue={['ada']}
          source={{ ada: 'Ada', grace: 'Grace' }}
          onChange={change}
        />
      </>,
    );
    const form = view.container.querySelector('form')!;
    await user.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(new FormData(form).getAll('people')).toEqual([]);
    expect(form.checkValidity()).toBe(false);
    expect(screen.getByRole('combobox')).toHaveFocus();
    const calls = change.mock.calls.length;
    const cancel = (event: Event) => event.preventDefault();
    form.addEventListener('reset', cancel);
    await reset(form);
    expect(new FormData(form).getAll('people')).toEqual([]);
    form.removeEventListener('reset', cancel);
    await reset(form);
    expect(new FormData(form).getAll('people')).toEqual(['ada']);
    expect(form.checkValidity()).toBe(true);
    expect(change).toHaveBeenCalledTimes(calls);
    view.rerender(
      <>
        <form id="owner" />
        <Autocomplete
          name="people"
          form="owner"
          value={['grace']}
          defaultValue={['ada']}
          source={{ ada: 'Ada', grace: 'Grace' }}
          onChange={change}
        />
      </>,
    );
    await reset(form);
    expect(new FormData(form).getAll('people')).toEqual(['grace']);
  });

  it('keeps query edits separate from submitted values, including controlled empty queries and remote filtering', async () => {
    const user = userEvent.setup();
    const query = vi.fn();
    const change = vi.fn();
    const view = render(
      <form>
        <Autocomplete
          multiple={false}
          name="person"
          value="ada"
          source={{ ada: 'Ada' }}
          onChange={change}
          suggestionMatch="disabled"
          onQueryChange={query}
        />
      </form>,
    );
    const input = screen.getByRole('combobox');
    await user.clear(input);
    expect(new FormData(view.container.querySelector('form')!).get('person')).toBe('ada');
    expect(change).not.toHaveBeenCalled();
    await user.type(input, 'remote');
    view.rerender(
      <form>
        <Autocomplete
          multiple={false}
          name="person"
          value="ada"
          source={{ grace: 'Grace' }}
          suggestionMatch="disabled"
          onQueryChange={query}
        />
      </form>,
    );
    expect(input).toHaveValue('remote');
    expect(screen.getByRole('option', { name: 'Grace' })).toBeInTheDocument();
    view.rerender(
      <form>
        <Autocomplete multiple={false} value="ada" query="" source={{ ada: 'Ada' }} onQueryChange={query} />
      </form>,
    );
    await user.type(input, 'G');
    expect(input).toHaveValue('');
    expect(query).toHaveBeenLastCalledWith('G');
  });

  it('retains slots, input presentation/ref, scoped portal theme and reduced-motion surface styles', async () => {
    const user = userEvent.setup();
    const ref = createRef<InputHandle>();
    render(
      <ThemeProvider variables={{ '--rt-color-primary': '#123456' }}>
        <Autocomplete
          multiple={false}
          ref={ref}
          label="People"
          hint="Find someone"
          direction="up"
          source={['Ada']}
          classNames={{
            autocomplete: 'custom-root',
            input: 'custom-input',
            suggestions: 'custom-list',
            suggestion: 'custom-option',
            active: 'custom-active',
            up: 'custom-up',
            focus: 'custom-focus',
          }}
        />
      </ThemeProvider>,
    );
    const input = screen.getByRole('combobox');
    expect(ref.current?.inputElement).toBe(input);
    expect(input).toHaveClass('rt-input-inputElement');
    await user.click(input);
    await user.keyboard('{ArrowDown}');
    const list = screen.getByRole('listbox');
    expect(list).toHaveClass('custom-list', 'custom-up');
    expect(screen.getByRole('option', { name: 'Ada' })).toHaveClass('custom-option', 'custom-active');
    expect(input.closest('.custom-root')).not.toContainElement(list);
    const popup = list.closest('[data-slot="AutocompletePopup"]')!;
    expect(popup).toHaveClass('motion-reduce:transition-none', '[box-shadow:var(--shadow-8p)]');
    expect(popup).toHaveAttribute('style', expect.stringContaining('#123456'));
  });

  it('respects controlled opening, keyboard cancellation, disabled loading items and selection status', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const openChange = vi.fn();
    const view = render(<Autocomplete source={['Ada']} open={false} onOpenChange={openChange} />);
    await user.click(screen.getByRole('combobox'));
    expect(openChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    view.rerender(<Autocomplete source={['Ada']} loading open onChange={change} />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
    await user.click(screen.getByRole('option', { name: 'Ada' }));
    expect(change).not.toHaveBeenCalled();
    view.rerender(
      <Autocomplete source={['Ada']} open onChange={change} onKeyDown={(event) => event.preventDefault()} />,
    );
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}{Enter}');
    expect(change).not.toHaveBeenCalled();
  });
});
