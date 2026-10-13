import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Button, Input, ThemeProvider } from '../components';

describe('modern theme API', () => {
  it('adds local class overrides without replacing structural classes', () => {
    render(<Button label="Composed" theme={{ button: 'rounded-none custom custom' }} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rt-button-button', 'rounded-none', 'custom');
    expect(button.className.split(' ').filter(item => item === 'custom')).toHaveLength(1);
  });

  it('forwards typed input handles and keeps unscoped providers wrapper-free', () => {
    const ref = createRef();
    const { container } = render(<ThemeProvider><Input ref={ref} aria-label="Name" /></ThemeProvider>);
    expect(container.children).toHaveLength(1);
    expect(container.firstElementChild).toHaveAttribute('data-react-toolbox', 'input');
    expect(ref.current.inputElement).toBe(screen.getByRole('textbox'));
    ref.current.focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    ref.current.blur();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('renders on the server without requiring browser globals', () => {
    const html = renderToString(<ThemeProvider variables={{ '--color-primary': '#123456' }}><Button primary raised label="Server rendered" /></ThemeProvider>);
    expect(html).toContain('data-react-toolbox-theme');
    expect(html).toContain('--color-primary:#123456');
    expect(html).toContain('rt-button-primary');
  });

  it('marks explicit nested tokens for selective recalculation without resetting inherited defaults', () => {
    const view = render(
      <ThemeProvider variables={{ '--color-primary': '#123456' }}>
        <ThemeProvider variables={{ '--unit': '12px' }} style={{ '--color-accent': '#654321' }}>
          <Button label="Nested tokens" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const scope = screen.getByRole('button').parentElement;
    expect(scope).toHaveAttribute('data-react-toolbox-tokens', '--color-primary --unit --color-accent');
    expect(scope.style.getPropertyValue('--color-primary')).toBe('#123456');
    view.rerender(<ThemeProvider className="layout"><Button label="Only a class" /></ThemeProvider>);
    expect(screen.getByRole('button').parentElement).not.toHaveAttribute('data-react-toolbox-tokens');
  });
});
