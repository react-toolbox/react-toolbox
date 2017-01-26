import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import compose from 'ramda/src/compose';
import assoc from 'ramda/src/assoc';
import dissoc from 'ramda/src/dissoc';
import reduce from 'ramda/src/reduce';
import map from 'ramda/src/map';

const withTheme = (options) => {
  const name = options.name;
  const modifiers = options.modifiers || [];
  const defaultTheme = options.theme;
  const removeProps = compose(...map(dissoc)(modifiers));

  return (target) => {
    class ThemePropsComponent extends Component { // eslint-disable-line
      static propTypes = {
        className: PropTypes.string,
        innerRef: PropTypes.string,
        theme: PropTypes.object, // eslint-disable-line
      };

      static displayName = typeof target === 'string'
        ? `ThemeProps (${target})`
        : `ThemeProps (${target.displayName})`;

      render() {
        const { className: _className, innerRef, theme = defaultTheme, ...others } = this.props;
        const addPropClass = (result, prop) => assoc(theme[prop], this.props[prop], result);
        const propClasses = reduce(addPropClass, {}, modifiers);
        const buildProps = compose(
          removeProps,
          innerRef ? assoc('ref', innerRef) : f => f,
          assoc('className', cn(theme[name], propClasses, _className)),
        );

        return React.createElement(target, buildProps(others));
      }
    }

    return ThemePropsComponent;
  };
};

export default withTheme;
