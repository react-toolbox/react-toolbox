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
export const round = (number: number, decimals: number) =>
  Number.isFinite(number) ? Math.round(number * 10 ** decimals) / 10 ** decimals : NaN;
export const getViewport = () => ({
  height: window.innerHeight || document.documentElement.offsetHeight,
  width: window.innerWidth || document.documentElement.offsetWidth,
});
export const cloneObject = <T>(object: T): T => JSON.parse(JSON.stringify(object));
export const inputTypeForPrototype = (prototype: unknown) =>
  prototype === Date
    ? 'date'
    : prototype === Number
      ? 'number'
      : prototype === Boolean
        ? 'checkbox'
        : 'text';
export const prepareValueForInput = (value: string | number | boolean | Date, type: string) => {
  if (type === 'date')
    return new Date(value instanceof Date ? value.getTime() : String(value))
      .toISOString()
      .slice(0, 10);
  if (type === 'checkbox') return value ? 'on' : '';
  return value;
};
export const transformKeys =
  (fn: (key: string) => string) =>
  <T>(object: Record<string, T>): Record<string, T> =>
    Object.fromEntries(Object.entries(object).map(([key, value]) => [fn(key), value]));
export const removeNamespace = (namespace: string) => (key: string) => {
  const name = key.slice(namespace.length);
  return name.slice(0, 1).toLowerCase() + name.slice(1);
};
export const getAnimationModule = (animation: string, theme: Record<string, string>) =>
  transformKeys(removeNamespace(animation))(
    Object.fromEntries(Object.entries(theme).filter(([key]) => key.startsWith(animation))),
  );
export const isValuePresent = (value: unknown) =>
  value !== null &&
  value !== undefined &&
  value !== '' &&
  !(typeof value === 'number' && Number.isNaN(value));
