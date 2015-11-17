import React from 'react';
import ClassNames from 'classnames/bind';

/**
 * Provides a component with a classNames
 * function bound to the provided CSS module
 *
 * Check for 'classNames()' in props
 *
 * @param  {CSS Module} styles
 * @return {Component}
 */
function classNames (styles) {
  const classNamesFn = ClassNames.bind(styles);

  return function classNamesDecorator (ComposedComponent) {

    return function ClassNamesDecor (props) {

      return (
        <ComposedComponent
          classNames={classNamesFn}
          {...props}
        />
      );
    };
  };
}


export default classNames;
