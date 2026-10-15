import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Button, BrowseButton, IconButton, Input, ThemeProvider } from '../components';

describe('modern theme API', () => {
  it('adds local class overrides without replacing structural classes', () => {
    render(<Button label="Composed" theme={{ button: 'rounded-none custom custom' }} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rt-button-button', 'rounded-none', 'custom');
    expect(button.className.split(' ').filter((item) => item === 'custom')).toHaveLength(1);
  });

  it.each([
    ['flat', {}],
    ['raised', { raised: true }],
    ['floating', { floating: true }],
  ])('keeps root overrides ahead of %s defaults and specific overrides last', (variant, shape) => {
    const theme = { button: 'h-16 rounded-none', [variant]: 'h-20' };
    const view = render(<Button {...shape} label="Custom" theme={theme} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-20', 'rounded-none');
    expect(button).not.toHaveClass('h-16');
    view.rerender(<Button {...shape} label="Custom" theme={theme} className="h-24" />);
    expect(button).toHaveClass('h-24');
    expect(button).not.toHaveClass('h-20');
  });

  it('applies shared overrides to file-picker labels and icon buttons', () => {
    const theme = { button: 'h-16 rounded-none' };
    const { container } = render(
      <>
        <BrowseButton raised label="Upload" theme={theme} />
        <IconButton icon="add" aria-label="Add" theme={theme} />
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

it('normalizes legacy color inputs without creating host Tailwind aliases', () => {
  const { container } = render(
    <ThemeProvider
      variables={{
        '--color-primary': '#123456',
        '--color-primary-dark': 'var(--color-primary)',
        '--primary': '#abcdef',
      }}
      style={{ '--color-accent': '#654321' }}
    >
      <Button label="Legacy colors" />
    </ThemeProvider>,
  );
  const scope = container.firstElementChild;
  expect(scope.style.getPropertyValue('--rt-color-primary')).toBe('#123456');
  expect(scope.style.getPropertyValue('--rt-color-accent')).toBe('#654321');
  expect(scope.style.getPropertyValue('--rt-color-primary-dark')).toBe('var(--rt-color-primary)');
  expect(scope.style.getPropertyValue('--primary')).toBe('#abcdef');
  expect(scope.style.getPropertyValue('--color-primary')).toBe('');
  expect(scope.style.getPropertyValue('--color-accent')).toBe('');
  expect(scope).toHaveAttribute(
    'data-react-toolbox-tokens',
    '--rt-color-primary --rt-color-primary-dark --primary --rt-color-accent',
  );
});

it('lets canonical values win when a scope supplies both color names', () => {
  const { container } = render(
    <ThemeProvider variables={{ '--rt-color-primary': '#abcdef', '--color-primary': '#123456' }}>
      <Button label="Canonical" />
    </ThemeProvider>,
  );
  expect(container.firstElementChild.style.getPropertyValue('--rt-color-primary')).toBe('#abcdef');
});
