import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button, DatePicker, Input, ThemeProvider, tooltipFactory } from '../src';
import { mergeStyleSlots } from '../src/material/foundations/styles/slots';

describe('classNames style slots', () => {
  it('keeps the fast path identity and lets current utilities win over compatibility overrides', () => {
    const original = { button: 'h-12 legacy' };
    expect(mergeStyleSlots(original)).toBe(original);
    expect(mergeStyleSlots(undefined, original)).toBe(original);
    expect(mergeStyleSlots(original, { button: 'h-16 current' })).toEqual({ button: 'legacy h-16 current' });
  });

  it('preserves structural classes, composes both APIs, and consumes classNames before the DOM', () => {
    render(
      <Button
        label="Save"
        icon="save"
        theme={{ button: 'h-12 legacy' }}
        classNames={{ button: 'h-16 current', icon: 'custom-icon' }}
      />,
    );
    const button = screen.getByRole('button', { name: /Save/ });
    expect(button).toHaveClass('rt-button-button', 'h-16', 'legacy', 'current');
    expect(button).not.toHaveClass('h-12');
    expect(button).not.toHaveAttribute('classnames');
    expect(button.querySelector('[data-react-toolbox="font-icon"]')).toHaveClass('custom-icon');
  });

  it('passes field slots through composite pickers and keeps design tokens separate', () => {
    const { container } = render(
      <ThemeProvider variables={{ '--rt-color-primary': '#00695c' }}>
        <Input label="Name" classNames={{ label: 'custom-label' }} />
        <DatePicker label="Date" classNames={{ container: 'date-container', inputElement: 'date-field' }} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Name')).toHaveClass('custom-label');
    expect(screen.getByLabelText('Date')).toHaveClass('date-field');
    expect(container.querySelector('[data-react-toolbox="date-picker"]')).toHaveClass('date-container');
    expect(container.querySelector('[data-react-toolbox-theme]')).toHaveStyle('--rt-color-primary: #00695c');
    expect(container.querySelector('[classnames]')).toBeNull();
  });

  it('merges factory and instance tooltip slots without forwarding them to a native trigger', () => {
    const Hint = tooltipFactory({ classNames: { tooltipInner: 'factory-slot' } })('button');
    const { container } = render(
      <Hint tooltip="Helpful" classNames={{ tooltipInner: 'instance-slot' }}>
        Help
      </Hint>,
    );
    fireEvent.focus(screen.getByRole('button'));
    expect(screen.getByText('Helpful')).toHaveClass('factory-slot', 'instance-slot');
    expect(container.querySelector('[classnames]')).toBeNull();
  });
});
