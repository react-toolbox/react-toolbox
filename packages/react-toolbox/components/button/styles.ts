import { cn } from '../utils/cn';
import type { ButtonAppearanceProps, ButtonShapeProps } from './types';
import { materialRoot, materialDescendants } from '../utils/styles';

export const rippleWrapperClasses = [
  'rt-button-rippleWrapper',
  '[.rt-button-button>&]:overflow-hidden',
  '[.rt-button-toggle>&]:rounded-[50%]',
  '[.rt-button-floating>&]:rounded-[50%]',
].join(' ');

export const buttonClasses = [
  'rt-button-button',
  '[align-content:center] items-center [border:0] cursor-pointer inline-block flex-row text-[length:calc(1.4_*_var(--unit))] [font-weight:500] h-[var(--button-height)] justify-center tracking-[0] leading-[var(--button-height)] [outline:none] p-0 relative text-center [text-decoration:none] uppercase [transition:box-shadow_0.2s_var(--animation-curve-fast-out-linear-in),_background-color_0.2s_var(--animation-curve-default),_color_0.2s_var(--animation-curve-default)] whitespace-nowrap',
  materialRoot,
  materialDescendants,
  '[&>input]:h-[0.1px] [&>input]:m-0 [&>input]:opacity-0 [&>input]:overflow-hidden [&>input]:p-0 [&>input]:absolute [&>input]:w-[0.1px] [&>input]:z-0',
  '[&::-moz-focus-inner]:[border:0]',
  "[&>:where(span:not([data-react-toolbox='tooltip']))]:inline-block [&>:where(span:not([data-react-toolbox='tooltip']))]:leading-[var(--button-height)] [&>:where(span:not([data-react-toolbox='tooltip']))]:align-middle",
  '[&>svg]:inline-block [&>svg]:fill-current [&>svg]:text-[length:120%] [&>svg]:h-[var(--button-height)] [&>svg]:align-top [&>svg]:w-[1em]',
  '[&>*]:pointer-events-none',
  '[&[disabled]]:text-[color:var(--button-disabled-text-color)] [&[disabled]]:[cursor:auto] [&[disabled]]:pointer-events-none',
  "[&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:[background:currentColor] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:rounded-[inherit] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:[content:''] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:[inset:0] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:opacity-[0.12] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:pointer-events-none [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:absolute",
  "[&::after]:[content:''] [&::after]:h-full [&::after]:left-[min(0px,_calc((100%_-_4.8_*_var(--unit))_/_2))] [&::after]:min-h-[calc(4.8_*_var(--unit))] [&::after]:min-w-[calc(4.8_*_var(--unit))] [&::after]:absolute [&::after]:top-[min(0px,_calc((100%_-_4.8_*_var(--unit))_/_2))] [&::after]:w-full",
].join(' ');

export const squaredClasses = [
  'rt-button-squared',
  'rounded-[var(--button-border-radius)] min-w-[var(--button-squared-min-width)] p-[var(--button-squared-padding)]',
  '[&>svg]:mr-[calc(0.5_*_var(--unit))]',
].join(' ');

export const solidClasses = [
  'rt-button-solid',
  '[&[disabled]]:bg-[var(--button-disabled-background-color)] [&[disabled]]:[box-shadow:none]',
  '[&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:[background:var(--rt-color-black)]',
  '[.rt-button-neutral.rt-button-inverse&[disabled]]:bg-[var(--button-disabled-background-inverse)]',
].join(' ');

export const raisedClasses = [
  'rt-button-raised',
  '[&:not([disabled]):active]:[box-shadow:var(--shadow-8p)]',
  '[box-shadow:var(--shadow-2p)]',
  '[.rt-button-primary:not([disabled])&]:[background:var(--button-primary-color)] [.rt-button-primary:not([disabled])&]:text-[color:var(--button-primary-color-contrast)]',
  '[.rt-button-accent:not([disabled])&]:[background:var(--button-accent-color)] [.rt-button-accent:not([disabled])&]:text-[color:var(--button-accent-color-contrast)]',
  '[.rt-button-neutral:not([disabled])&]:bg-[var(--button-neutral-color)] [.rt-button-neutral:not([disabled])&]:text-[color:var(--button-neutral-color-contrast)]',
  '[.rt-button-neutral:not([disabled]).rt-button-inverse&]:bg-[var(--button-neutral-color-contrast)] [.rt-button-neutral:not([disabled]).rt-button-inverse&]:text-[color:var(--button-neutral-color)]',
].join(' ');

