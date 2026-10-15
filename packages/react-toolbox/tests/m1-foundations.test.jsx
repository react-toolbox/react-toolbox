import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Button, { BrowseButton, IconButton } from '../src/material/button';
import { ListItemContent, ListItemText } from '../src/material/list';

afterEach(cleanup);

describe('Material 1 foundational interactions', () => {
  // https://m1.material.io/usability/accessibility.html: all interactive controls must
  // remain operable by keyboard; a disabled appearance must represent a disabled action.
  it.each([Button, IconButton])('prevents disabled link buttons from activating', (Component) => {
    const onClick = vi.fn(event => event.preventDefault());
    const { rerender } = render(<Component href="/destination" disabled onClick={onClick} aria-label="Action" />);
    const link = screen.getByRole('link', { name: 'Action' });
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(fireEvent.click(link)).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
    rerender(<Component href="/destination" onClick={onClick} aria-label="Action" />);
    expect(link).not.toHaveAttribute('aria-disabled');
    expect(link).not.toHaveAttribute('tabindex');
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([Button, IconButton])('preserves keyboard focus when the pointer leaves', (Component) => {
    const onMouseLeave = vi.fn();
    render(<Component onMouseLeave={onMouseLeave} aria-label="Action" />);
    const button = screen.getByRole('button', { name: 'Action' });
    button.focus();
    fireEvent.mouseLeave(button);
    expect(button).toHaveFocus();
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('disables the actual file control and gives its keyboard focus an accessible label', () => {
    const { rerender } = render(<BrowseButton label="Upload" disabled />);
    const input = screen.getByLabelText('Upload');
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toBeDisabled();
    rerender(<BrowseButton label="Upload" />);
    expect(input).toBeEnabled();
  });

  // https://m1.material.io/components/lists.html#lists-specs: explicit three-line
  // content has an 88dp layout; previously count=3 fell beyond the type array.
  it('retains the large content layout and marks three-line content for its 88dp geometry', () => {
    const { container } = render(
      <ListItemContent caption="Primary" legend="Secondary">
        <ListItemText>Third line</ListItemText>
      </ListItemContent>,
    );
    expect(container.firstChild).toHaveClass('rt-list-large');
    expect(container.firstChild).toHaveAttribute('data-line-count', '3');
    expect(screen.getByText('Third line')).toBeInTheDocument();
  });

  it('preserves an explicit list content type override', () => {
    const { container } = render(<ListItemContent type="normal" caption="Primary" legend="Secondary"><ListItemText>Third</ListItemText></ListItemContent>);
    expect(container.firstChild).not.toHaveClass('rt-list-large');
    expect(container.firstChild).not.toHaveAttribute('data-line-count');
  });
});
