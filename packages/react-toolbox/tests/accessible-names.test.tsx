import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FontIcon from '../src/material/font-icon/FontIcon';
import DatePicker from '../src/material/date-picker/DatePicker';
import TimePicker from '../src/material/time-picker/TimePicker';

describe('standalone icon semantics', () => {
  it('exposes an image name for alt text and allows aria-label to take precedence', () => {
    const { rerender } = render(<FontIcon value="star" alt="Favorite" />);
    expect(screen.getByRole('img', { name: 'Favorite' })).toBeInTheDocument();
    rerender(<FontIcon value="star" alt="Favorite" aria-label="Saved project" />);
    expect(screen.getByRole('img', { name: 'Saved project' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Favorite' })).not.toBeInTheDocument();
  });

  it('supports an external label and preserves explicit roles', () => {
    const { rerender } = render(
      <>
        <span id="state">Project status</span>
        <FontIcon value="done" aria-labelledby="state" />
      </>,
    );
    expect(screen.getByRole('img', { name: 'Project status' })).toBeInTheDocument();
    rerender(<FontIcon value="done" role="status" aria-label="Complete" />);
    expect(screen.getByRole('status', { name: 'Complete' })).toBeInTheDocument();
  });

  it('keeps explicitly decorative icons out of the accessibility tree and omits empty labels', () => {
    const { container } = render(<FontIcon value="favorite" aria-hidden />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.firstChild).not.toHaveAttribute('aria-label');
    expect(container.firstChild).not.toHaveAttribute('role');
  });
});

describe('picker trigger semantics', () => {
  it.each([
    ['Date', DatePicker, 'Choose date'],
    ['Time', TimePicker, 'Choose time'],
  ] as const)(
    'connects the %s combobox to its modal and restores focus after Escape',
    async (label, Picker, dialogName) => {
      render(<Picker label={label} value={new Date(2026, 9, 13, 9, 30)} />);
      const trigger = screen.getByRole('combobox', { name: label });
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).not.toHaveAttribute('aria-controls');
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      const dialog = await screen.findByRole('dialog', { name: dialogName });
      await waitFor(() => expect(dialog).toHaveFocus());
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-controls', dialog.id);
      fireEvent.keyDown(dialog, { key: 'Escape' });
      await waitFor(() => expect(trigger).toHaveFocus());
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).not.toHaveAttribute('aria-controls');
    },
  );
});