export const floatingClasses = [
  'rt-button-floating',
  'rounded-[50%] [box-shadow:var(--shadow-6p)] text-[length:var(--button-floating-font-size)] h-[var(--button-floating-height)] w-[var(--button-floating-height)]',
  '[.rt-button-primary:not([disabled])&]:[background:var(--button-primary-color)] [.rt-button-primary:not([disabled])&]:text-[color:var(--button-primary-color-contrast)]',
  '[.rt-button-accent:not([disabled])&]:[background:var(--button-accent-color)] [.rt-button-accent:not([disabled])&]:text-[color:var(--button-accent-color-contrast)]',
  '[.rt-button-neutral:not([disabled])&]:bg-[var(--button-neutral-color)] [.rt-button-neutral:not([disabled])&]:text-[color:var(--button-neutral-color-contrast)]',
  '[.rt-button-neutral:not([disabled]).rt-button-inverse&]:bg-[var(--button-neutral-color-contrast)] [.rt-button-neutral:not([disabled]).rt-button-inverse&]:text-[color:var(--button-neutral-color)]',
  '[&:not([disabled]):active]:[box-shadow:var(--button-floating-pressed-shadow)]',
  '[&>svg]:text-[length:inherit] [&>svg]:h-[var(--button-floating-height)]',
  '[@media_screen_and_(max-width:_460px)]:h-[var(--button-floating-mini-height)] [@media_screen_and_(max-width:_460px)]:w-[var(--button-floating-mini-height)]',
  '[@media_screen_and_(max-width:_460px)]:[&>svg]:h-[var(--button-floating-mini-height)]',
].join(' ');

export const flatClasses = [
  'rt-button-flat',
  '[background:transparent]',
  '[.rt-button-primary:not([disabled])&]:text-[color:var(--button-primary-color)]',
  '[.rt-button-primary:not([disabled])&:hover]:[background:var(--button-primary-color-hover)]',
  '[.rt-button-accent:not([disabled])&]:text-[color:var(--button-accent-color)]',
  '[.rt-button-accent:not([disabled])&:hover]:[background:var(--button-accent-color-hover)]',
  '[.rt-button-neutral:not([disabled])&]:text-[color:var(--button-neutral-color-contrast)]',
  '[.rt-button-neutral:not([disabled])&:hover]:[background:var(--button-neutral-color-hover)]',
  '[.rt-button-neutral:not([disabled]).rt-button-inverse&]:text-[color:var(--button-neutral-color)]',
  '[.rt-button-neutral:not([disabled]).rt-button-inverse&:hover]:[background:var(--button-neutral-color-hover)]',
].join(' ');

export const miniClasses = [
  'rt-button-mini',
  '[.rt-button-floating&]:text-[length:var(--button-floating-mini-font-size)] [.rt-button-floating&]:h-[var(--button-floating-mini-height)] [.rt-button-floating&]:w-[var(--button-floating-mini-height)]',
  '[.rt-button-floating&>svg]:h-[var(--button-floating-mini-height)]',
].join(' ');

export const inverseClasses = [
  'rt-button-inverse',
  '[.rt-button-neutral&[disabled]]:text-[color:var(--button-disabled-text-color-inverse)]',
].join(' ');

export const iconClasses = [
  'rt-button-icon',
  '[.rt-button-squared_&]:text-[length:120%] [.rt-button-squared_&]:mr-[var(--button-squared-icon-margin)] [.rt-button-squared_&]:align-middle',
  '[.rt-button-toggle>&]:text-[length:var(--button-toggle-font-size)] [.rt-button-toggle>&]:h-[var(--button-toggle-size)] [.rt-button-toggle>&]:leading-[var(--button-toggle-size)] [.rt-button-toggle>&]:align-top',
  "[.rt-button-floating_&:not([data-react-toolbox='tooltip'])]:leading-[var(--button-floating-height)]",
  '[.rt-button-floating.rt-button-mini_&]:leading-[var(--button-floating-mini-height)]',
  "[@media_screen_and_(max-width:_460px)]:[.rt-button-floating_&:not([data-react-toolbox='tooltip'])]:leading-[var(--button-floating-mini-height)]",
].join(' ');

/** Button and file-picker labels share the same appearance and override order. */
export function buttonClassName({
  accent,
  className,
  floating,
  inverse,
  mini,
  neutral,
  primary,
  raised,
  theme,
}: ButtonAppearanceProps & ButtonShapeProps & { className?: string }) {
  const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
  return cn(
    buttonClasses,
    raised
      ? cn(squaredClasses, solidClasses, raisedClasses)
      : floating
        ? cn(solidClasses, floatingClasses)
        : cn(squaredClasses, flatClasses),
    theme?.button,
    raised
      ? cn(theme?.squared, theme?.solid, theme?.raised)
      : floating
        ? cn(theme?.solid, theme?.floating)
        : cn(theme?.squared, theme?.flat),
    neutral && cn(primary ? 'rt-button-primary' : accent ? 'rt-button-accent' : 'rt-button-neutral', theme?.[level]),
    mini && cn(miniClasses, theme?.mini),
    inverse && cn(inverseClasses, theme?.inverse),
    className,
  );
}
