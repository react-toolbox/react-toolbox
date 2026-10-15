// Shared Material typography and sizing resets. Keep complete, static utilities
// so Tailwind can discover them in copied component source.
export const materialRoot = [
  'box-border',
  'font-(family-name:--preferred-font)',
  '[-webkit-font-smoothing:antialiased]',
  '[font-smoothing:antialiased]',
  '[-webkit-text-size-adjust:100%]',
  '[-moz-text-size-adjust:100%]',
  '[text-size-adjust:100%]',
].join(' ');

export const materialDescendants = [
  '[&_*]:box-border [&_*]:[-webkit-font-smoothing:antialiased] [&_*]:[font-smoothing:antialiased] [&_*]:[-webkit-text-size-adjust:100%] [&_*]:[-moz-text-size-adjust:100%] [&_*]:[text-size-adjust:100%] [&_*]:[-webkit-touch-callout:none] [&_*::after]:box-border [&_*::after]:[-webkit-font-smoothing:antialiased] [&_*::after]:[font-smoothing:antialiased] [&_*::after]:[-webkit-text-size-adjust:100%] [&_*::after]:[-moz-text-size-adjust:100%] [&_*::after]:[text-size-adjust:100%] [&_*::after]:[-webkit-touch-callout:none] [&_*::before]:box-border [&_*::before]:[-webkit-font-smoothing:antialiased] [&_*::before]:[font-smoothing:antialiased] [&_*::before]:[-webkit-text-size-adjust:100%] [&_*::before]:[-moz-text-size-adjust:100%] [&_*::before]:[text-size-adjust:100%] [&_*::before]:[-webkit-touch-callout:none]',
].join(' ');
