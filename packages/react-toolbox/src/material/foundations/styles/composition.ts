/** Compound parts share M1 structure; each family owns its surface tokens. */
export const surfaceClasses = 'box-border [&_*]:box-border font-(family-name:--preferred-font) outline-none';
export const popupClasses =
  'z-400 min-w-[112px] max-h-(--radix-popper-available-height) overflow-y-auto [box-shadow:var(--shadow-8p)] origin-(--radix-popper-transform-origin) data-[state=open]:animate-[toolbox-enter_var(--animation-duration-enter)_var(--animation-curve-linear-out-slow-in)] data-[state=closed]:animate-[toolbox-exit_var(--animation-duration-exit)_var(--animation-curve-fast-out-linear-in)] motion-reduce:[animation-duration:0.01ms]! motion-reduce:[animation-delay:0ms]! motion-reduce:[animation-iteration-count:1]!';
export const optionClasses =
  'relative flex cursor-default items-center gap-[16px] outline-none data-disabled:pointer-events-none data-disabled:opacity-50';
export const focusClasses =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--rt-color-primary)';
/** Surface fills disappear in forced colors; retain a system-colored keyboard focus indicator. */
export const forcedColorsFocusClasses =
  'forced-colors:focus-visible:[outline:2px_solid_Highlight] forced-colors:focus-visible:-outline-offset-2';
