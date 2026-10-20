import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AppBar from '../src/material/app-bar';
import Avatar from '../src/material/avatar';
import { CardMedia, CardTitle } from '../src/material/card';
import Chip from '../src/material/chip';

describe('accessible media and app-bar actions', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('labels app-bar actions and preserves card media nodes and background styling', () => {
    render(
      <>
        <AppBar leftIcon="menu" leftIconLabel="Open navigation" rightIcon="search" rightIconLabel="Search" />
        <CardMedia image={<img src="/photo.jpg" alt="Mountains" />} />
        <CardMedia data-testid="background" image="/cover.jpg" alt="Forest" style={{ opacity: 0.5 }} />
      </>,
    );
    expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Mountains' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Forest' })).toBeInTheDocument();
    expect(screen.getByTestId('background').style.backgroundImage).toContain('/cover.jpg');
  });

  it('keeps an avatar fallback while its image is unavailable', () => {
    render(<Avatar image="/missing.jpg" alt="Ada Lovelace" title="Ada" />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('avatar, card, and chip semantics', () => {
  it('lets custom avatar nodes own rendering with and without cover', () => {
    function CustomImage() {
      return <img src="/person.png" alt="Ada" />;
    }
    const { rerender } = render(<Avatar image={<CustomImage />} title="Fallback" />);
    expect(screen.getByRole('img', { name: 'Ada' })).toBeInTheDocument();
    expect(screen.queryByText('F')).not.toBeInTheDocument();
    rerender(<Avatar cover image={<CustomImage />} title="Fallback" />);
    expect(screen.getByRole('img', { name: 'Ada' })).toBeInTheDocument();
    expect(screen.queryByText('F')).not.toBeInTheDocument();
  });

  it('chooses card heading semantics without changing the title style', () => {
    render(<CardTitle heading="h2" title="Project" subtitle="Details" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Project' })).toHaveClass('rt-card-title');
  });

  it('exposes separate native chip actions and retains keyboard deletion', async () => {
    const open = vi.fn();
    const remove = vi.fn();
    render(
      <Chip deletable onClick={open} onDeleteClick={remove} deleteLabel="Remove Ada">
        Ada
      </Chip>,
    );
    const primary = screen.getByRole('button', { name: 'Ada', exact: true });
    expect(primary.tagName).toBe('BUTTON');
    expect(screen.getByRole('button', { name: 'Remove Ada' }).tagName).toBe('BUTTON');
    primary.focus();
    await userEvent.keyboard('{Enter}');
    expect(open).toHaveBeenCalledOnce();
    await userEvent.keyboard('{Backspace}');
    expect(remove).toHaveBeenCalledOnce();
    await userEvent.click(screen.getByRole('button', { name: 'Remove Ada' }));
    expect(remove).toHaveBeenCalledTimes(2);
    expect(open).toHaveBeenCalledOnce();
  });
});
