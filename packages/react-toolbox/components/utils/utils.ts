export const angleFromPositions = (cx: number, cy: number, ex: number, ey: number) =>
  ((Math.atan2(ey - cy, ex - cx) + Math.PI / 2) * 180) / Math.PI;
export const angle360FromPositions = (cx: number, cy: number, ex: number, ey: number) => {
  const angle = angleFromPositions(cx, cy, ex, ey);
  return angle < 0 ? 360 + angle : angle;
};
export const range = (start = 0, stop: number | null = null, step = 1): number[] => {
  const from = stop === null ? 0 : start;
  const to = stop === null ? start : stop;
  return Array.from(
    { length: Math.max(Math.ceil((to - from) / step), 0) },
    (_, index) => from + index * step,
  );
};
export const isValuePresent = (value: unknown) =>
  value !== null &&
  value !== undefined &&
  value !== '' &&
  !(typeof value === 'number' && Number.isNaN(value));
