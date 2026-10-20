import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from '../src/material/divider';

describe('Divider', () => {
  it('renders a horizontal semantic separator by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider.tagName).toBe('HR');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider).toHaveClass('h-px', 'w-full');
    expect(divider).not.toHaveAttribute('tabindex');
  });

  it('supports a named vertical separator that stretches in a flex row', () => {
    render(<Divider orientation="vertical" aria-label="Project metadata" />);
    expect(screen.getByRole('separator', { name: 'Project metadata' })).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getByRole('separator')).toHaveClass('w-px', 'h-auto', 'self-stretch');
  });

  it('removes decorative rules from the accessibility tree', () => {
    render(<Divider decorative data-testid="rule" />);
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByTestId('rule')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('rule')).toHaveAttribute('role', 'none');
    expect(screen.getByTestId('rule')).not.toHaveAttribute('aria-orientation');
  });

  it('forwards native props, refs, styles, and consumer utility overrides', () => {
    const ref = createRef<HTMLHRElement>();
    render(<Divider ref={ref} id="rule" className="w-24 my-4" style={{ backgroundColor: 'red' }} />);
    const divider = screen.getByRole('separator');
    expect(ref.current).toBe(divider);
    expect(divider).toHaveAttribute('id', 'rule');
    expect(divider).toHaveClass('w-24', 'my-4');
    expect(divider).not.toHaveClass('w-full');
    expect(divider).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });
});
