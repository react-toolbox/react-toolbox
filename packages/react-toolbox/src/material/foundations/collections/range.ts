export const range = (start = 0, stop: number | null = null, step = 1): number[] => {
  const from = stop === null ? 0 : start;
  const to = stop === null ? start : stop;
  return Array.from({ length: Math.max(Math.ceil((to - from) / step), 0) }, (_, index) => from + index * step);
};
