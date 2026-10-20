import './tokens.css';
export const activeClasses = [
  'rt-date-picker-active',
  '[.rt-date-picker-day&>span]:[background:var(--calendar-primary-color)] [.rt-date-picker-day&>span]:text-(--calendar-primary-contrast-color)',
  '[.rt-date-picker-years>li&]:text-(--calendar-primary-color) [.rt-date-picker-years>li&]:text-(length:--calendar-year-font-size) [.rt-date-picker-years>li&]:font-(--font-weight-semi-bold)',
].join(' ');
