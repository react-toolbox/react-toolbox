import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Button, BrowseButton, IconButton, Input, ThemeProvider } from '../src';

describe('styling API', () => {
  it('adds local class overrides without replacing structural classes', () => {
    render(<Button label="Composed" className="rounded-none custom custom" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rt-button-button', 'rounded-none', 'custom');
    expect(button.className.split(' ').filter((item) => item === 'custom')).toHaveLength(1);
  });

  it.each([
    ['flat', {}],
    ['raised', { raised: true }],
    ['floating', { floating: true }],
  ])('lets className override %s appearance defaults', (_variant, shape) => {
    const view = render(<Button {...shape} label="Custom" className="h-20 rounded-none" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-20', 'rounded-none');
    view.rerender(<Button {...shape} label="Custom" className="h-24 rounded-none" />);
    expect(button).toHaveClass('h-24');
    expect(button).not.toHaveClass('h-20');
  });

  it('applies shared overrides to file-picker labels and icon buttons', () => {
    const { container } = render(
      <>
        <BrowseButton raised label="Upload" className="h-16 rounded-none" />
        <IconButton icon="add" aria-label="Add" className="h-16 rounded-none" />
      </>,
    );
    expect(container.querySelector('label')).toHaveClass('h-16', 'rounded-none');
    expect(screen.getByRole('button', { name: 'Add' })).toHaveClass('h-16', 'rounded-none');
  });

  it('forwards typed input handles and keeps unscoped providers wrapper-free', () => {
    const ref = createRef();
    const { container } = render(
      <ThemeProvider>
        <Input ref={ref} aria-label="Name" />
      </ThemeProvider>,
    );
    expect(container.children).toHaveLength(1);
    expect(container.firstElementChild).toHaveAttribute('data-react-toolbox', 'input');
    expect(ref.current.inputElement).toBe(screen.getByRole('textbox'));
    ref.current.focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    ref.current.blur();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('renders on the server without requiring browser globals', () => {
    const html = renderToString(
      <ThemeProvider variables={{ '--rt-color-primary': '#123456' }}>
        <Button primary raised label="Server rendered" />
      </ThemeProvider>,
    );
    expect(html).toContain('data-react-toolbox-theme');
    expect(html).toContain('--rt-color-primary:#123456');
    expect(html).toContain('rt-button-primary');
  });

  it('marks explicit nested tokens for selective recalculation without resetting inherited defaults', () => {
    const view = render(
      <ThemeProvider variables={{ '--rt-color-primary': '#123456' }}>
        <ThemeProvider variables={{ '--unit': '12px' }} style={{ '--rt-color-accent': '#654321' }}>
          <Button label="Nested tokens" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const scope = screen.getByRole('button').parentElement;
    expect(scope).toHaveAttribute('data-react-toolbox-tokens', '--rt-color-primary --unit --rt-color-accent');
    expect(scope.style.getPropertyValue('--rt-color-primary')).toBe('#123456');
    view.rerender(
      <ThemeProvider className="layout">
        <Button label="Only a class" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button').parentElement).not.toHaveAttribute('data-react-toolbox-tokens');
  });
});

it('preserves host custom properties and references alongside Toolbox tokens', () => {
  const { container } = render(
    <ThemeProvider
      variables={{
        '--rt-color-primary': '#123456',
        '--rt-color-primary-dark': 'var(--rt-color-primary)',
        '--color-primary': 'var(--primary)',
        '--primary': '#abcdef',
      }}
      style={{ '--rt-color-accent': '#654321', '--color-accent': 'var(--accent)' }}
    >
      <Button label="Scoped colors" />
    </ThemeProvider>,
  );
  const scope = container.firstElementChild;
  expect(scope.style.getPropertyValue('--rt-color-primary')).toBe('#123456');
  expect(scope.style.getPropertyValue('--rt-color-primary-dark')).toBe('var(--rt-color-primary)');
  expect(scope.style.getPropertyValue('--rt-color-accent')).toBe('#654321');
  expect(scope.style.getPropertyValue('--primary')).toBe('#abcdef');
  expect(scope.style.getPropertyValue('--color-primary')).toBe('var(--primary)');
  expect(scope.style.getPropertyValue('--color-accent')).toBe('var(--accent)');
  expect(scope).toHaveAttribute(
    'data-react-toolbox-tokens',
    '--rt-color-primary --rt-color-primary-dark --color-primary --primary --rt-color-accent --color-accent',
  );
});
