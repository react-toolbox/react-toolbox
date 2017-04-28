import { createElement, Component, PropTypes } from 'react';

export function themr(name, defaultTheme) {
  return DecoratedComponent => {
    class ThemedComponent extends Component {
      static propTypes = {
        innerRef: PropTypes.func,
      };

      static defaultProps = {
        theme: defaultTheme || {},
      };

      render() {
        const { innerRef, ...other } = this.props;
        return createElement(DecoratedComponent, {
          ref: innerRef,
          ...other,
        });
      }
    }

    return ThemedComponent;
  };
}

export function themeable(original = {}, mixin) {
  if (!mixin) return original;

  return Object.keys(mixin).reduce(
    (result, key) => {
      const originalValue = typeof original[key] !== 'function'
        ? original[key] || ''
        : '';
      const mixinValue = typeof mixin[key] !== 'function'
        ? mixin[key] || ''
        : '';
      let newValue;

      if (typeof originalValue === 'object' && typeof mixinValue === 'object') {
        newValue = themeable(originalValue, mixinValue);
      } else {
        newValue = originalValue
          .split(' ')
          .concat(mixinValue.split(' '))
          .filter(
            (item, pos, self) => self.indexOf(item) === pos && item !== ''
          )
          .join(' ');
      }

      return {
        ...result,
        [key]: newValue,
      };
    },
    original
  );
}
