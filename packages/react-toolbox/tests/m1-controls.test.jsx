import React, { StrictMode, useState } from 'react';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Input, Dropdown, Autocomplete, Checkbox, RadioButton, RadioGroup, Switch, Chip, DatePicker, TimePicker } from '../components';
import { DatePickerDialog } from '../components/date_picker';
import Calendar from '../components/date_picker/Calendar';

afterEach(() => { cleanup(); vi.useRealTimers(); });
const strict = children => <StrictMode>{children}</StrictMode>;

describe('Material 1 control behavior', () => {
  it('associates labels and descriptions with unique hydrated inputs and updates uncontrolled counters', async () => {
    const content = strict(<><Input label="Name" hint="Your name" error="Enter a full name" maxLength={30} defaultValue="Ada" /><Input label="Other name" /></>);
    const container = document.createElement('div');
    container.innerHTML = renderToString(content);
    document.body.append(container);
    const before = [...container.querySelectorAll('input')].map(input => input.id);
    const recover = vi.fn();
    let root;
    await act(async () => { root = hydrateRoot(container, content, { onRecoverableError: recover }); });
    expect([...container.querySelectorAll('input')].map(input => input.id)).toEqual(before);
    expect(new Set(before).size).toBe(2);
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Your name Enter a full name 3/30');
    fireEvent.change(input, { target: { value: 'Ada Lovelace' } });
    expect(screen.getByText('12/30')).toBeInTheDocument();
    expect(recover).not.toHaveBeenCalled();
    act(() => root.unmount());
    container.remove();
  });

  it('enforces multiline limits including zero and updates the visible value and count', () => {
    const onChange = vi.fn();
    render(<Input multiline label="Limited" maxLength={0} onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Limited' });
    fireEvent.change(input, { target: { value: 'Pasted content' } });
    expect(input).toHaveValue('');
    expect(screen.getByText('0/0')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith('', expect.anything());
  });

  it('selects dropdown values by keyboard, skips disabled options, and submits the value rather than label', () => {
    const onChange = vi.fn();
    let selectedName;
    function Example() {
      const [value, setValue] = useState('a');
      return <form><Dropdown label="Choice" name="choice" value={value}
        onChange={(next, event) => { selectedName = event.target.name; setValue(next); onChange(next, event); }}
        source={[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Blocked', disabled: true }, { value: 'c', label: 'Charlie' }]} /></form>;
    }
    const view = render(strict(<Example />));
    const field = screen.getByRole('combobox', { name: 'Choice' });
    fireEvent.focus(field);
    fireEvent.keyDown(field, { key: 'ArrowDown' });
    expect(document.getElementById(field.getAttribute('aria-activedescendant'))).toHaveTextContent('Charlie');
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('c', expect.anything());
    expect(selectedName).toBe('choice');
    expect(field).toHaveAttribute('aria-expanded', 'false');
    expect(new FormData(view.container.querySelector('form')).get('choice')).toBe('c');
  });

  it('supports primitive dropdown sources and keyboard activation of templates', () => {
    const onChange = vi.fn();
    render(<Dropdown label="Letter" source={['Alpha', 'Beta']} template={item => item?.label || 'Choose'} onChange={onChange} />);
    const field = screen.getByRole('combobox', { name: 'Letter' });
    expect(field).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(field, { key: 'ArrowDown' });
    fireEvent.keyDown(field, { key: 'End' });
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('Beta', expect.anything());
  });

  it('gives autocomplete instances distinct options and selects the clicked option without prior hover', () => {
    const onChange = vi.fn();
    render(strict(<><Autocomplete label="First" multiple={false} source={{ a: 'Alpha', b: 'Beta' }} onChange={onChange} />
      <Autocomplete label="Second" multiple={false} source={{ a: 'Alpha', b: 'Beta' }} /></>));
    const field = screen.getByRole('combobox', { name: 'First' });
    fireEvent.focus(field);
    const options = screen.getAllByRole('option');
    expect(new Set([...document.querySelectorAll('[role="option"]')].map(option => option.id)).size).toBe(4);
    fireEvent.mouseDown(options.find(option => option.textContent === 'Beta'));
    expect(onChange).toHaveBeenCalledWith('b', expect.anything());
  });

  it('accepts the keyboard autocomplete suggestion and does not select undefined when nothing matches', () => {
    const onChange = vi.fn();
    render(<Autocomplete label="Search" multiple={false} source={{ a: 'Alpha', b: 'Beta' }} suggestionMatch="word" onChange={onChange} />);
    const field = screen.getByRole('combobox', { name: 'Search' });
    fireEvent.focus(field);
    fireEvent.keyDown(field, { key: 'ArrowDown' });
    fireEvent.keyDown(field, { key: 'ArrowDown' });
    expect(document.getElementById(field.getAttribute('aria-activedescendant'))).toHaveTextContent('Beta');
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('b', expect.anything());
    onChange.mockClear();
    fireEvent.focus(field);
    fireEvent.change(field, { target: { value: '[' } });
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
    expect(field).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps disabled selection controls natively disabled and submits radio groups by their supplied name', () => {
    const change = vi.fn();
    const view = render(<form><Checkbox label="Check" disabled onChange={change} /><Switch label="Switch" disabled onChange={change} />
      <RadioGroup name="mode" value="a" onChange={change}><RadioButton label="A" value="a" /><RadioButton label="B" value="b" /></RadioGroup>
      <RadioGroup value="c"><RadioButton label="C" value="c" /><RadioButton label="D" value="d" /></RadioGroup></form>);
    expect(screen.getByRole('checkbox', { name: 'Check' })).toBeDisabled();
    expect(screen.getByRole('switch', { name: 'Switch' })).toBeDisabled();
    fireEvent.click(screen.getByRole('switch', { name: 'Switch' }));
    expect(change).not.toHaveBeenCalled();
    expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('name', 'mode');
    expect(screen.getByRole('radio', { name: 'C' }).name).toBe(screen.getByRole('radio', { name: 'D' }).name);
    expect(screen.getByRole('radio', { name: 'C' }).name).not.toBe('mode');
    expect(new FormData(view.container.querySelector('form')).get('mode')).toBe('a');
  });

  it('deletes chips using Delete and an accessible delete button without activating the chip', () => {
    const onDelete = vi.fn();
    const onClick = vi.fn();
    const view = render(<Chip deletable deleteLabel="Remove Ada" onDeleteClick={onDelete} onClick={onClick}>Ada</Chip>);
    const chip = view.container.firstElementChild;
    fireEvent.keyDown(chip, { key: 'Delete' });
    fireEvent.keyDown(screen.getByRole('button', { name: 'Remove Ada' }), { key: 'Enter' });
    expect(onDelete).toHaveBeenCalledTimes(2);
    expect(onClick).not.toHaveBeenCalled();
    view.rerender(<Chip disabled deletable deleteLabel="Remove Ada" onDeleteClick={onDelete}>Ada</Chip>);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Ada' }));
    expect(onDelete).toHaveBeenCalledTimes(2);
  });

  it('compares date constraints as days and prevents confirming a disabled date', () => {
    vi.useFakeTimers();
    const onSelect = vi.fn();
    const value = new Date(2026, 9, 13, 9, 30);
    const view = render(<DatePickerDialog active value={value} minDate={new Date(2026, 9, 13, 18)}
      disabledDates={[new Date(2026, 9, 14, 18)]} onSelect={onSelect} />);
    const current = screen.getByRole('button', { name: '13 October 2026' });
    const blocked = screen.getByRole('button', { name: '14 October 2026' });
    expect(current).not.toHaveAttribute('aria-disabled');
    expect(blocked).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onSelect).toHaveBeenCalledWith(value, expect.anything());
    view.rerender(<DatePickerDialog active value={new Date(2026, 9, 14)} disabledDates={[new Date(2026, 9, 14, 18)]} onSelect={onSelect} />);
    expect(screen.getByRole('button', { name: 'Ok' })).toBeDisabled();
  });

  it('scopes calendar arrows to its own focus, skips unavailable dates, and marks today', () => {
    const onChange = vi.fn();
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 18);
    render(<><input aria-label="Unrelated" /><Calendar selectedDate={today} disabledDates={[tomorrow]} onChange={onChange} /></>);
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Unrelated' }), { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.keyDown(screen.getByRole('group', { name: 'Calendar' }), { key: 'ArrowRight' });
    expect(onChange.mock.calls[0][0].getDate()).toBe(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).getDate());
    expect(document.querySelector('[data-today] > span')).toHaveAttribute('aria-current', 'date');
  });

  it('switches AM/PM without changing the day and supports keyboard hour/minute editing', () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    const value = new Date(2026, 9, 13, 13, 30);
    render(<TimePicker active value={value} format="ampm" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'AM' }));
    fireEvent.click(screen.getByRole('button', { name: 'AM' }));
    expect(screen.getByRole('spinbutton', { name: 'Hours' })).toHaveAttribute('aria-valuenow', '1');
    fireEvent.keyDown(screen.getByRole('spinbutton', { name: 'Hours' }), { key: 'ArrowUp' });
    fireEvent.keyDown(screen.getByRole('spinbutton', { name: 'Minutes' }), { key: 'End' });
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onChange.mock.calls[0][0]).toEqual(new Date(2026, 9, 13, 2, 59));
  });

  it('supports month swipes and keyboard year selection using the existing calendar views', () => {
    vi.useFakeTimers();
    const onSelect = vi.fn();
    render(<DatePickerDialog active value={new Date(2026, 9, 13)} onSelect={onSelect} />);
    const calendar = document.querySelector('[data-react-toolbox="calendar"]');
    fireEvent.touchStart(calendar, { touches: [{ clientX: 200, clientY: 100 }] });
    fireEvent.touchEnd(calendar, { changedTouches: [{ clientX: 100, clientY: 105 }] });
    expect(screen.getByText('November 2026')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(350));
    expect(screen.queryByText('October 2026')).not.toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('button', { name: 'Choose year' }), { key: 'Enter' });
    const year = screen.getByRole('button', { name: '2026' });
    fireEvent.keyDown(year, { key: 'ArrowDown' });
    expect(screen.getByRole('button', { name: '2027' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onSelect.mock.calls[0][0].getFullYear()).toBe(2027);
  });

  it('opens date pickers only on activation, restores focus without reopening, and honors disabled fields', () => {
    vi.useFakeTimers();
    const view = render(<DatePicker label="Date" value={new Date(2026, 9, 13)} />);
    const field = screen.getByRole('textbox', { name: 'Date' });
    fireEvent.focus(field);
    expect(field).toHaveAttribute('aria-expanded', 'false');
    fireEvent.keyDown(field, { key: 'Enter' });
    act(() => vi.advanceTimersByTime(20));
    expect(field).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    act(() => vi.advanceTimersByTime(500));
    expect(field).toHaveAttribute('aria-expanded', 'false');
    view.rerender(<DatePicker disabled label="Date" value={new Date(2026, 9, 13)} />);
    expect(field).toBeDisabled();
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(field).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('typed hook control handles', () => {
  it('forwards input focus and blur to the native input and clears its handle on unmount', () => {
    const ref = React.createRef();
    const view = render(strict(<Input ref={ref} label="Handled input" />));
    const element = screen.getByRole('textbox', { name: 'Handled input' });
    expect(ref.current.inputElement).toBe(element);
    act(() => ref.current.focus());
    expect(element).toHaveFocus();
    act(() => ref.current.blur());
    expect(element).not.toHaveFocus();
    view.unmount();
    expect(ref.current).toBeNull();
  });

  it('keeps a typed single autocomplete query when its optional source is omitted', () => {
    render(strict(<Autocomplete multiple={false} allowCreate label="Create a value" />));
    const field = screen.getByRole('combobox', { name: 'Create a value' });
    fireEvent.focus(field);
    fireEvent.change(field, { target: { value: 'Created' } });
    expect(field).toHaveValue('Created');
  });
});
