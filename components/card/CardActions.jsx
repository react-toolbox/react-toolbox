import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import style from './style';

/**
 * This component is used as a container for supplemental
 * card actions. Supplemental actions within the card are
 * explicitly called out using icons, text, and UI controls,
 * typically placed at the bottom of the card.
 */
class CardActions extends Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render () {
    const {
      children,
      className,
      ...otherProps
    } = this.props;

    const classes = ClassNames(style.cardActions, className);

    return (
      <div className={classes} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default CardActions;
