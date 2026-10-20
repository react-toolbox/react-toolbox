export const isValuePresent = (value: unknown) =>
  value !== null && value !== undefined && value !== '' && !(typeof value === 'number' && Number.isNaN(value));
