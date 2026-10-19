import './tokens.css';
import { cn } from '../foundations/styles/cn';
import type { ButtonAppearanceProps, ButtonShapeProps } from './types';
import { materialRoot, materialDescendants } from '../foundations/styles/classes';

export const rippleWrapperClasses = [
  'rt-button-rippleWrapper',
  '[.rt-button-button>&]:overflow-hidden',
  '[.rt-button-toggle>&]:rounded-[50%]',
  '[.rt-button-floating>&]:rounded-[50%]',
].join(' ');

export const buttonClasses = [
  'rt-button-button',
  'content-center items-center [border:0] cursor-pointer inline-block flex-row text-[calc(1.4*var(--unit))] [font-weight:500] h-(--button-height) justify-center tracking-[0] leading-(--button-height) [outline:none] p-0 relative text-center [text-decoration:none] uppercase [transition:box-shadow_0.2s_var(--animation-curve-fast-out-linear-in),background-color_0.2s_var(--animation-curve-default),color_0.2s_var(--animation-curve-default)] whitespace-nowrap',
  materialRoot,
  materialDescendants,
  '[&>input]:h-[0.1px] [&>input]:m-0 [&>input]:opacity-0 [&>input]:overflow-hidden [&>input]:p-0 [&>input]:absolute [&>input]:w-[0.1px] [&>input]:z-0',
  '[&::-moz-focus-inner]:[border:0]',
  "[&>:where(span:not([data-react-toolbox='tooltip']))]:inline-block [&>:where(span:not([data-react-toolbox='tooltip']))]:leading-(--button-height) [&>:where(span:not([data-react-toolbox='tooltip']))]:align-middle",
  '[&>svg]:inline-block [&>svg]:fill-current [&>svg]:text-[120%] [&>svg]:h-(--button-height) [&>svg]:align-top [&>svg]:w-[1em]',
  '[&>*]:pointer-events-none',
  '[&[disabled]]:text-(--button-disabled-text-color) [&[disabled]]:cursor-auto [&[disabled]]:pointer-events-none',
  "[&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:[background:currentColor] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:rounded-[inherit] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:[content:''] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:inset-0 [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:opacity-[0.12] [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:pointer-events-none [&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:absolute",
  "[&::after]:[content:''] [&::after]:h-full [&::after]:left-[min(0px,calc((100%-4.8*var(--unit))/2))] [&::after]:min-h-[calc(4.8*var(--unit))] [&::after]:min-w-[calc(4.8*var(--unit))] [&::after]:absolute [&::after]:top-[min(0px,calc((100%-4.8*var(--unit))/2))] [&::after]:w-full",
].join(' ');

export const squaredClasses = [
  'rt-button-squared',
  'rounded-(--button-border-radius) min-w-(--button-squared-min-width) p-(--button-squared-padding)',
  '[&>svg]:me-[calc(0.5*var(--unit))]',
].join(' ');

export const solidClasses = [
  'rt-button-solid',
  '[&[disabled]]:bg-(--button-disabled-background-color) [&[disabled]]:[box-shadow:none]',
  '[&:not([disabled]):is(:focus-visible,_:has(input:focus-visible))::before]:[background:var(--rt-color-black)]',
  '[.rt-button-neutral.rt-button-inverse&[disabled]]:bg-(--button-disabled-background-inverse)',
].join(' ');

export const raisedClasses = [
  'rt-button-raised',
  '[&:not([disabled]):active]:[box-shadow:var(--shadow-8p)]',
  '[box-shadow:var(--shadow-2p)]',
  '[.rt-button-primary:not([disabled])&]:[background:var(--button-primary-color)] [.rt-button-primary:not([disabled])&]:text-(--button-primary-color-contrast)',
  '[.rt-button-accent:not([disabled])&]:[background:var(--button-accent-color)] [.rt-button-accent:not([disabled])&]:text-(--button-accent-color-contrast)',
  '[.rt-button-neutral:not([disabled])&]:bg-(--button-neutral-color) [.rt-button-neutral:not([disabled])&]:text-(--button-neutral-color-contrast)',
  '[.rt-button-neutral:not([disabled]).rt-button-inverse&]:bg-(--button-neutral-color-contrast) [.rt-button-neutral:not([disabled]).rt-button-inverse&]:text-(--button-neutral-color)',
].join(' ');

