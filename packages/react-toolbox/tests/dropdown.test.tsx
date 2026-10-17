import { act, cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Dropdown from '../src/material/dropdown';

describe('native form integration', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('validates a required dropdown, submits its value, and resets its default', async () => {
    const user = userEvent.setup();
    const view = render(
      <form>
        <Dropdown label="Destination" name="city" required source={['Madrid', 'Tokyo']} />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    act(() => {
      expect(form.checkValidity()).toBe(false);
    });
    const trigger = screen.getByRole('combobox', { name: /Destination/ });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    await user.click(screen.getByRole('option', { name: 'Tokyo' }));
    expect(form.checkValidity()).toBe(true);
    await waitFor(() => expect(new FormData(form).get('city')).toBe('Tokyo'));
    expect(trigger).toHaveValue('Tokyo');
    await act(async () => form.reset());
    await waitFor(() => expect(trigger).toHaveValue(''));
  });

  it('keeps controlled dropdown submission consistent after form reset', async () => {
    const view = render(
      <form>
        <Dropdown label="City" name="city" value="Tokyo" source={['Paris', 'Tokyo']} />
      </form>,
    );
    const form = view.container.querySelector('form')!;
    await act(async () => form.reset());
    await waitFor(() => expect(new FormData(form).get('city')).toBe('Tokyo'));
    expect(screen.getByRole('combobox')).toHaveValue('Tokyo');
  });
});

it('preserves a closed dropdown typeahead match when opening', () => {
  const change = vi.fn();
  render(<Dropdown source={['Alpha', 'Beta']} onChange={change} />);
  const input = screen.getByRole('combobox');
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'Escape' });
  fireEvent.keyDown(input, { key: 'b' });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(change).toHaveBeenCalledWith('Beta', expect.anything());
});

describe('option groups and typeahead', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
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
