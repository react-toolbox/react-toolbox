import './tokens.css';
import { forcedColorsFocusClasses } from '../foundations/styles/composition';
export const labelSizeClasses = 'min-w-[72px] max-w-[264px] [@media_(min-width:_600px)]:min-w-[160px]';
export const labelFocusClasses = `outline-none focus-visible:bg-(--tab-focus-color) ${forcedColorsFocusClasses}`;
export const activeClasses = [
  'rt-tabs-active',
  '[.rt-tabs-label&]:text-(--tab-text-color)',
  '[.rt-tabs-tab&]:flex',
  '[.rt-tabs-inverse_.rt-tabs-label&]:text-(--tab-inverse-text-color)',
].join(' ');
