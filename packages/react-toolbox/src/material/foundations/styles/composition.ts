// Compound parts share M1 presentation. Interaction and ARIA belong to primitives.
export const surfaceClasses =
  'box-border [&_*]:box-border font-(family-name:--preferred-font) bg-(--rt-color-white) text-(--rt-color-text) rounded-[2px] outline-none';
export const popupClasses =
  'z-400 min-w-[112px] max-h-(--radix-popper-available-height) overflow-y-auto py-[8px] [box-shadow:var(--shadow-8p)] origin-(--radix-popper-transform-origin) data-[state=open]:animate-[toolbox-enter_var(--menu-expand-duration)_var(--animation-curve-linear-out-slow-in)] data-[state=closed]:animate-[toolbox-exit_var(--menu-fade-duration)_var(--animation-curve-fast-out-linear-in)] motion-reduce:animate-none!';
export const optionClasses =
  'relative flex min-h-[48px] cursor-default items-center gap-[16px] px-[16px] py-[8px] text-[16px] leading-[24px] outline-none data-highlighted:bg-(--menu-item-hover-background) data-disabled:pointer-events-none data-disabled:opacity-50';
export const focusClasses =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--rt-color-primary)';
