import './tokens.css';
export const itemClasses = [
  'rt-list-item',
  'items-center text-(--rt-color-text) flex min-h-(--list-item-min-height) p-[0_var(--list-horizontal-padding)] relative duration-(--animation-duration) [transition-property:background-color] [transition-timing-function:var(--animation-curve-default)]',
  "[&:has(.rt-list-itemContentRoot[data-line-count='3'])]:items-start",
].join(' ');

export const disabledClasses = [
  'rt-list-disabled',
  '[.rt-list-item&]:pointer-events-none',
  '[.rt-list-item&:not(.rt-list-checkboxItem)]:opacity-[0.5]',
].join(' ');
