import getNamespacedTheme from '../getNamespacedTheme';

const theme = {
  primary: 'primary',
  secondary: 'secondary',
  rippleWrapper: 'wrapper',
  rippleNode: 'node',
};

describe('#getNamespacedTheme', () => {
  it('filters namespaced classnames from an object', () => {
    const result = getNamespacedTheme('ripple', theme);
    const expected = { wrapper: 'wrapper', node: 'node' };
    expect(result).toEqual(expected);
  });

  it('filters an empty object if there is no namespace', () => {
    const other = { primary: 'secondary' };
    const result = getNamespacedTheme('ripple', other);
    expect(result).toEqual({});
  });
});
