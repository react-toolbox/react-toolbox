import { createElement, Component } from 'react';
import { themeable } from 'react-css-themr';
import cn from 'classnames';
import PropTypes from 'prop-types';
import assoc from 'ramda/src/assoc';
import dissoc from 'ramda/src/dissoc';
import flip from 'ramda/src/flip';
import identity from 'ramda/src/identity';
import merge from 'ramda/src/merge';
import reduce from 'ramda/src/reduce';

const defaultOptions = {
  modifiers: [],
  theme: {},
};

export default function createComponent(target, options = {}) {
  const {
    name,
    modifiers,
    theme: _theme,
  } = merge(defaultOptions, options);

  const removeProps = props => (
    reduce(flip(dissoc), props, modifiers)
  );

  const getClassName = (theme, className, props) => (
    cn(theme[name], className, reduce((result, modifier) => (
      theme[modifier]
        ? assoc(theme[modifier], props[modifier], result)
        : result
    ), {}, modifiers))
  );

  const themeShape = PropTypes.shape(reduce(
    (result, modifier) => assoc(modifier, PropTypes.string, result),
    name ? { [name]: PropTypes.string } : {},
    modifiers,
  ));

  class CSSComponent extends Component {
    static propTypes = {
      className: PropTypes.string,
      innerRef: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
      theme: themeShape,
    };

    static defaultProps = {
      innerRef: identity,
    };

    static displayName = typeof target === 'string'
      ? `CSSComponent (${target})`
      : `CSSComponent (${target.displayName})`;

    render() {
      const { className, innerRef, theme, ...others } = this.props;
      const mergedTheme = _theme ? themeable(_theme, theme) : theme;
      const passThrough = typeof target === 'string'
        ? { ref: innerRef }
        : { innerRef, theme };

      return createElement(target, {
        className: getClassName(mergedTheme, className, others),
        ...removeProps(others),
        ...passThrough,
      });
    }
  }

  return CSSComponent;
}