export const floatingClasses = [
  'rt-button-floating',
  'rounded-[50%] [box-shadow:var(--shadow-6p)] text-(length:--button-floating-font-size) h-(--button-floating-height) w-(--button-floating-height)',
  '[.rt-button-primary:not([disabled])&]:[background:var(--button-primary-color)] [.rt-button-primary:not([disabled])&]:text-(--button-primary-color-contrast)',
  '[.rt-button-accent:not([disabled])&]:[background:var(--button-accent-color)] [.rt-button-accent:not([disabled])&]:text-(--button-accent-color-contrast)',
  '[.rt-button-neutral:not([disabled])&]:bg-(--button-neutral-color) [.rt-button-neutral:not([disabled])&]:text-(--button-neutral-color-contrast)',
  '[.rt-button-neutral:not([disabled]).rt-button-inverse&]:bg-(--button-neutral-color-contrast) [.rt-button-neutral:not([disabled]).rt-button-inverse&]:text-(--button-neutral-color)',
  '[&:not([disabled]):active]:[box-shadow:var(--button-floating-pressed-shadow)]',
  '[&>svg]:text-[length:inherit] [&>svg]:h-(--button-floating-height)',
  '[@media_screen_and_(max-width:_460px)]:h-(--button-floating-mini-height) [@media_screen_and_(max-width:_460px)]:w-(--button-floating-mini-height)',
  '[@media_screen_and_(max-width:_460px)]:[&>svg]:h-(--button-floating-mini-height)',
].join(' ');

export const flatClasses = [
  'rt-button-flat',
  '[background:transparent]',
  '[.rt-button-primary:not([disabled])&]:text-(--button-primary-color)',
  '[.rt-button-primary:not([disabled])&:hover]:[background:var(--button-primary-color-hover)]',
  '[.rt-button-accent:not([disabled])&]:text-(--button-accent-text-color)',
  '[.rt-button-accent:not([disabled])&:hover]:[background:var(--button-accent-color-hover)]',
  '[.rt-button-neutral:not([disabled])&]:text-(--button-neutral-color-contrast)',
  '[.rt-button-neutral:not([disabled])&:hover]:[background:var(--button-neutral-color-hover)]',
  '[.rt-button-neutral:not([disabled]).rt-button-inverse&]:text-(--button-neutral-color)',
  '[.rt-button-neutral:not([disabled]).rt-button-inverse&:hover]:[background:var(--button-neutral-color-hover)]',
].join(' ');

export const miniClasses = [
  'rt-button-mini',
  '[.rt-button-floating&]:text-(length:--button-floating-mini-font-size) [.rt-button-floating&]:h-(--button-floating-mini-height) [.rt-button-floating&]:w-(--button-floating-mini-height)',
  '[.rt-button-floating&>svg]:h-(--button-floating-mini-height)',
].join(' ');

export const inverseClasses = [
  'rt-button-inverse',
  '[.rt-button-neutral&[disabled]]:text-(--button-disabled-text-color-inverse)',
].join(' ');

export const iconClasses = [
  'rt-button-icon',
  '[.rt-button-squared_&]:text-[120%] [.rt-button-squared_&]:me-(--button-squared-icon-margin) [.rt-button-squared_&]:align-middle',
  '[.rt-button-toggle>&]:text-(length:--button-toggle-font-size) [.rt-button-toggle>&]:h-(--button-toggle-size) [.rt-button-toggle>&]:leading-(--button-toggle-size) [.rt-button-toggle>&]:align-top',
  "[.rt-button-floating_&:not([data-react-toolbox='tooltip'])]:leading-(--button-floating-height)",
  '[.rt-button-floating.rt-button-mini_&]:leading-(--button-floating-mini-height)',
  "[@media_screen_and_(max-width:_460px)]:[.rt-button-floating_&:not([data-react-toolbox='tooltip'])]:leading-(--button-floating-mini-height)",
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
  classNames,
}: ButtonAppearanceProps & ButtonShapeProps & { className?: string }) {
  const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
  return cn(
    buttonClasses,
    raised
      ? cn(squaredClasses, solidClasses, raisedClasses)
      : floating
        ? cn(solidClasses, floatingClasses)
        : cn(squaredClasses, flatClasses),
    classNames?.button,
    raised
      ? cn(classNames?.squared, classNames?.solid, classNames?.raised)
      : floating
        ? cn(classNames?.solid, classNames?.floating)
        : cn(classNames?.squared, classNames?.flat),
    neutral &&
      cn(primary ? 'rt-button-primary' : accent ? 'rt-button-accent' : 'rt-button-neutral', classNames?.[level]),
    mini && cn(miniClasses, classNames?.mini),
    inverse && cn(inverseClasses, classNames?.inverse),
    className,
  );
}
