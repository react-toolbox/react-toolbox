// @vitest-environment node
import { beforeAll, describe, expect, it } from 'vitest';
import { classLiteral, classStrings, createCanonicalizer } from '../scripts/lint-tailwind.mjs';

describe('Tailwind canonical class lint', () => {
  let canonicalize;
  beforeAll(async () => {
    canonicalize = await createCanonicalizer();
  });

  /** Tailwind builds its canonicalization cache on the first candidate, which is slower on CI runners. */
  it('uses standard utilities and variable shorthand without changing the declarations', async () => {
    expect(await canonicalize('grow-[1]')).toBe('grow');
    expect(await canonicalize('[flex-wrap:wrap]')).toBe('flex-wrap');
    expect(await canonicalize('h-[var(--button-height)]')).toBe('h-(--button-height)');
    expect(await canonicalize('h-(--button-height)')).toBe('h-(--button-height)');
  }, 15_000);

  it('preserves ancestor specificity, hover conditions, and host-independent values', async () => {
    expect(await canonicalize('[.rt-button-squared_&]:mr-[var(--button-squared-icon-margin)]')).toBe(
      '[.rt-button-squared_&]:mr-(--button-squared-icon-margin)',
    );
    expect(await canonicalize('[&:hover]:flex')).toBe('[&:hover]:flex');
    expect(await canonicalize('[font-weight:500]')).toBe('[font-weight:500]');
    expect(await canonicalize('tracking-[0]')).toBe('tracking-[0]');
    expect(await canonicalize('w-[16px]')).toBe('w-[16px]');
    expect(await canonicalize("[&[data-line-count='3']]:pt-[calc(1.6_*_var(--unit))]")).toBe(
      "[&[data-line-count='3']]:pt-[calc(1.6*var(--unit))]",
    );
    expect(await canonicalize('[@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:h-[var(--height)]')).toBe(
      '[@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:h-(--height)',
    );
  });

  it('only extracts class strings, including conditional branches and shared constants', () => {
    const source = `
      const label = 'grow-[1]';
      const buttonClasses = ['h-[var(--button-height)]'].join(' ');
      const view = <Button label="grow-[1]" className={cn('grow-[1]', label === 'grow-[1]' && '[flex-wrap:wrap]', active ? 'block' : 'hidden')} />;
    `;
    expect(classStrings(source).map((node) => node.value)).toEqual([
      'h-[var(--button-height)]',
      'grow-[1]',
      '[flex-wrap:wrap]',
      'block',
      'hidden',
    ]);
  });

  it('preserves quotes and selectors when fixing JSX attributes or JavaScript strings', () => {
    const value = '[&[data-name="x"]]:grow';
    const jsx = classStrings(`<div className=${classLiteral(value, '"', true)} />`)[0];
    const js = classStrings(`cn(${classLiteral(value, "'", false)})`)[0];
    expect(jsx.value).toBe(value);
    expect(jsx.jsx).toBe(true);
    expect(js.value).toBe(value);
    expect(js.jsx).toBe(false);
    expect(classStrings(`cn(${classLiteral('grow\nh-(--height)', "'", false)})`)[0].value).toBe('grow\nh-(--height)');
  });
});
