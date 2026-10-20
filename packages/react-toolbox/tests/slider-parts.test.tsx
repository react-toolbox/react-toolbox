import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '../src/material/slider';

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

it('submits ordered range values and enforces thumb separation through the keyboard', () => {
  const change = vi.fn();
  const commit = vi.fn();
  const { container } = render(
    <form>
      <SliderRoot
        name="temperature"
        defaultValue={[10, 20]}
        min={0}
        max={30}
        step={2}
        minStepsBetweenThumbs={2}
        onValueChange={change}
        onValueCommit={commit}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb aria-label="Minimum temperature" />
        <SliderThumb aria-label="Maximum temperature" />
      </SliderRoot>
    </form>,
  );
  const low = screen.getByRole('slider', { name: 'Minimum temperature' });
  low.focus();
  fireEvent.keyDown(low, { key: 'ArrowRight' });
  expect(low).toHaveAttribute('aria-valuenow', '12');
  expect(change).toHaveBeenLastCalledWith([12, 20]);
  expect(commit).toHaveBeenLastCalledWith([12, 20]);
  for (let i = 0; i < 10; i++) fireEvent.keyDown(low, { key: 'ArrowRight' });
  expect(low).toHaveAttribute('aria-valuenow', '16');
  expect(new FormData(container.querySelector('form')!).getAll('temperature[]')).toEqual(['16', '20']);
});

it('supports vertical values, native disabled form exclusion and right-to-left direction', () => {
  const { rerender, container } = render(
    <form>
      <SliderRoot name="volume" orientation="vertical" defaultValue={[50]}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb aria-label="Volume" />
      </SliderRoot>
    </form>,
  );
  const thumb = screen.getByRole('slider');
  fireEvent.keyDown(thumb, { key: 'ArrowUp' });
  expect(thumb).toHaveAttribute('aria-valuenow', '51');
  expect(thumb).toHaveAttribute('aria-orientation', 'vertical');
  rerender(
    <form>
      <SliderRoot name="volume" dir="rtl" defaultValue={[50]} disabled>
        <SliderThumb aria-label="Volume" />
      </SliderRoot>
    </form>,
  );
  expect(new FormData(container.querySelector('form')!).has('volume')).toBe(false);
  rerender(
    <form>
      <SliderRoot name="volume" dir="rtl" defaultValue={[50]}>
        <SliderThumb aria-label="Volume" />
      </SliderRoot>
    </form>,
  );
  fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
  expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '52');
});
